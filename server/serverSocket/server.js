const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

let sharedText = '';

io.on('connection', (socket) => {
  socket.emit('update', sharedText);

  socket.on('edit', (text) => {
    sharedText = text;
    socket.broadcast.emit('update', sharedText);
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
