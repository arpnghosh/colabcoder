import { useState, useEffect } from "react";
import { FriendCard } from "../components/FriendCard";
import Editor from "@monaco-editor/react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";

const socket = io("https://corite-api.onrender.com");

export const Playground = () => {
  const { roomId } = useParams();
  const [code, setCode] = useState(
    localStorage.getItem("jscode") || 'console.log("welcome to corite ✨");'
  );
  const [response, setResponse] = useState("welcome to corite ✨");

  // Join the room when the component mounts
  useEffect(() => {
    socket.emit("joinRoom", roomId);

    return () => {
      socket.emit("leaveRoom", roomId);
    };
  }, [roomId]);

  // Listen for real-time code updates from other users
  useEffect(() => {
    socket.on("newcode", (newCode) => {
      setCode(newCode);
    });

    return () => {
      socket.off("newcode");
    };
  }, []);

  // Handle local code changes
  const handleCodeChange = (newCode) => {
    setCode(newCode);
    localStorage.setItem("jscode", newCode);

    // Emit "newcode" event to notify other users
    socket.emit("newcode", newCode);
  };

  const runCode = async () => {
    try {
      const response = await axios.post("https://corite-api.onrender.com/execute", {
        code,
      });

      const result = response.data.consoleOutput;
      setResponse(result);
    } catch (error) {
      console.error("Error while running code:", error);
      setResponse("Error occurred during execution.");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen">
      {/* Left Side */}
      <Editor
        className="editor h-[50vh] lg:h-[100vh]"
        language="javascript"
        theme="vs-dark"
        onChange={handleCodeChange}
        value={code}
      />

      {/* Right Side */}
      <div className="lg:w-1/2 bg-[#05000F]">
        <div className="grid grid-rows-2 h-full">
          <div className="row-span-1 flex flex-col border-4 border-[#6537C8] items-center h-full">
            {/* Content for the first row */}
            <button
              onClick={runCode}
              className=" bg-[#6537C8] text-white rounded-sm h-12 w-48 mt-12 font-roboto font-medium"
            >
              Run Code
            </button>
            <div className="mt-12 text-xl font-bold flex flex-wrap justify-center items-center text-black h-64 w-80 rounded-sm bg-[#A58AE0]">
              <div className="whitespace-normal break-all p-4 max-h-44 overflow-y-auto">
                {response}
              </div>
            </div>
          </div>
          <div className="row-span-1 h-full border-4 border-[#6537C8]">
            {/* Content for the second row */}
            <div className="flex justify-center">
              <FriendCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 