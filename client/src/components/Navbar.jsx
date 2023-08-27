import logo from "../assets/CoLab.svg";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className=" bg-black pt-5 md:pt-7 flex justify-around items-center text-white min-w-min">
      <Link to="/"><img src={logo} alt="/" className="" /></Link>
      <Link to="/playground" className=" border border-[#3F5EEE] hover:bg-transparent duration-500 py-1 px-3  md:py-2 md:px-6 bg-[#3F5EEE] rounded-full text-center font-roboto text-white font-normal md:font-medium text-base md:text-lg">Get started</Link>
    </div>
  );
};
