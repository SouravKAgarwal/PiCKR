import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ColorInfoShades from "./ColorInfoShades";
import Spinner from "./Spinner";
import { toast } from "react-hot-toast";
import Heading from "./Heading";
import { server } from "..";

const ColorInfo = () => {
  const modes = [
    { id: 1, mode: "analogic" },
    { id: 2, mode: "triad" },
    { id: 3, mode: "monochrome" },
    { id: 4, mode: "monochrome-light" },
    { id: 5, mode: "monochrome-dark" },
    { id: 6, mode: "complement" },
    { id: 7, mode: "analogic-complement" },
    { id: 8, mode: "quad" },
  ];

  const [loading, setLoading] = useState(true);
  const [colorName, setColorName] = useState();
  const [colorRGB, setColorRGB] = useState();
  const [colorHEX, setColorHEX] = useState();
  const [colorHSL, setColorHSL] = useState();
  const [colorHSV, setColorHSV] = useState();
  const [colorCMYK, setColorCMYK] = useState();
  const [colorContrast, setColorContrast] = useState();

  const params = useParams();

  const type = params.type.replace(/["]/g, "");

  useEffect(() => {
    const fetchColorDetails = async () => {
      try {
        const colorName = await axios.get(
          `${server}/id?${type}=${params.color}`
        );

        const details = colorName.data;

        if (details) {
          setColorName(details.name.value);
          setColorHEX(details.hex.value);
          setColorRGB(details.rgb.value);
          setColorHSL(details.hsl.value);
          setColorHSV(details.hsv.value);
          setColorCMYK(details.cmyk.value);
          setColorContrast(details.contrast.value);
          setLoading(false);
        } else {
          setLoading(false);
          toast.error("Color not found!");
        }
      } catch (error) {
        setLoading(false);
        toast.error("Try again later!");
      }
    };
    fetchColorDetails();
  }, [params.color, type]);

  return (
    <Fragment>
      {loading ? (
        <Spinner className="py-[14.25rem] md:py-[14rem]" />
      ) : (
        <Fragment>
          <div className="flex flex-col items-center p-4">
            <Heading name={colorName} show={true} textClass="py-6" />
            <div className="flex max-w-2xl flex-wrap justify-center items-center">
              <div className="flex w-40 h-40">
                <img
                  className="w-full h-full border-2 border-black select-none se rounded-xl"
                  src={`${server}/id?format=svg&${type}=${params.color} `}
                  alt={colorName}
                />
              </div>
              <div className="w-full mt-8">
                The color {colorName} is represented by the hex code{" "}
                <span className="uppercase font-bold">{colorHEX}</span>. Its RGB
                values is <span className="font-bold">{colorRGB}</span>. The
                contrasting color of {colorName} is{" "}
                <span className="uppercase font-bold">{colorContrast}</span>.
                The other codes of the color {colorName} are {colorHSL} ,{" "}
                {colorHSV} ,{colorCMYK} .
              </div>

              <div className="flex flex-col justify-center items-center mt-10">
                <h1 className="font-bold text-3xl underline">
                  Schemes of {colorName}
                </h1>
                {modes.map(({ id, mode }) => (
                  <ColorInfoShades
                    key={id}
                    colorHEX={colorHEX}
                    schemeName={mode}
                  />
                ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ColorInfo;
