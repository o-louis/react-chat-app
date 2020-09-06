const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const { createUser, findUser, deleteUser } = require('./users');

io.on('connection', socket => {

    socket.on('new-user-connected', ({name, room}) => {
        createUser(name, room, socket.id);

        const JOIN_MESSAGE = `${name} is online`;
        const WELCOME_MESSAGE = `You joined the room ${room}`;

        socket.join(room);
        socket.emit("message", { name, message: WELCOME_MESSAGE });
        socket.broadcast.to(room).emit('message', { name, message: JOIN_MESSAGE });
    });

    socket.on('send-message', message => {
        const user = findUser(socket.id);
        io.in(user.room).emit('message', { name: user.name, message});
    });

    socket.on('typing', function(typing){
        const user = findUser(socket.id);
        console.log(typing)
        if (typing) {
            socket.broadcast.to(user.room).emit('notif-typed', `..${user.name} is typing`);
        } else {
            socket.broadcast.to(user.room).emit('notif-typed', ``);
        }
    });

    socket.on('disconnect', () => {
        const user = findUser(socket.id);
        console.log(user);
        const DISCONNECTED_MESSAGE = `${user.name} has left`;

        io.in(user.room).emit('message', { message: DISCONNECTED_MESSAGE });
        deleteUser(user);
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