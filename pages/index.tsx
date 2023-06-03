import React from "react";
import ImageGallery from "react-image-gallery";
import Link from "next/link";
import { FaDog, FaBath, FaCarSide } from "react-icons/fa";
import {
  BsFillHeartPulseFill,
  BsCameraFill,
  BsArrowRightShort,
} from "react-icons/bs";
import { MdOutlinePets } from "react-icons/md";
import Image from "next/image";
import { NextPage } from "next";
import { loginIsRequiredClient } from "./auth/useAuth";

const slideImages = [
  {
    original: "../images/pethotels-640.jpg",
    caption: "Slide 1",
  },
  {
    original: "../images/pexels-blue-bird-7210458.jpg",
    caption: "Slide 2",
  },
  {
    original: "../images/pexels-blue-bird-7210754.jpg",
    caption: "Slide 3",
  },
  {
    original: "../images/pexels-chevanon-photography-1108099.jpg",
    caption: "Slide 4",
  },
  {
    original: "../images/pexels-juan-figueroa-7121954.jpg",
    caption: "Slide 5",
  },
  {
    original: "../images/pexels-mikhail-nilov-7470752.jpg",
    caption: "Slide 6",
  },
  {
    original: "../images/pexels-tima-miroshnichenko-6131079.jpg",
    caption: "Slide 7",
  },
  {
    original: "../images/pexels-tima-miroshnichenko-6235116.jpg",
    caption: "Slide 8",
  },
  {
    original: "../images/pexels-tima-miroshnichenko-6235653.jpg",
    caption: "Slide 9",
  },
  {
    original: "../images/pexels-tim-gouw-236452.jpg",
    caption: "Slide 10",
  },
];

const servicesItems = [
  {
    id: 1,
    title: "Dog Walking",
    description:
      "Choose Between A 20-Minute, 30-Minute, Or 60-Minute Stroll For Your Dog. On-Demand Or Pre-Scheduled",
    imageSrc: "../images/blob-02.svg",
    icon: <FaDog color="#fff" size={25} />,
  },
  {
    id: 2,
    title: "Pet Grooming",
    description:
      "A Sleepover Forr Your Pet In The Comfor Of Your Home Or A Pet Cargiver's Home, For A Many Nights As You Need.",
    imageSrc: "../images/blob-02.svg",
    icon: <FaBath color="#fff" size={25} />,
  },
  {
    id: 3,
    title: "Pet Transportation",
    description: "We'll Get Your Pet There With Extra Love And Care.",
    imageSrc: "../images/blob-03.svg",
    icon: <FaCarSide color="#fff" size={25} />,
  },
  {
    id: 4,
    title: "Veterinary Services",
    description: "Helping Pets Live Life To The Fullest",
    imageSrc: "../images/blob-03.svg",
    icon: <BsFillHeartPulseFill color="#fff" size={25} />,
  },
  {
    id: 5,
    title: "Pet Photography",
    description: "Let Our Camera Capture Your Pet's Tail-Wiggling Fun!",
    imageSrc: "../images/blob-05.svg",
    icon: <BsCameraFill color="#fff" size={25} />,
  },
  {
    id: 6,
    title: "Pet DayCare",
    description: "Enjoy A Worry Free Day And Let Us Care For Your Furbaby",
    imageSrc: "../images/blob-05.svg",
    icon: <MdOutlinePets color="#fff" size={25} />,
  },
];

const Home: NextPage = () => {
  loginIsRequiredClient();
  return (
    <>
      <header>
        <ImageGallery
          autoPlay={true}
          showNav={true}
          items={slideImages}
          showBullets={true}
        />
      </header>
      {/* section */}
      <div className="bg-green-550 text-white items-center justify-center flex flex-col p-8">
        <h1 className="font-bold text-xl">Care Pet</h1>
        <h3 className="text-lg ">Find Trusted Pet Care Service Near You.</h3>
        <h3 className="text-lg italic">
          From Grooming To Boarding And Everything In Between - All Within
          Reach, Right In Your Neighborhood,
          <Link href="/register" className="text-blue-700">
            {" "}
            Register
          </Link>{" "}
          Here Please.
        </h3>
        <h3 className="text-lg italic">
          You Can Still Get Locations About Other Nearest Venerinary From Here.
        </h3>
      </div>
      {/* services */}
      <section className="p-5">
        <h1 className="text-green-550 text-center text-3xl my-10">
          Our Services
        </h1>

        <div className="overflow-x-auto overflow-y-hidden flex flex-row gap-2">
          {servicesItems.map((item) => (
            <div className="max-w-sm w-full bg-[#f0ecec] flex-shrink-0 my-2 h-[280px]">
              <div className="p-5">
                <div className="bg-green-550 h-[50px] w-[50px] flex items-center justify-center rounded-full">
                  {item.icon}
                </div>
                <div className="">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-green-550">
                    {item.title}
                  </h5>
                  <p className="mb-3 font-normal text-green-550 h-[100px]">
                    {item.description}
                  </p>
                </div>
                <a
                  href="#"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center hover:bg-green-550 hover:text-white"
                >
                  Read more
                  <svg
                    aria-hidden="true"
                    className="w-4 h-4 ml-2 -mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  {/* <BsArrowRightShort color="#000" size={25} /> */}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
