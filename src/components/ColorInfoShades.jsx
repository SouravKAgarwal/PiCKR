import { Fragment } from "react";
import ColorShades from "./ColorShades";

const ColorInfoShades = ({ schemeName, colorHEX, colorRGB }) => {
  return (
    <Fragment>
      <div className="flex flex-col items-center mt-8">
        <h1 className="text-xl font-bold p-2">{schemeName}</h1>
        <ColorShades
          colorHexCode={colorHEX}
          colorRgbCode={colorRGB}
          mode={schemeName}
          show={false}
          fullHeight={false}
          colorSpin={true}
        />
      </div>
    </Fragment>
  );
};

export default ColorInfoShades;
