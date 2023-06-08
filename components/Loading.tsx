import React from "react";
import Lottie from "lottie-react";
import loadingAnimation from "../loadingLottie.json";

const Loading = () => {
  return (
    <div className="flex h-[100vh] bg-white/90 w-full mx-auto inset-0 absolute items-center justify-center">
      <Lottie animationData={loadingAnimation} loop={true} autoplay={true} />
    </div>
  );
};

export default Loading;
