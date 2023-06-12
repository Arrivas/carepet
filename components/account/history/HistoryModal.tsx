import React from "react";
import { Dialog } from "@headlessui/react";
import Rate from "rc-rate";

interface HistoryModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: any;
  clientDetails: {
    clientBookingId: string;
    clientDocId: string;
    clientEmail: string;
    clientImgUrl: string;
    clientName: string;
    clientPhoneNumber: string;
  };
  bookingDetails: {
    description: string;
    docId: string;
    imgUrl: string;
    longDescription: string;
    price: string;
    serviceDocId: string;
    serviceName: string;
    serviceProviderName: string;
  };
  selectedRate: number;
  setSelectedRate: React.Dispatch<React.SetStateAction<number>>;
  handleSubmitRate: any;
  descriptionText: string;
  setDescriptionText: React.Dispatch<React.SetStateAction<string>>;
}

const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  setIsOpen,
  clientDetails,
  bookingDetails,
  selectedRate,
  setSelectedRate,
  handleSubmitRate,
  descriptionText,
  setDescriptionText,
}) => {
  const handleChange = (value: number) => {
    setSelectedRate(value);
  };
  return (
    <Dialog
      onClose={() => setIsOpen(!isOpen)}
      open={isOpen}
      className="fixed inset-0 z-10 font-Nunito "
    >
      <div className="flex items-center justify-center min-h-screen px-4 text-center ">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
          <Dialog.Title
            as="h1"
            className="text-2xl font-bold leading-6 text-gray-900"
          >
            Rate {bookingDetails?.serviceProviderName}
          </Dialog.Title>
          <div className="w-[40rem]">
            <span>service name - </span>
            <span>{bookingDetails?.serviceName}</span>
          </div>
          <center>
            <div className="p-5 ">
              <Rate
                character={<span style={{ fontSize: "40px" }}>★</span>}
                value={selectedRate}
                onChange={handleChange}
              />
            </div>
          </center>
          <textarea
            value={descriptionText}
            onChange={(e) => setDescriptionText(e.target.value)}
            className="rounded-md border border-gray-300 px-4 py-2 w-full"
            rows={4}
            placeholder="Description"
          ></textarea>
          <div className="flex w-full items-center justify-end">
            <button
              onClick={handleSubmitRate}
              className="self-end text-white flex items-center flex-row bg-green-400 hover:bg-green-500 px-5 py-3 rounded-md"
            >
              rate
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default HistoryModal;
