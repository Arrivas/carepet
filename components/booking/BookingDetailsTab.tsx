import React from "react";
import { HiOutlineCalendar, HiOutlineClock } from "react-icons/hi2";
import DatePicker from "react-datepicker";

interface BookingDetailsTabProps {
  user: any;
  selectedDay: any;
  setSelectedDay: any;
  selectedTime: any;
  disableTimes: any;
  setSelectedTime: any;
  dateArray: any;
}

const BookingDetailsTab: React.FC<BookingDetailsTabProps> = ({
  user,
  selectedDay,
  selectedTime,
  setSelectedTime,
  disableTimes,
  dateArray,
  setSelectedDay,
}) => {
  return (
    <>
      <div className="row-span-4">
        <h2 className="flex-grow text-xl font-semibold">Booking Details</h2>
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
                  onChange={(date) => setSelectedTime(new Date(date as Date))}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                  excludeTimes={disableTimes
                    .flatMap((time: any) => {
                      const newTime = time.trim().replace(/\s?[AP]M$/i, "");
                      const [hours, minutes] = newTime.split(":");
                      const disabledTime = new Date(selectedDay!);
                      disabledTime.setHours(Number(hours), Number(minutes), 0);
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
    </>
  );
};

export default BookingDetailsTab;
