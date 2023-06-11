import React, { useState } from "react";
import { formatAsCurrency } from "../../functions/formatAsCurrency";
import DatePicker from "react-datepicker";
import { useRouter } from "next/navigation";
import { HiOutlineCalendar, HiOutlineClock } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Spinner from "../Spinner";

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
  const { docId, imgLink, providerInfo, service } = petServiceData;
  const {
    description,
    longDescription,
    price,
    serviceName,
    serviceProviderName,
  } = service;
  const router = useRouter();
  const loading = useSelector((state: RootState) => state.loading.loading);
  // const minTime = new Date();
  // minTime.setHours(8, 0, 0);

  // const maxTime = new Date();
  // maxTime.setHours(17, 0, 0);
  const sampleDate = new Date(2023, 5, 11);
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
              <div className="row-span-4">
                <h2 className="flex-grow text-xl font-semibold">
                  Booking Details
                </h2>
                <p className="text-gray-400">
                  Complete your booking by providing necessary details
                </p>
                <div className="h-[1px] w-full bg-gray-200 my-5" />
                <div className="">
                  <h3 className="my-5">Client Basic Information</h3>
                  <div className="flex flex-row justify-between my-2">
                    <p className="text-gray-400 line-clamp-1">name</p>
                    <p className="font-semibold">{user?.name}</p>
                  </div>
                  <div className="flex flex-row justify-between">
                    <p className="text-gray-400  line-clamp-1">email</p>
                    <p className="font-semibold">{user?.email}</p>
                  </div>
                </div>
                {user?.userType === "Client" && (
                  <>
                    <h3 className="my-5">Scheduling</h3>
                    <div className="flex flex-row items-center gap-1">
                      <div className="relative flex items-center justify-center cursor-pointer">
                        <HiOutlineCalendar className="absolute left-1 z-50" />
                        <DatePicker
                          showIcon
                          selected={selectedDay}
                          onChange={(date) => setSelectedDay(date as Date)}
                          minDate={new Date()}
                          placeholderText="Select Day"
                          className="p-2 border rounded-md cursor-pointer"
                        />
                      </div>
                      <div className="relative flex items-center justify-center cursor-pointer">
                        <HiOutlineClock className="absolute left-1 z-50" />
                        <DatePicker
                          timeInputLabel="Select Time"
                          showIcon
                          className="p-2 border rounded-md cursor-pointer"
                          selected={selectedTime}
                          onChange={(date) =>
                            setSelectedTime(new Date(date as Date))
                          }
                          showTimeSelect
                          showTimeSelectOnly
                          timeIntervals={15}
                          timeCaption="Time"
                          dateFormat="h:mm aa"
                          excludeTimes={disableTimes
                            .flatMap((time: any) => {
                              const newTime = time
                                .trim()
                                .replace(/\s?[AP]M$/i, "");
                              const [hours, minutes] = newTime.split(":");
                              const disabledTime = new Date(selectedDay!);
                              disabledTime.setHours(
                                Number(hours),
                                Number(minutes),
                                0
                              );
                              return dateArray.map((date: any) => {
                                return date.getDate() === selectedDay.getDate()
                                  ? disabledTime
                                  : new Date();
                              });
                            })
                            .filter((time: any) => time !== null)}
                          placeholderText="Select Time"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
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
