const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
    console.log("Server is connected");
});

app.get('/', function (req, res) {
    console.log("Server is running...");
    res.send("");
});

const PORT = process.env.PORT || 2000;
server.listen(PORT, () => {
    console.log(`Server has started on PORT ${PORT}`);
});