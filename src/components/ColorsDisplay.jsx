import React, { useEffect, useState } from "react";
import LinkButton from "./LinkButton";
import ToastComp from "./ToastComp";
import { toast } from "react-hot-toast";

const ColorsDisplay = () => {
  const modes = [
    { id: 0, mode: "--Select an option--" },
    { id: 1, mode: "analogic" },
    { id: 2, mode: "triad" },
    { id: 3, mode: "monochrome" },
    { id: 4, mode: "monochrome-light" },
    { id: 5, mode: "monochrome-dark" },
    { id: 6, mode: "complement" },
    { id: 7, mode: "analogic-complement" },
    { id: 8, mode: "quad" },
  ];
  const [color, setColor] = useState("");
  const [mode, setMode] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    const typeFinder = (color) => {
      if (color.length > 0) {
        if (
          color.indexOf("#") !== -1 &&
          (color.length <=7 && color.length !== 6)
        ) {
          setType("hex");
          toast.remove();
        } else if (color.indexOf(",") !== -1) {
          setType("rgb");
          toast.remove();
        } else if (color.indexOf("#") !== -1 && color.indexOf(",") !== -1) {
          toast.error("Invalid color code!");
        } else {
          toast.error("Invalid color code!", {
            id: "error",
          });
        }
      }
    };
    typeFinder(color);
  }, [color]);

  const colorCode = color.replace("#", "");

  return (
    <>
      <div className="flex justify-center min-h-[91vh] homeImg">
        <div className="absolute inset-0 bg-white/75"></div>
        <div className="relative flex flex-col items-center justify-center">
          <div className="flex w-full flex-col md:flex-row justify-center md:items-start md:gap-16">
            <div className="flex flex-col items-center justify-center mt-10 gap-4">
              <h4 className="font-bold">Enter the color code</h4>
              <input
                type="text"
                placeholder="#FFFFFF or rgb(255,255,255)"
                className="py-2 px-4 border-2 outline-none rounded-[100px] placeholder:text-sm placeholder:select-none focus:border-black"
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-center justify-center mt-10 gap-4">
              <h4 className="font-bold">Select the scheme type</h4>

              <div className="relative">
                <select
                  className="w-full py-[10px] px-4 outline-none border-2 rounded-[100px] text-black bg-white shadow-sm focus:border-black"
                  onChange={(e) => setMode(e.target.value)}
                >
                  {modes.map(({ id, mode }) => (
                    <option key={id}>{mode}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <LinkButton
            link={
              colorCode && mode
                ? `/color/shades/${type}/${mode}/${colorCode.toUpperCase()}`
                : "/color/shades"
            }
            text="Load Shades"
            show={true}
            className={`bg-white text-black hover:bg-black hover:text-white mt-10`}
          />
        </div>
      </div>
      <ToastComp />
    </>
  );
};

export default ColorsDisplay;
