import express from "express";
import bodyParser from "body-parser";
import executeCode from "./controllers/executeCode.js";
import http from 'http';
import socketIo from 'socket.io-client'

const app = express();
const PORT = 3000;

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





app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/execute", executeCode);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});