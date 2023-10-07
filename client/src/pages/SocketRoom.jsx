import { useState, useEffect } from "react";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";

const socket = io("https://corite-api.onrender.com");

export const SocketRoom = () => {
  const [roomId, setRoomId] = useState("");
  const [roomUsers, setRoomUsers] = useState([]);
  const [newRoomName, setNewRoomName] = useState("");

  const navigate = useNavigate();
  
  // join
  const joinRoom = (roomId) => {
    socket.emit("joinRoom", roomId, (roomId) => {
      setRoomId(roomId);
      navigate(`/playground/${roomId}`);
    });
  };

  // leave
  const leaveRoom = () => {
    socket.emit("leaveRoom", roomId);
    setRoomId("");
  };

  // create
  const createRoom = () => {
    if (newRoomName) {
      joinRoom(newRoomName);
      setNewRoomName("");
    }
  };

  useEffect(() => {
    socket.on("roomUsers", (users) => {
      setRoomUsers(users);
    });

    return () => {
      socket.off("roomUsers");
    };
  }, [roomId]);

  return (
    <div>
      {roomId ? (
        <div>
          <h2>Room: {roomId}</h2>
          <button onClick={leaveRoom}>Leave Room</button>
          <ul>
            {roomUsers.map((user) => (
              <li key={user}>{user}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h2>Create or Join a Room</h2>
          <input
            type="text"
            placeholder="Enter Room Name"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
          />
          <button onClick={createRoom}>Create Room</button>
        </div>
      )}
    </div>
  );
};
