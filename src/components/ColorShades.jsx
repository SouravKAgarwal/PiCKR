import React, { Fragment, useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";
import ErrorComponent from "./ErrorComponent";
import Heading from "./Heading";
import LinkButton from "./LinkButton";
import { server } from "../index.js";
import ToastComp from "./ToastComp";

const ColorShades = ({
  colorHexCode,
  colorRgbCode,
  mode,
  show = true,
  fullHeight = true,
  colorSpin,
}) => {
  const [shades, setShades] = useState([]);
  const [name, setName] = useState();
  const [errorFound, setErrorFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorCode, setErrorCode] = useState("");

  const params = useParams();
  const type = params.type.replace(/["]/g, "");

  useEffect(() => {
    const fetchColorScheme = async () => {
      try {
        const response = await axios.get(
          `${server}/scheme?${type}=${
            params.color ||
            (type === "hex" && colorHexCode) ||
            (type === "rgb" && colorRgbCode)
          }&mode=${params.mode || mode}&count=8`
        );
        const data = response.data.colors;

        const colorName = await axios.get(
          `${server}/id?${type}=${params.color || colorHexCode || colorRgbCode}`
        );

        const color = colorName.data;

        if (data && color) {
          setShades(data);
          setName(color.name.value);
          setLoading(false);
        } else {
          setLoading(false);
          setErrorFound(true);
          toast.error("Color not found!");
        }
      } catch (error) {
        console.log(error);
        setErrorCode(error.code);
        setErrorMessage(error.message);
        setLoading(false);
        setErrorFound(true);
      }
    };
    fetchColorScheme();
  }, [params.color, params.mode, colorHexCode, colorRgbCode, mode, type]);

  const notify = () => toast.success("Copied to Clipboard!");

  return (
    <Fragment>
      {loading ? (
        colorSpin ? (
          <Spinner className="h-[30vh]" />
        ) : (
          <Spinner className="h-[84vh]" />
        )
      ) : errorFound ? (
        <ErrorComponent
          errorCode={errorCode || "ERR"}
          errorMessage={errorMessage || "Try again later!"}
        />
      ) : (
        <div
          className={`flex flex-col items-center ${
            fullHeight ? "h-[84vh] py-4" : ""
          }`}
        >
          <Heading
            name={name}
            mode={params.mode}
            show={show}
            textClass="py-3 px-1 text-4xl"
            className="mt-6"
          />
          <div className="flex flex-wrap justify-center items-center p-2">
            {shades.map((shade, index) => (
              <div
                className="flex flex-col items-center m-1 border-2 border-black rounded-xl font-semibold text-md w-32"
                key={index}
              >
                <CopyToClipboard text={`${shade.hex.value}`}>
                  <img
                    className="rounded-t-xl w-full h-full select-none cursor-pointer"
                    src={`${server}/id?format=svg&hex=${shade.hex.clean}`}
                    onClick={notify}
                    alt={shade.hex.clean}
                  />
                </CopyToClipboard>
                <div className="select-none text-black rounded-none border-none bg-transparent px-6 py-3">
                  {shade.hex.value}
                </div>
              </div>
            ))}
          </div>
          <LinkButton
            link={`/color/${type}/${params.color}`}
            text={`About ${name}`}
            show={show}
            className="bg-white text-black hover:bg-black hover:text-white mt-10"
          />
        </div>
      )}
      <ToastComp />
    </Fragment>
  );
};

export default ColorShades;
