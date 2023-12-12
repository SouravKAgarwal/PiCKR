import React from "react";
import LinkButton from "./LinkButton";
// import bg from "../assets/bg.jpg";
import palette from "../assets/color-palette.png";
import shades from "../assets/c2s.bmp";
import color from "../assets/color.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="relative homeImg w-full h-full bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-white/75" />
      <div className="relative flex flex-col md:flex-row items-center justify-center py-10 min-h-[91vh]">
        <div className="w-full md:w-6/12">
          <div className="flex items-center justify-center">
            <div className="md:w-2/5 sm:w-1/3 w-1/2">
              <div className="py-5">
                <img
                  src={palette}
                  alt="palette"
                  className="w-full rounded-md border-black border-[1px] cursor-pointer"
                  onClick={() => navigate("/color/palette")}
                />
              </div>
              <div className="hidden md:flex py-5">
                <img
                  src={shades}
                  alt="shades"
                  className="w-full rounded-md border-black py-7 bg-[#FCFBF9] border-[1px] cursor-pointer"
                  onClick={() => navigate("/color/shades")}
                />
              </div>
            </div>
            <div className="hidden md:flex px-3 w-1/3">
              <div className="relative my-5">
                <img
                  src={color}
                  alt="color"
                  className="w-full rounded-md border-black border-[1px] cursor-pointer"
                  onClick={() => navigate("/color")}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full text-center md:w-6/12 p-2">
          <h1 className="text-[2.5rem] leading-[2.75rem] font-extrabold text-rose-700">
            PiCKR.
          </h1>

          <p className="flex mt-4 justify-center text-xs md:text-sm font-[400] md:px-12 px-2">
            Generate perfect palettes and shades or get inspired by thousands of
            color schemes!
          </p>

          <div className="mt-8 flex justify-center flex-wrap gap-4 text-center">
            <LinkButton
              link="/color/shades"
              text="Generate Shades"
              show={true}
              className="bg-white hover:bg-black text-black hover:text-white"
            />
            <LinkButton
              link="/color/palette"
              text="Generate Palette"
              show={true}
              className="bg-black text-white hover:bg-white hover:text-black"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
