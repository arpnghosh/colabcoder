import axios from "axios";

export const FriendCard = () => {
  const genCode = async() => {
    const res = await axios.post("http://localhost:3000/invite")
    const sessionID = await res.data;
    console.log(sessionID)
  }
  return (
    <div className=" mt-24 mb-28 lg:mb-0 flex flex-col items-center gap-7">
      <button className="bg-btnclr h-12 w-28 rounded-md text-white" onClick={genCode}>
        Invite friend
      </button>
      <div className=" h-12 w-80 text-center rounded-md bg-[#e57474]"></div>
      <div className=" h-12 w-80 text-center rounded-md bg-[#8ccf7e]"></div>
      <div className=" h-12 w-80 text-center rounded-md bg-[#67b0e8]"></div>
    </div>
  );
};
