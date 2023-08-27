export const FriendCard = () => {
  return (
    <div className=" mt-24 mb-28 lg:mb-0 flex flex-col items-center gap-7">
      <button className="  bg-btnclr h-12 w-28 rounded-md text-white">
        Invite friend
      </button>
      <div className=" h-12 w-80 text-center rounded-md bg-[#e57474]"></div>
      <div className=" h-12 w-80 text-center rounded-md bg-[#8ccf7e]"></div>
      <div className=" h-12 w-80 text-center rounded-md bg-[#67b0e8]"></div>
    </div>
  );
};
