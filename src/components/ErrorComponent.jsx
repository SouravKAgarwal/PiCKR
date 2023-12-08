import React from "react";
import errorImage from "../assets/error.png";
import LinkButton from "./LinkButton";

const ErrorComponent = ({ errorCode, errorMessage }) => (
  <div className="flex items-center justify-center px-4 md:py-[8rem] py-[5rem]">
    <div className="flex flex-col items-start">
      <img
        src={errorImage}
        alt="404 Page Not Found"
        className="select-none w-36 md:w-42 mb-4"
      />
      <div className="flex flex-col">
        <h1 className="text-md font-light mb-2">{errorCode}.</h1>
        <span className="font-bold text-2xl mb-4">{errorMessage}</span>
      </div>
      <p className="text-xs font-light mb-4">
        {errorCode === "404"
          ? "Oops! Looks like the page you're looking for doesn't exist."
          : "Oops! Looks like you are not connected to the Internet."}
      </p>
      <LinkButton
        link="/"
        show={true}
        text="Return Home"
        className="px-1 py-2 bg-black text-white hover:bg-white hover:text-black text-xs"
      />
    </div>
  </div>
);

export default ErrorComponent;
