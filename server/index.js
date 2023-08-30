// server.js
import express from "express";
import http from "http";
import { Server } from "socket.io";
import bodyParser from "body-parser";
import cors from "cors";
import executeCode from "./controllers/executeCode.js";
import genUUID from "./controllers/genUUID.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://colabcoder.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors());

const PORT = 3000;

app.use(bodyParser.json());

app.post("/execute", executeCode);
app.post("/invite", genUUID);

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on("newcode", (newText) => {
    socket.broadcast.emit("newcode", newText);
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
