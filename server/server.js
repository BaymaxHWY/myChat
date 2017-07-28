var app = require("express")();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);

server.listen(4000);

let onlineCount = 0,
    socketList = [],
    onlineList = [];

io.on("connect", function(socket) {
    socket.on('checkName', function(user) {
        if (!onlineList[user.name]) {
            socket.emit('userCreated');
        } else {
            socket.emit('userExist');
        }
    })
    socket.on("getInfo", function(user) {
        onlineCount++;
        console.log("登录成功" + onlineCount);
        socketList[user.name] = socket;
        onlineList[user.name] = user.name;
        socket.name = user.name;
        socket.index = onlineCount;
        io.sockets.emit("Info", {
            onlineList: onlineList,
            onlineCount: onlineCount,
            username: user.name
        });
    });
    socket.on("disconnect", function() {
        if (!!socketList[socket.name]) {
            socketList.splice(socket.index, 1);
            if (!!onlineList[socket.name]) {
                onlineList.splice(socket.index, 1);
                onlineCount -= onlineCount > 0 ? 1 : 0;
                console.log("清理完毕");
                console.log("还剩余：" + onlineCount + "人");
                io.emit("logout", {
                    username: socket.name,
                    onlineCount: onlineCount,
                    onlineList: onlineList
                });
            }
        }
    });
    socket.on("postMsg", function(msg) {
        // socket.emit('myMsg', msg);
        let username = socket.name;
        io.sockets.emit("newMsg", { username, msg });
    });
});