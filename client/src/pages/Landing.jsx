import { Navbar } from "../components/Navbar";
import { Link } from "react-router-dom";
export const Landing = () => {
  return (
    <div className="bg-black flex flex-col min-h-screen w-full">
      <Navbar />

      <div className="bg-black flex flex-col h-full flex-grow gap-10 md:gap-14 justify-center items-center">
        <h1 className="text-white  font-roboto text-4xl md:text-6xl text-center font-medium">
          Unleashing <br className="block md:hidden" />{" "}
          <span className="text-btnclr">
            {" "}
            Creativity <br className="block md:hidden" />{" "}
          </span>{" "}
          One Line at <br className="block md:hidden" /> a Time
        </h1>
        <p className="text-ptext font-roboto text-lg md:text-2xl md:font-normal text-center">
          Welcome to CoLabCoder: <br className="block md:hidden" /> Your Gateway
          to Seamless <br className="block md:hidden" /> Coding,{" "}
          <br className=" hidden md:inline" />
          Powerful Collaboration,
          <br className="block md:hidden" /> and Limitless Creativity
        </p>
        <div className="flex flex-col md:flex-row gap-6">
          <Link
            to="/socketroom"
            className="py-2 text-center md:py-3  px-20 md:px-10 text-black text-base md:text-lg font-medium font-inter bg-white hover:bg-bcolor duration-500 rounded-full"
          >
            Get Started
          </Link>
          <button className="py-2 md:py-3 px-20 md:px-8 border border-[#3F5EEE] rounded-full text-center font-inter text-white font-medium  text-base md:text-lg shadow-[0_0px_40px_rgba(8,_112,_184,_0.7)] hover:bg-[#3F5EEE] transition-hover duration-500">
            How it works ?
          </button>
        </div>
        <p className=" font-light text-sm text-ptext md:text-base">
          No account required 🙌
        </p>
      </div>
      <footer className=" text-center text-sm md:text-base pb-5 text-white">
        Released under the{" "}
        <a
          href="https://github.com/colabcoder/colabcoder/LICENSE.md"
          className=" hover:underline"
        >
          MIT License
        </a>
        . Made in India 🇮🇳
      </footer>
    </div>
  );
};
