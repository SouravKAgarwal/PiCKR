import React from "react";
import LinkButton from "./LinkButton";
import palette from "../assets/color-palette.png";
import shades from "../assets/color-shades.png";
import color from "../assets/color.png";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="h-[84vh]">
      <div className="relative bg-[url(https://images.unsplash.com/photo-1558470598-a5dda9640f68?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] w-full h-full bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-white/75 sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

        <div className="relative px-5 md:py-9 py-12 justify-between flex flex-col md:flex-row items-center">
          <div className="w-full text-center md:w-1/2 p-2">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Welcome to the world of
              <strong className="font-extrabold text-rose-700"> PiCKR.</strong>
            </h1>

            <p className="flex mt-4 justify-center sm:text-xl/relaxed">
              Generate perfect palettes and shades or get inspired by thousands
              of color schemes!
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
          <div className="w-full p-4 md:w-6/12">
            <div className="hidden md:flex items-center justify-center">
              <div className="w-2/5">
                <div className="py-5">
                  <img
                    src={palette}
                    alt="palette"
                    className="w-full rounded-md border-black border-[1px] cursor-pointer"
                    onClick={() => navigate("/color/palette")}
                  />
                </div>
                <div className="py-5">
                  <img
                    src={shades}
                    alt="shades"
                    className="w-full rounded-md border-black border-[1px] cursor-pointer"
                    onClick={() => navigate("/color/shades")}
                  />
                </div>
              </div>
              <div className="px-3 w-2/5">
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
        </div>
      </div>
    </div>
  );
};

export default Home;
