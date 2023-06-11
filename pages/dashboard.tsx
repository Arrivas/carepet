import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { AiOutlineSearch } from "react-icons/ai";
import { getDocs, collection } from "firebase/firestore";
import { auth, firestore } from "../config/firebase";
import { setPetServices } from "../store/petServicesSlice";
import Link from "next/link";
import WithAuth from "../auth/WithAuth";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../components/Loading";
import { useRouter } from "next/router";
import Image from "next/image";
import Typewriter from "typewriter-effect";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import ProtectedRoute from "../auth/ProtectedRoute";

const fetchPetServices = async (search: string) => {
  try {
    const querySnapshot = await getDocs(collection(firestore, "petServices"));
    const petServices: any = [];
    querySnapshot.forEach((doc) => {
      petServices.push(doc.data());
    });
    return petServices;
  } catch (error) {
    console.error("Error fetching documents:", error);
  }
};

const dashboard = () => {
  const dispatch = useDispatch();
  const [user, loading] = useAuthState(auth);

  const petServices = useSelector(
    (state: RootState) => state.petServices.value
  );
  const [search, setSearch] = useState("");
  const [debounceComplete, setDebonceComplete] = useState(false);
  const router = useRouter();

  const fetchPetServices = async (search: string) => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "petServices"));
      // const services = [] as any;
      // querySnapshot.forEach((doc) => services.push(doc.data()));
      if (search === "") return [];
      const petServices = querySnapshot.docs
        .map((doc) => doc.data())
        .filter((service) =>
          service.service.serviceName
            ?.toLowerCase()
            .includes(search?.toLowerCase())
        );
      return petServices;
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    let debounceTimer: any;
    if (isMounted) {
      setDebonceComplete(false);
      debounceTimer = setTimeout(() => {
        fetchPetServices(search).then((res) => {
          dispatch(setPetServices(res));
          setDebonceComplete(true);
        });
      }, 400);
      router.events.on("routeChangeStart", () => {
        setSearch("");
      });
    }
    return () => {
      isMounted = false;
      clearTimeout(debounceTimer);
    };
  }, [search]);

  return (
    <ProtectedRoute>
      <div className="p-5">
        <label className="mb-2  text-sm font-medium text-gray-900 sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <AiOutlineSearch
              size={25}
              color={`${search ? "#000" : "#d6d6d6"}`}
            />
          </div>
          <div>
            <label htmlFor="default-search"></label>
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="search"
              id="default-search"
              className="w-full p-4 pl-10 text-sm  focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search Pet Service..."
            />
          </div>
        </div>
        {/* find pet services header */}
        {!search && (
          <div className="mx-auto text-center flex items-center justify-center min-h-[80vh] overflow-x-hidden">
            <div className="">
              <h1 className="font-Montserrat font-bold text-[2rem] md:text-[4rem] whitespace-break-spaces ">
                Find Pet Services Like
              </h1>
              <Typewriter
                options={{
                  wrapperClassName:
                    "p-5 text-green-550 font-Montserrat font-bold text-[2rem] md:text-[4rem]",
                  cursorClassName: "h-[2rem] md:text-[5rem] md:h-[4rem]",
                  cursor: "|",
                  strings: [
                    "Pet Transport",
                    "Pet Checkup",
                    "Dog Walk",
                    "Pet Planner",
                    "Pet Grooming",
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
              <Image
                priority
                className="object-contain"
                src="/hero/playground_assets/ppl.svg"
                alt="search"
                width={1200}
                height={400}
              />
            </div>
          </div>
        )}

        {petServices?.length === 0 && search ? (
          <div className="h-[90vh] flex items-center justify-center">
            <span className="text-gray-300">
              {!debounceComplete ? "searching.." : "no results found"}
            </span>
          </div>
        ) : (
          <div className="mt-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-y-auto overflow-x-hidden gap-4 justify-center flex-grow-0">
              {petServices?.map((item: any) => (
                <div
                  key={item.docId}
                  className="max-w-sm bg-white p-4 border mx-auto border-gray-300 shadow-md rounded-md mt-5"
                >
                  <Link href={`./service/${item.docId}`}>
                    <button
                      onClick={() => setSearch("")}
                      className="hover:text-white text-start text-green-550 hover:bg-green-550 font-bold border border-green-550 rounded-md mb-4 py-2 px-4"
                    >
                      More Information
                    </button>
                  </Link>
                  <div style={{ maxWidth: "100%", height: "auto" }}>
                    <img
                      className="rounded-md object-cover"
                      src={item.imgLink}
                      alt="Your Image"
                      style={{ width: "100%", height: "200px" }}
                    />
                  </div>
                  <h1 className="text-2xl font-bold line-clamp-2 font-Montserrat">
                    {item.service.serviceProviderName}
                  </h1>
                  <h1 className="text-2xl font-Montserrat">
                    {item.service.serviceName}
                  </h1>
                  <p className="line-clamp-3 mt-4 mb-2 text-xs font-Montserrat">
                    {item.service.longDescription}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
    // <div>
    //   {/* <title>Dashboard</title> */}
    //   <div className="bg-[#f8faf6] min-h-[40vh] pt-0 md:pt-[80px] font-Nunito">
    //     <div className="flex flex-col md:flex-row items-center justify-between w-full relative">
    //       <div className="hidden md:block flex-[2]">
    //         <h1 className="whitespace-break-spaces text-[4rem] font-bold">
    //           Lorem Ipsum Dolor Sit 'A Met
    //         </h1>
    //         <p>
    //           Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
    //           est blanditiis ipsa repudiandae a labore eligendi facilis commodi
    //           aliquam illum?
    //         </p>
    //       </div>
    //       <img
    //         src="./hero/playground_assets/here16.jpg"
    //         className="h-[28rem] w-screen md:w-[42rem] object-cover  relative top-0 md:top-5"
    //         alt="hero"
    //       />
    //     </div>
    //   </div>
    //   {/* search */}
    // </div>
  );
};

export default WithAuth(dashboard);
