import React from "react";
import { Dialog } from "@headlessui/react";

interface ShowReceiptModalProps {
  showReceipt: boolean;
  setShowReceipt: React.Dispatch<React.SetStateAction<boolean>>;
  paymentImgUrl: string | undefined;
}

const ShowReceiptModal: React.FC<ShowReceiptModalProps> = ({
  showReceipt,
  setShowReceipt,
  paymentImgUrl,
}) => {
  return (
    <>
      <Dialog
        open={showReceipt}
        onClose={() => setShowReceipt(false)}
        className="fixed inset-0 z-10 font-Nunito"
      >
        <div className="flex items-center justify-center min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <button onClick={() => setShowReceipt(false)}></button>
          <div className="inline-block p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
            <div className="my-2">
              <img
                src={paymentImgUrl}
                className="h-[30rem] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default ShowReceiptModal;
