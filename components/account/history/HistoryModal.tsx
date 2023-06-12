import React from "react";
import { Dialog } from "@headlessui/react";
import Rate from "rc-rate";

interface HistoryModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  clientBookingId: any;
  user: any;
}

const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  setIsOpen,
  clientBookingId,
  user,
}) => {
  return (
    <Dialog
      onClose={() => setIsOpen(!isOpen)}
      open={isOpen}
      className="fixed inset-0 z-10 font-Nunito"
    >
      <div className="flex items-center justify-center min-h-screen px-4 text-center">
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

        <div className="inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
          <Dialog.Title
            as="h1"
            className="text-2xl font-bold leading-6 text-gray-900"
          >
            Pay and Upload
          </Dialog.Title>
          {user?.bookedDocIds.includes(clientBookingId) &&
            user?.userType === "Client" && <Rate value={4} />}
        </div>
      </div>
    </Dialog>
  );
};

export default HistoryModal;
