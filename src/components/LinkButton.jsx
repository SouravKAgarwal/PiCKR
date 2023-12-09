import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const LinkButton = ({ link, text, show, className }) => {
  return (
    <Fragment>
      {show && (
        <Link
          className={`${className} flex justify-center items-center border-2 rounded-[100px] md:px-6 md:py-3 border-black text-[1.9vh] font-medium sm:w-auto select-none px-2 py-2`}
          to={link}
        >
          {text}
        </Link>
      )}
    </Fragment>
  );
};

export default LinkButton;
