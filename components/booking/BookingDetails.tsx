import React, { useState } from "react";
import { formatAsCurrency } from "../../functions/formatAsCurrency";
import { useRouter } from "next/navigation";
import { HiOutlineCalendar, HiOutlineClock } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Spinner from "../Spinner";
import BookingDetailsTab from "./BookingDetailsTab";

interface BookingDetailsProps {
  petServiceData: any;
  user: any;
  handleBook: any;
  selectedDay: Date;
  setSelectedDay: React.Dispatch<React.SetStateAction<Date>>;
  selectedTime: Date;
  setSelectedTime: React.Dispatch<React.SetStateAction<Date>>;
  scheduling: any;
}

const BookingDetails: React.FC<BookingDetailsProps> = ({
  petServiceData,
  user,
  handleBook,
  selectedDay,
  setSelectedDay,
  selectedTime,
  setSelectedTime,
  scheduling,
}) => {
  const { docId, imgLink, providerInfo, service, ratings } = petServiceData;
  const {
    description,
    longDescription,
    price,
    serviceName,
    serviceProviderName,
  } = service;
  const router = useRouter();
  const loading = useSelector((state: RootState) => state.loading.loading);
  const [openRatings, setOpenRatings] = useState(false);

  const dateArray = scheduling.map((sched: any) => {
    const date = new Date(sched.day);
    return new Date(
      `${date.getFullYear()}, ${date.getMonth()}, ${date.getDate()}`
    );
  });
  const disableTimes = scheduling.map((booking: any) => booking.time);

  return (
    <>
      {serviceName ? (
        <div className="grid gridcols-1 md:grid-cols-2 h-full overflow-y-auto">
          {/* left */}
          <div className="w-full px-5">
            <h4 className="font-semibold">{serviceName}</h4>

            <div className="flex flex-row my-5">
              <h2 className="flex-grow text-2xl font-semibold">
                {serviceProviderName}
              </h2>
              <span className="flex-grow text-end text-lg font-semibold">
                {formatAsCurrency(price)}
              </span>
            </div>
            {/* image */}
            <img
              src={imgLink}
              className="h-[300px] w-full object-cover rounded-md"
            />
            <p className="my-5">{longDescription}</p>
          </div>
          {/* right side */}
          <div className="flex flex-col px-5">
            <div className="">
              {openRatings ? (
                <></>
              ) : (
                <BookingDetailsTab
                  dateArray={dateArray}
                  disableTimes={disableTimes}
                  selectedDay={selectedDay}
                  selectedTime={selectedTime}
                  setSelectedDay={setSelectedDay}
                  setSelectedTime={setSelectedTime}
                  user={user}
                />
              )}
            </div>
            {user?.userType === "Client" && (
              <div className="flex gap-1 my-5">
                <button
                  onClick={() => router.back()}
                  type="button"
                  className="w-full py-2 font-medium text-white bg-gray-400 rounded hover:bg-gray-500"
                >
                  Go Back
                </button>
                <button
                  disabled={loading}
                  onClick={() => handleBook(docId)}
                  type="button"
                  className="flex flex-row items-center justify-center w-full py-2 font-medium text-white bg-green-550 rounded hover:bg-green-600"
                >
                  Book Now
                  {loading && <Spinner />}
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <span>loading..</span>
        </div>
      )}
    </>
  );
};

export default BookingDetails;
