import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { SuccessPageProps } from "../pages/_app";
import { formatAsCurrency } from "../functions/formatAsCurrency";
import moment from "moment";
import { useRouter } from "next/navigation";

interface SuccessPageItemsProps {
  bookedDetails: SuccessPageProps;
}

const SuccessPage: React.FC<SuccessPageItemsProps> = ({ bookedDetails }) => {
  const { clientDetails, bookingDetails, scheduling, providerInfo } =
    bookedDetails;
  const { price, serviceName, serviceProviderName, docId } = bookingDetails;
  const { providerDocId, providerEmail, providerName, providerPhone } =
    providerInfo;
  const {} = clientDetails;
  const { clientBookingId, serviceBookingId, day, time } = scheduling;
  const mergedDateTime =
    moment(day).format("YYYY-MM-DD") +
    " " +
    moment(day, "hh:mm A").format("HH:mm");

  const router = useRouter();
  return (
    <>
      <div className="flex justify-center flex-col h-full w-full">
        <div className="flex flex-col items-center overflow-y-auto min-h-[90%]">
          <div className="bg-green-50 flex items-center justify-center rounded-full min-h-[120px] min-w-[120px]">
            <AiFillCheckCircle size={50} color="#40ac64" />
          </div>
          <h1 className="text-2xl font-semibold my-2">Successfully Booked</h1>
          <div className="w-full">
            <h4 className="font-semibold my-2">Booking Details</h4>

            <div className="px-4">
              <div className="flex justify-between w-full">
                <span>Ref Number</span>
                <span>{docId}</span>
              </div>
              <div className="flex justify-between w-full my-2">
                <span>Service Name</span>
                <span>{serviceName}</span>
              </div>
              <div className="flex justify-between w-full my-2">
                <span>Service Provider Name</span>
                <span>{serviceProviderName}</span>
              </div>
              <div className="flex justify-between w-full my-2">
                <span>Price</span>
                <span>{formatAsCurrency(Number(price))}</span>
              </div>
            </div>

            <h4 className="font-semibold my-2">
              Service Provider Contact Details
            </h4>
            <div className="px-4">
              <div className="flex justify-between w-full my-2">
                <span>Name</span>
                <span>{providerName}</span>
              </div>
              <div className="flex justify-between w-full my-2">
                <span>Email</span>
                <span>{providerEmail}</span>
              </div>
              <div className="flex justify-between w-full my-2">
                <span>Phone</span>
                <span>{providerPhone}</span>
              </div>
            </div>
            <h4 className="font-semibold my-2">Scheduling</h4>
            <div className="px-4">
              <div className="flex justify-between w-full my-2">
                <span>Reserved Date&Time</span>
                <span>{mergedDateTime}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-grow h-full w-full flex items-end justify-end gap-2">
          <button className="bg-gray-300 hover:bg-gray-400 font-bold px-5 py-3 min-w-[120px] rounded-md">
            Send Message
          </button>
          <button
            onClick={() => router.back()}
            className="bg-green-550 hover:bg-green-600 text-white font-bold px-5 py-3 min-w-[120px] rounded-md"
          >
            Done
          </button>
        </div>
      </div>
    </>
  );
};

export default SuccessPage;
