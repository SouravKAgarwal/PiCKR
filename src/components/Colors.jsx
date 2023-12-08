import { Fragment, useEffect, useState } from "react";
import "../styles/color.css";
import { RgbColorPicker } from "react-colorful";
import axios from "axios";
import Spinner from "./Spinner";
import LinkButton from "./LinkButton";
import { server } from "../index";
import ToastComp from "./ToastComp";
import { toast } from "react-hot-toast";
import Heading from "./Heading";
import SyntaxHighlighter from "react-syntax-highlighter";

const Colors = () => {
  const [currentColor, setCurrentColor] = useState({
    r: 255,
    g: 255,
    b: 255,
  });
  const [loading, setLoading] = useState(true);
  const [output, setOutput] = useState("");
  const [colorRgb, setColorRgb] = useState("");
  const [colorName, setColorName] = useState("");
  const [colorHex, setColorHex] = useState("");
  const [colorHsl, setColorHsl] = useState("");
  const [colorHsv, setColorHsv] = useState("");
  const [colorCmyk, setColorCmyk] = useState("");

  const tags = [
    { id: 1, tag: "Name :", value: colorName },
    { id: 2, tag: "RGB :", value: output },
    { id: 3, tag: "HEX :", value: colorHex },
    { id: 4, tag: "HSL :", value: colorHsl },
    { id: 5, tag: "HSV :", value: colorHsv },
    { id: 6, tag: "CMYK :", value: colorCmyk },
  ];

  useEffect(() => {
    const color = `rgb(${currentColor["r"]},${currentColor["g"]},${currentColor["b"]})`;
    setOutput(color);
    setColorRgb(color);
    fetchColorName(color);
  }, [currentColor]);

  const handleColorChange = (currentColor) => {
    setCurrentColor(currentColor);
    setLoading(true);
  };

  const fetchColorName = async (rgbColor) => {
    try {
      const response = await axios.get(`${server}/id?rgb=${rgbColor}`);
      const data = response.data;
      if (data) {
        setColorName(data.name.value);
        setColorHex(data.hex.value);
        setColorHsl(data.hsl.value);
        setColorHsv(data.hsv.value);
        setColorCmyk(data.cmyk.value);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setColorName("Color not found!");
      setColorHex("Color not found!");
      setColorHsl("Color not found!");
      setColorHsv("Color not found!");
      setColorCmyk("Color not found!");
      toast.error("Try again later!");
    }
  };

  return (
    <Fragment>
      <Fragment>
        <div className="mx-auto">
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col items-center">
              <Heading
                name="Colors"
                show={true}
                spanShow={true}
                spanText={"Select any color to get information"}
                textClass="mt-4"
              />
            </div>
            {loading ? (
              <Spinner className="py-[7.5rem] md:py-[9.75rem]" />
            ) : (
              <div className="w-[90vw] md:w-[50vw] lg:w-[40vw] xl:w-[30vw] items-center mb-4">
                <div className="responsive">
                  <RgbColorPicker
                    color={currentColor}
                    onChange={handleColorChange}
                  />
                </div>

                <div className="flex w-full flex-col justify-center items-center py-4">
                  <div className="flex flex-col text-xs rounded-xl bg-[rgb(240, 240, 240)]">
                    {tags.map(({ id, tag, value }) => (
                      <div
                        key={id}
                        className="flex flex-row justify-center items-center "
                      >
                        <div>{tag}</div>
                        <SyntaxHighlighter
                          key={id}
                          className="flex justify-start items-center flex-row gap-4"
                          language="html"
                        >
                          {value}
                        </SyntaxHighlighter>
                      </div>
                    ))}
                  </div>
                  <LinkButton
                    link={`/color/rgb/${colorRgb}`}
                    text="Know More..."
                    show={true}
                    className="mt-2"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </Fragment>
      <ToastComp />
    </Fragment>
  );
};

export default Colors;
