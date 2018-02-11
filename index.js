var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen('3000');

app.get('/' , function (request , response) {
    response.sendFile(__dirname + '/index.html');
});

io.on('connection' , function (socket) {
    console.log('New User Has connected');

    socket.on('newMessage' , function (data , room) {
        console.log('There are new message '+data+' on Room '+ room);
        socket.to(room).emit('clientMessage' , data);
    });

    socket.on('joinRoom' , function (data) {
        console.log('User Join to room '+data);
        socket.join(data);
    });

    socket.on('leaveRoom' , function (data) {
        console.log('User Leave to room '+data);
        socket.leave(data);
    });

});
