import React from "react";
import { FaDog, FaBath, FaCarSide } from "react-icons/fa";
import { BsFillHeartPulseFill, BsCameraFill } from "react-icons/bs";
import { MdOutlinePets } from "react-icons/md";
import { NextPage } from "next";
import { checkAuth } from "../auth/useAuth";
import LandingPage from "../components/landing/LandingPage";

const Home: NextPage = () => {
  checkAuth();
  return (
    <>
      <LandingPage />
    </>
  );
};

export default Home;
