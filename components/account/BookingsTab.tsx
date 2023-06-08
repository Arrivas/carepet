import React, { useState, useEffect } from "react";
import Ongoing from "./bookings/client/Ongoing";
import History from "./bookings/client/History";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  collection,
  query,
  onSnapshot,
  getDocs,
  doc,
  updateDoc,
  getFirestore,
} from "firebase/firestore";
import { firestore } from "../../config/firebase";
import { setBookings } from "../../store/bookingsSlice";

const fetchBookings = async () => {
  const clientCollectionRef = collection(firestore, "client");
  const clientQuerySnapshot = await getDocs(clientCollectionRef);

  const bookingPromises = clientQuerySnapshot.docs.map(async (clientDoc) => {
    const bookingsCollectionRef = collection(clientDoc.ref, "bookings");
    const bookingsQuerySnapshot = await getDocs(bookingsCollectionRef);

    return bookingsQuerySnapshot.docs.map((bookingDoc) => bookingDoc.data());
  });

  const bookingArrays = await Promise.all(bookingPromises);
  const res = bookingArrays.flat();
  return res || [];
};

const BookingsTab = () => {
  const [activeTab, setActiveTab] = useState("Ongoing");
  const dispatch = useDispatch();
  const bookings = useSelector((state: RootState) => state.bookings.bookings);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchBookings().then((res) => dispatch(setBookings(res)));
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <div className="flex flex-row justify-around">
        <button
          onClick={() => setActiveTab("Ongoing")}
          className={`border-b py-2 w-[40%]  ${
            activeTab === "Ongoing" ? "border-gray-300" : "border-white"
          }`}
        >
          Ongoing
        </button>
        <button
          onClick={() => setActiveTab("History")}
          className={`border-b py-2 w-[40%]  ${
            activeTab === "History" ? "border-gray-300" : "border-white"
          }`}
        >
          History
        </button>
      </div>
      {activeTab === "Ongoing" ? <Ongoing bookings={bookings} /> : <History />}
    </>
  );
};

export default BookingsTab;
