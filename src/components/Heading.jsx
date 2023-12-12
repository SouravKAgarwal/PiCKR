import { Fragment } from "react";

const Heading = ({ name, mode, show, spanText, spanShow, className, textClass }) => {
  return (
    <Fragment>
      {show && (
        <div className={`flex flex-col items-center m-4 ${className}`}>
          <h1
            className={`sm:text-[7vh] text-[5vh] font-bold ${textClass}`}
          >
            {name}
          </h1>
          <span className="font-medium flex justify-center text-md">
            {mode}
          </span>
          {spanShow && (
            <span className="sm:text-md font-medium w-9/10 text-center xs:text-[1.9vh] text-gray-900">
              {spanText}
            </span>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default Heading;
