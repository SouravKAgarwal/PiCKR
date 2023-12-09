import React from "react";

const Spinner = ({ className }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div className="lg:h-28 lg:w-28 h-14 w-14 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
    </div>
  );
};

export default Spinner;
