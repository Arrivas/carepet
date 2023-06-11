import React, { useRef, ForwardedRef } from "react";
import { Dialog } from "@headlessui/react";
import { ImageState } from "../../../pages/account";
import { formatAsCurrency } from "../../../functions/formatAsCurrency";

interface PaymentModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  fileInputRef: any;
  receiptImage: ImageState | undefined;
  setReceiptImage: React.Dispatch<React.SetStateAction<ImageState | undefined>>;
  providerName: string;
  providerPhone: string;
  price: string;
  handleSubmit: any;
  clientDocId: string;
  clientBookingId: string;
  providerDocId: string;
  serviceDocId: string;
  docId: string;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  setIsOpen,
  fileInputRef,
  receiptImage,
  setReceiptImage,
  providerName,
  providerPhone,
  price,
  handleSubmit,
  clientDocId,
  clientBookingId,
  providerDocId,
  serviceDocId,
  docId,
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileName = file.name;
      const reader = new FileReader();

      reader.onload = (event) => {
        const imageData = event.target?.result as string;
        setReceiptImage({ file, fileName, imageData });
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        setReceiptImage(undefined);
      }}
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
          <div className="my-2">
            <h3>
              Pay the corresponding amount in GCASH APP and take a screenshot of
              the receipt.
            </h3>
            <h3>
              Upload your payment receipt in order to complete the booking.
            </h3>
          </div>

          <div>
            <h2 className="font-semibold">Recipient Name and Phone#</h2>
            <h3 className="my-1">{providerName}</h3>
            <h3 className="my-1">{providerPhone}</h3>
            <h3 className="my-1">
              Amount Due: {formatAsCurrency(Number(price))}
            </h3>
          </div>
          {receiptImage?.imageData ? (
            <img
              src={receiptImage?.imageData || ""}
              className="h-[200px] w-[100%] object-contain"
            />
          ) : (
            <div className="h-[200px] w-[100%] flex items-center justify-center text-gray-200 italic">
              <span>no image selected</span>
            </div>
          )}

          <div className="mt-4 flex justify-between">
            <input
              ref={fileInputRef}
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1 text-xs placeholder:text-gray-300"
            />
            {receiptImage?.imageData !== undefined && (
              <button
                onClick={() =>
                  handleSubmit(
                    providerDocId,
                    docId,
                    clientDocId,
                    clientBookingId
                  )
                }
                className="p-2 px-4 rounded-md tracking-wider font-semibold bg-gray-200 hover:bg-gray-300"
              >
                submit
              </button>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default PaymentModal;
