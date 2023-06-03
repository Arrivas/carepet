import React, { FocusEvent } from "react";
import { Dialog } from "@headlessui/react";
import { CreditCard } from "../../pages/_app";
import Cards from "react-credit-cards-2";
import Spinner from "../Spinner";
import { BsTrash } from "react-icons/bs";

interface AddCreditCardModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  state: CreditCard;
  handleInputChange: (evt: FocusEvent<HTMLInputElement>) => void;
  handleInputFocus: (evt: FocusEvent<HTMLInputElement>) => void;
  handleAddCard: () => void;
  selectedCredit: CreditCard | undefined;
  handleSaveCard: () => void;
  loading: boolean;
  handleDeleteCard: (id: number) => void;
}

const AddCreditCardModal: React.FC<AddCreditCardModalProps> = ({
  isOpen,
  setIsOpen,
  state,
  handleInputChange,
  handleInputFocus,
  handleAddCard,
  selectedCredit,
  handleSaveCard,
  loading,
  handleDeleteCard,
}) => {
  const requiredFields = ["number", "expiry", "cvc", "name"];
  const isFormFilled = requiredFields.every(
    // @ts-ignore
    (field: any) => state[field] !== ""
  );
  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center  p-4">
        <Dialog.Panel className="relative mx-auto max-w-3xl max-h-lg py-10 w-full p-5 rounded bg-white">
          <Cards
            number={selectedCredit?.number || state.number}
            cvc={selectedCredit?.cvc || state.cvc}
            name={selectedCredit?.name || state.name}
            expiry={selectedCredit?.expiry || state.expiry}
            focused={selectedCredit?.focus || state.focus}
          />
          <form className="mt-8 max-w-[60%] mx-auto max-h-[60%]">
            <div className="flex flex-row space-x-2">
              <div className="mb-4 flex-grow w-full">
                <label
                  htmlFor="number"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Card Number
                </label>
                <input
                  type="text"
                  id="number"
                  name="number"
                  placeholder="Card Number"
                  value={selectedCredit?.number || state.number}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="cvc"
                  className="block mb-2 font-medium text-gray-700"
                >
                  CVC
                </label>
                <input
                  type="text"
                  id="cvc"
                  name="cvc"
                  placeholder="CVC"
                  value={selectedCredit?.cvc || state.cvc}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex flex-row items-center justify-between space-x-2">
              <div className="mb-4 flex-shrink w-full">
                <label
                  htmlFor="name"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  value={selectedCredit?.name || state.name}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="expiry"
                  className="block mb-2 font-medium text-gray-700"
                >
                  Expiry
                </label>
                <input
                  type="text"
                  id="expiry"
                  name="expiry"
                  placeholder="MM/YY"
                  value={selectedCredit?.expiry || state.expiry}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  maxLength={5}
                  pattern="\d\d/\d\d"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            {selectedCredit !== undefined && (
              <button
                title="delete card"
                disabled={loading}
                type="button"
                onClick={() => handleDeleteCard(selectedCredit?.id)}
                className="text-black hover:text-red-400 absolute top-4 right-4"
              >
                <BsTrash />
                {loading && <Spinner />}
              </button>
            )}
            {isFormFilled ? (
              <button
                disabled={loading}
                type="button"
                onClick={handleAddCard}
                className="w-full flex items-center justify-center flex-row py-2 font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
              >
                Add Card
                {loading && <Spinner />}
              </button>
            ) : (
              selectedCredit !== undefined && (
                <button
                  disabled={loading}
                  type="button"
                  onClick={handleSaveCard}
                  className="w-full  flex items-center justify-center flex-row py-2 font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
                >
                  Save Card
                  {loading && <Spinner />}
                </button>
              )
            )}
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AddCreditCardModal;
