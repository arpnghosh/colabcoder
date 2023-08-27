import Editor from "@monaco-editor/react";
import { FriendCard } from "../components/FriendCard";
import { useState } from "react";

export const Playground = () => {
  const [code, setCode] = useState(localStorage.getItem("jscode") || "");
  const [output, setOutput] = useState("");
  const handleCodeChange = (newCode) => {
    setCode(newCode);
    localStorage.setItem("jscode", newCode);
  };

  const runCode = () => {
    try {
      const op = eval(code);
      console.log(op);
      setOutput(op);
    } catch (error) {
      console.error("Error while running code:", error);
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
          <div className="row-span-1 flex justify-center bg-[#232a2d] h-full">
            {/* Content for the first row */}
            <button
              className=" mt-8 bg-btnclr h-10 w-24 rounded-md text-white"
              onClick={runCode}
            >
              Run Code
            </button>
            <div className=" text-white">{output}</div>
          </div>
          <div className="row-span-1 h-full">
            {/* Content for the second row */}
            <div className=" flex justify-center"></div>

            <FriendCard />
          </div>
        </div>
      </div>
    </div>
  );
};
