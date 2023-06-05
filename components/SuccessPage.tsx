import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";

const SuccessPage = () => {
  return (
    <>
      <div className="flex justify-center flex-col h-full w-full">
        <div className="flex flex-col items-center">
          <div className="bg-green-50 flex items-center justify-center rounded-full h-[120px] w-[120px]">
            <AiFillCheckCircle size={50} color="#40ac64" />
          </div>
          <h1 className="text-2xl font-semibold my-2">Successfully Booked</h1>
        </div>
        <div className=" h-full w-full">
          <div className=""></div>
        </div>
      </div>
    </>
  );
};

export default SuccessPage;
