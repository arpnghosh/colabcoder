import axios from "axios";
import { useState } from "react";
export const CreateRoom = () => {

  const [username, setUsername] = useState("")
  
  const handleUsername = (e) => {
    setUsername(e.target.value)
  }

  const createRoom = async () => {
    try {
      const res = await axios.post("https://corite-api.onrender.com/createRoom");
      const shareLink = res.data.roomUUID;
      console.log(shareLink)
      window.location.href = (`/playground?shareLink=${shareLink}`)
    
    } catch (error) {
      console.log(error);
    }
  };
  const joinRoom = () => {
    window.location.href = "/join";
  };

  return (
    <>
      <div className="flex justify-center items-center bg-[#05000F] min-h-screen w-full">
        <div className=" flex flex-col rounded-md gap-5 justify-center items-center bg-[#140B28] w-80 md:w-96 h-72 text-white font-roboto shadow-md shadow-black">
          <p className=" font-medium text-xl">what should we call you ?</p>
          <input
            className="bg-[#A58AE0] rounded-sm placeholder-black h-10 w-60 text-black font-medium font-roboto text-base text-center outline-none border-none transition"
            placeholder="Enter Name"
            value={username}
            onChange={handleUsername}
          />
          <button
            onClick={createRoom}
            className=" bg-[#6537C8] rounded-sm h-10 w-60 font-medium"
          >
            Create Room
          </button>
          <button
            onClick={joinRoom}
            className=" bg-[#6537C8] rounded-sm h-10 w-60 font-medium"
          >
            Join Room
          </button>
        </div>
      </div>
    </>
  );
};
