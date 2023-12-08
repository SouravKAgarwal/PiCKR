import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const LinkButton = ({ link, text, show, className }) => {
  return (
    <Fragment>
      {show && (
        <Link
          className={`${className} flex justify-center items-center border-2 rounded-[100px] px-6 py-3 border-black text-sm font-medium sm:w-auto select-none`}
          to={link}
        >
          {text}
        </Link>
      )}
    </Fragment>
  );
};

export default LinkButton;
