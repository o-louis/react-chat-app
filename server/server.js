const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const users = [];

io.on('connection', socket => {
    console.log("Server is connected");

    socket.on('new-user-connected', ({name, room}) => {
        // Add user
        const user = {name, room, id: socket.id};
        users.push(user);

        socket.join(room);
        socket.emit("message", {message:`Welcome ${user.name}, you are in the room ${user.room}`});
        socket.broadcast.to(room).emit('message',{message: `${user.name} is online.`});
    });

    socket.on('send-message', ({message, room, username}) => {
        console.log(message, room);
        io.in(room).emit('message',{message: `${username}: ${message}`});
    });

    socket.on('disconnect', function (socket) {
        io.in(room).emit('message',{message: `disconnected`});
    });
});

app.get('/', function (req, res) {
    console.log("Server is running...");
    res.send("");
});

const PORT = process.env.PORT || 2000;
server.listen(PORT, () => {
    console.log(`Server has started on PORT ${PORT}`);
});