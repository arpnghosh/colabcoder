import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("https://corite-api.onrender.com");

export const Playground = () => {
  const [code, setCode] = useState(localStorage.getItem("jscode") || "");
  const [response, setResponse] = useState("");

  useEffect(() => {
    socket.on("newcode", (newText) => {
      setCode(newText);
      localStorage.setItem("jscode", newText);
    });
  }, [code]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
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
        className="editor h-[50vh] lg:h-[100vh] bg-[#141b1e]"
        language="javascript"
        theme="vs-dark"
        onChange={handleCodeChange}
        value={code}
      />

      {/* Right Side */}
      <div className="lg:w-1/2 bg-[#141b1e]">
        <div className="grid grid-rows-2 h-full">
          <div className="row-span-1 flex flex-col items-center bg-[#232a2d] h-full">
            {/* Content for the first row */}
            <button
              className="hover:bg-blue-700 duration-500 border-btnclr mt-8 bg-btnclr h-10 w-24 rounded-md text-white "
              onClick={runCode}
            >
              Run Code
            </button>
            <div className="mt-12 text-white">{JSON.stringify(response)}</div>
          </div>
          <div className="row-span-1 h-full">
            {/* Content for the second row */}
            <div className="flex justify-center"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
