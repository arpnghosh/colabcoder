import axios from "axios";
import { useState } from "react";

export const FriendCard = () => {
  const [roomID, setRoomID] = useState(null);
  const genCode = async () => {
    try {
      const res = await axios.post("https://corite-api.onrender.com");
      const sessionID = await res.data.a;

      console.log(sessionID);
      const shareLink = `https://colabcoder.vercel.app/playground?session=${sessionID}`;
      setRoomID(shareLink);
      console.log(shareLink);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" mt-24 mb-28 lg:mb-0 flex flex-col items-center gap-7">
      <button
        className="bg-btnclr h-12 w-28 rounded-md text-white"
        onClick={genCode}
      >
        Invite friend
      </button>
      <a href={roomID} className=" text-center hover:underline text-white font-roboto font-medium text-lg">
        {roomID}
      </a>
      <div className=" h-12 w-80 text-center rounded-md bg-[#e57474]"></div>
      <div className=" h-12 w-80 text-center rounded-md bg-[#8ccf7e]"></div>
      <div className=" h-12 w-80 text-center rounded-md bg-[#67b0e8]"></div>
    </div>
  );
};
