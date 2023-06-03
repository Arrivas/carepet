import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center ml-2">
      <div className="inline-block relative w-5 h-5">
        <div className="absolute top-0 left-0 w-full h-full border-t-2 border-white rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Spinner;
