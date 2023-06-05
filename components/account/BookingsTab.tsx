import React, { useState } from "react";
import Ongoing from "./bookings/client/Ongoing";
import History from "./bookings/client/History";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const BookingsTab = () => {
  const [activeTab, setActiveTab] = useState("Ongoing");
  return (
    <>
      <div className="flex flex-row justify-around">
        <button
          onClick={() => setActiveTab("Ongoing")}
          className={`border-b py-2 w-[40%] border-white ${
            activeTab === "Ongoing" ? "border-black" : "border-white"
          }`}
        >
          Ongoing
        </button>
        <button
          onClick={() => setActiveTab("History")}
          className={`border-b py-2 w-[40%] border-white ${
            activeTab === "History" ? "border-black" : "border-white"
          }`}
        >
          History
        </button>
      </div>
      {activeTab === "Ongoing" ? <Ongoing /> : <History />}
    </>
  );
};

export default BookingsTab;
