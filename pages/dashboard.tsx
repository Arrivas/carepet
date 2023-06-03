import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import WithAuth from "../components/WithAuth";
import { AiOutlineSearch } from "react-icons/ai";
import { getDocs, collection } from "firebase/firestore";
import { firestore } from "../config/firebase";
import { setPetServices } from "../store/petServicesSlice";
import Image from "next/image";
import Link from "next/link";

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
  const user = useSelector((state: RootState) => state.user.user);
  const petServices = useSelector(
    (state: RootState) => state.petServices.value
  );
  const [search, setSearch] = useState("");

  const fetchPetServices = async (search: string) => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "petServices"));
      const services = [] as any;
      querySnapshot.forEach((doc) => services.push(doc.data()));
      // const petServices = querySnapshot.docs
      //   .map((doc) => doc.data())
      //   .filter((service) =>
      //     service.service.serviceName
      //       ?.toLowerCase()
      //       .includes(search?.toLowerCase())
      //   );
      return services;
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchPetServices("asd").then((res) => dispatch(setPetServices(res)));
    }
    return () => {
      isMounted = false;
    };
  }, []);

  // useEffect(() => {
  //   const debounceTimer = setTimeout(() => {
  //     fetchPetServices(search);
  //   }, 400);

  //   return () => clearTimeout(debounceTimer);
  // }, [search]);

  return (
    <>
      <title>Dashboard</title>
      {/* search */}
      <div className="p-5">
        <label className="mb-2 text-sm font-medium text-gray-900 sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <AiOutlineSearch size={25} />
          </div>
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-sm  focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search Pet Service..."
          />
        </div>

        <div className="mt-5">
          <div className="grid grid-cols-3 overflow-y-auto overflow-x-hidden gap-4 justify-center flex-grow-0">
            {petServices.map((item: any) => (
              <div
                key={item.docId}
                className="w-[350px] p-4 border mx-auto border-gray-300 shadow-md rounded-md mt-5"
              >
                <Link href={`./service/${item.docId}`}>
                  <button className="hover:text-white text-green-550 hover:bg-green-550 font-bold border border-green-550 rounded-md mb-4 py-2 px-4">
                    More Information
                  </button>
                </Link>
                <div style={{ maxWidth: "100%", height: "auto" }}>
                  <img
                    className="rounded-md object-cover"
                    src={item.imgLink} // Replace with the actual path to your image
                    alt="Your Image"
                    style={{ width: "100%", height: "200px" }}
                  />
                </div>
                <h1 className="text-2xl font-bold line-clamp-2 my-4">
                  {item.service.serviceProviderName}
                </h1>
                <h1 className="text-2xl ">{item.service.serviceName}</h1>
                <p className="line-clamp-3 mt-4 mb-2 text-xs">
                  {item.service.longDescription}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default WithAuth(dashboard);
