// server.mjs
import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import executeCode from "./controllers/executeCode.js";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const rooms = new Map();

app.post("/execute", executeCode);

io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  // Join a room
  socket.on("joinRoom", (roomId, callback) => {
    socket.join(roomId);

    socket.data.roomId = roomId;

    if (!rooms.has(roomId)) {
      rooms.set(roomId, []);
    }

    rooms.get(roomId).push(socket.id);

    io.to(roomId).emit("roomUsers", rooms.get(roomId));

    if (callback) {
      callback(roomId);
    }
  });

  // Leave a room
  socket.on("leaveRoom", () => {
    const roomId = socket.data.roomId;

    if (rooms.has(roomId)) {
      const index = rooms.get(roomId).indexOf(socket.id);
      if (index !== -1) {
        rooms.get(roomId).splice(index, 1);
      }

      io.to(roomId).emit("roomUsers", rooms.get(roomId));
    }

    socket.leave(roomId);
  });

  socket.on("newcode", (newCode) => {
    const roomId = socket.data.roomId;
    io.to(roomId).emit("newcode", newCode);
  });

  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
