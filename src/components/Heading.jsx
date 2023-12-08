import { Fragment } from "react";

const Heading = ({ name, mode, show, spanText, spanShow, className, textClass }) => {
  return (
    <Fragment>
      {show && (
        <div className={`flex flex-col items-center m-4 ${className}`}>
          <h1
            className={` sm:text-5xl text-4xl font-bold ${textClass}`}
          >
            {name}
          </h1>
          <span className="font-medium flex justify-center text-md">
            {mode}
          </span>
          {spanShow && (
            <span className="py-2 pb-4 sm:text-md w-9/10 text-center xs:text-[14px] text-gray-900 z-99">
              {spanText}
            </span>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default Heading;
