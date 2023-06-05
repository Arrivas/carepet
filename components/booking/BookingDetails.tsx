import React, { useState } from "react";
import { formatAsCurrency } from "../../functions/formatAsCurrency";
import Cards from "react-credit-cards-2";
import { CreditCard } from "../../pages/_app";
import DatePicker from "react-datepicker";
import { setHours, setMinutes, format, isSameDay, parse } from "date-fns";

interface BookingDetailsProps {
  petServiceData: any;
  user: any;
  setSelectedCard: any;
  handleBook: any;
  selectedCard: any;
}

const BookingDetails: React.FC<BookingDetailsProps> = ({
  petServiceData,
  user,
  setSelectedCard,
  handleBook,
  selectedCard,
}) => {
  const [selectedDateTime, setSelectedDateTime] = useState<any>(null);
  const [selectedFDate, setSelectedFDate] = useState<any>(null);
  const { docId, imgLink, providerInfo, service } = petServiceData;
  const {
    description,
    longDescription,
    price,
    serviceName,
    serviceProviderName,
  } = service;

  return (
    <>
      <div className="grid grid-cols-2 h-full overflow-hidden">
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
          <div className="flex-[1]">
            <div className="row-span-4">
              <h2 className="flex-grow text-xl font-semibold">
                Payment Details
              </h2>
              <p className="text-gray-300">
                Complete your booking by providing payment details
              </p>

              <div className="mt-5">
                <p className="text-gray-400">Name</p>
                <p className="font-semibold">{user.name}</p>
                <p className="text-gray-400">Email address</p>
                <p className="font-semibold">{user.email}</p>
              </div>
            </div>
          </div>
          <div className="overflow-auto flex-[2]">
            <h4 className="text-gray-400 mt-5">Select card</h4>
            <div className="flex flex-row overflow-x-auto w-full  p-2">
              {user?.creditCards?.length !== 0 ? (
                user?.creditCards?.map((card: CreditCard, index: number) => (
                  <button
                    onClick={() =>
                      setSelectedCard(
                        card.id === selectedCard?.id ? undefined : card
                      )
                    }
                    key={index}
                  >
                    <div
                      className={`p-4 gap-4 rounded-md border-2 border-white ${
                        selectedCard?.id === card.id ? " border-blue-500" : ""
                      }`}
                    >
                      <Cards
                        number={card.number?.replace(/(?<=\d{4})\d/g, "*")}
                        preview
                        expiry={card.expiry}
                        cvc={card.cvc}
                        name={card.name}
                        focused={card.focus}
                      />
                    </div>
                  </button>
                ))
              ) : (
                <>
                  <p className="text-gray-400 text-xs">
                    go to account and add billing information
                  </p>
                </>
              )}
            </div>
          </div>
          {selectedCard !== undefined && (
            <button
              onClick={handleBook}
              type="button"
              className="w-full py-2 font-medium text-white bg-green-550 rounded hover:bg-green-600"
            >
              Book Now
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default BookingDetails;
