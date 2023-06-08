import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { Bookings } from "../../../../pages/_app";
import { formatAsCurrency } from "../../../../functions/formatAsCurrency";
import moment from "moment";
import CopyToClipboardButton from "../../../helpers/CopyToClipboardButton";
import { AiOutlineSend } from "react-icons/ai";
import { useRouter } from "next/navigation";

interface OngoingProps {
  bookings: Bookings[];
}

const Ongoing: React.FC<OngoingProps> = ({ bookings }) => {
  const router = useRouter();
  return (
    <>
      <div className="">
        {bookings?.map((item) => {
          const {
            bookingDetails,
            clientDetails,
            providerInfo,
            scheduling,
            docId,
          } = item;
          const {
            description,
            imgUrl,
            longDescription,
            price,
            serviceName,
            serviceDocId,
            serviceProviderName,
          } = bookingDetails;
          const { day, time } = scheduling;
          const mergedDateTime = moment(time, "hh:mm A").format("LLLL");
          return (
            <div className="p-4" key={docId}>
              <div className="flex flex-row justify-between items-center">
                <img
                  src={imgUrl}
                  alt="image"
                  className="h-[180px] w-[220px] rounded-md object-cover hidden md:block"
                />
                <div className="flex-grow px-5">
                  <div className="flex justify-between w-full">
                    <span>Ref Number</span>
                    <span className="flex items-center">
                      <CopyToClipboardButton text={docId} />
                      {docId}
                    </span>
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
                  <div className="flex justify-between w-full my-2">
                    <span>Reserved Date&Time</span>
                    <span>{mergedDateTime}</span>
                  </div>
                </div>
              </div>
              <div className="h-full w-full my-2 flex flex-row gap-2 justify-end ">
                <button className="text-white flex items-center flex-row bg-green-550 bg-reen-600 px-5 py-3 min-w-[120px] rounded-md">
                  Add Payment
                </button>
                <button
                  onClick={() => router.push(`/messages/room/${docId}`)}
                  className="text-white flex items-center flex-row bg-blue-500 hover:bg-blue-600 px-5 py-3 min-w-[120px] rounded-md "
                >
                  Send Message
                </button>
              </div>
              {/* spearator */}
              <div className="w-full h-[1px] my-5 bg-gray-200" />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Ongoing;
