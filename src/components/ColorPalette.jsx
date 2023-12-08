import React, { useState, useEffect, useCallback } from "react";
import colorScheme from "color-scheme";
import { GrClipboard } from "react-icons/gr";
import { toast } from "react-hot-toast";
import ToastComp from "./ToastComp";
import Heading from "./Heading";

function ColorPalette() {
  const [colors, setColors] = useState([]);
  const [isSmallDevice] = useState(window.innerWidth <= 768);

  const generateColors = useCallback(() => {
    const scheme = new colorScheme();
    scheme
      .from_hue(Math.floor(Math.random() * 360))
      .scheme("triade")
      .variation("pastel");

    const colorList = scheme.colors().slice(0, 5);
    const capitalizedColors = colorList.map((color) => color.toUpperCase());
    const colorCodesWithHash = capitalizedColors.map((color) => `#${color}`);
    setColors(colorCodesWithHash);
  }, []);

  useEffect(() => {
    generateColors();
  }, [generateColors]);

  const copyToClipboard = (color) => {
    navigator.clipboard.writeText(color);
    toast.success(`Copied ${color}`);
  };

  const getContrastTextColor = (bgColor) => {
    const r = parseInt(bgColor.slice(1, 3), 16);
    const g = parseInt(bgColor.slice(3, 5), 16);
    const b = parseInt(bgColor.slice(5, 7), 16);

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness >= 128 ? "black" : "white";
  };

  const handleKeyPress = useCallback(
    (event) => {
      if (!isSmallDevice && (event.key === " " || event.key === "Spacebar")) {
        event.preventDefault();
        generateColors();
      }
    },
    [generateColors, isSmallDevice]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  const toggleGenerate = () => {
    if (isSmallDevice) {
      generateColors();
    }
  };

  const buttonText = isSmallDevice ? "Generate" : "Spacebar";

  return (
    <div className="mx-auto">
      <div className="flex flex-col justify-center items-center h-[25vh]">
        <div className="title flex flex-col items-center">
          <Heading
            show={true}
            name="Color Palette"
            spanShow={isSmallDevice ? false : true}
            spanText={`Press ${buttonText} to Generate`}
            textClass="text-[40px] md:text-5xl"
          />
        </div>

        {isSmallDevice && (
          <button
            className="bg-white text-black font-medium border-black border-2 rounded-[100px] m-2 px-3 py-2"
            onClick={toggleGenerate}
          >
            Generate
          </button>
        )}
      </div>
      <div className="flex flex-wrap justify-center items-center md:justify-start h-[65vh]">
        {colors.map((color, index) => (
          <div key={index} className="w-screen md:w-1/5 h-1/5 md:h-[100%]">
            <div
              className={`flex md:flex-col flex-row md:justify-center items-center h-[100%]`}
              style={{
                backgroundColor: color,
                color: getContrastTextColor(color),
              }}
            >
              <p className="flex z-99 font-bold text-lg md:mb-4 px-4 md:px-0">
                {color}
              </p>
              <GrClipboard
                className="md:cursor-pointer gap-24 items-center"
                style={{ color: getContrastTextColor(color) }}
                onClick={() => copyToClipboard(color)}
              />
            </div>
          </div>
        ))}
      </div>

      <ToastComp />
    </div>
  );
}

export default ColorPalette;
