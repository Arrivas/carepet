import React, { useState, ChangeEvent, FocusEvent } from "react";
import Cards from "react-credit-cards-2";
import { CreditCard } from "../../pages/_app";
import AddCreditCardModal from "./AddCreditCardModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setUser } from "../../store/userSlice";
import { updateDoc, doc, getFirestore } from "firebase/firestore";
import { setLoading } from "../../store/loadingSlice";
import { toast } from "react-hot-toast";

const BillingTab = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const [state, setState] = useState<CreditCard>({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
    id: "",
  });
  const [creditCards, setCreditCards] = useState<CreditCard[]>(
    user?.creditCards || []
  );
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedCredit, setSelectedCredit] = useState<any>(undefined);
  const loading = useSelector((state: RootState) => state.loading.loading);

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;

    if (name === "expiry") {
      const sanitizedValue = value.replace(/[^0-9]/g, "");
      let formattedValue = "";

      if (sanitizedValue.length > 2) {
        formattedValue = `${sanitizedValue.slice(0, 2)}/${sanitizedValue.slice(
          2
        )}`;
      } else {
        formattedValue = sanitizedValue;
      }

      if (selectedCredit !== undefined)
        return setSelectedCredit((prev: any) => ({
          ...prev,
          [name]: formattedValue,
        }));
      setState((prev) => ({ ...prev, [name]: formattedValue }));
    } else {
      if (selectedCredit !== undefined)
        return setSelectedCredit((prev: any) => ({ ...prev, [name]: value }));
      setState((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleInputFocus = (evt: FocusEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const handleAddCard = async () => {
    const newCard = {
      id: new Date().toISOString(),
      number: state.number,
      expiry: state.expiry,
      cvc: state.cvc,
      name: state.name,
      focus: "",
    };

    setCreditCards((prevCards) => [...prevCards, newCard]);

    try {
      const db = getFirestore();
      const userRef = doc(db, "client", user.docId);
      await updateDoc(userRef, {
        ...user,
        creditCards: [...creditCards, newCard],
      });
      toast.success("added successfully");
    } catch (error) {
      console.log(error);
    }
    setState({
      number: "",
      expiry: "",
      cvc: "",
      name: "",
      focus: "",
      id: "",
    });
    setShowModal(false);
    dispatch(setUser({ ...user, creditCards: [...creditCards, newCard] }));
  };

  const handleSaveCard = async () => {
    dispatch(setLoading(true));
    if (selectedCredit !== undefined) {
      const updatedCards = creditCards?.map((card) => {
        if (card.id === selectedCredit.id) {
          return {
            ...card,
            cvc: selectedCredit.cvc,
            expiry: selectedCredit.expiry,
            focus: selectedCredit.focus,
            name: selectedCredit.name,
            number: selectedCredit.number,
          };
        }
        return card;
      });
      setCreditCards(updatedCards);
      try {
        const db = getFirestore();
        const userRef = doc(db, "client", user.docId);
        await updateDoc(userRef, {
          ...user,
          creditCards: updatedCards,
        });
        dispatch(setUser({ ...user, creditCards: updatedCards }));
        toast.success("saved successfully");
      } catch (error) {
        console.log(error);
      }
    }
    setSelectedCredit(undefined);
    setShowModal(false);
    dispatch(setLoading(false));
  };

  const handleDeleteCard = async (id: number) => {
    const creditCardsCopy = [...creditCards];
    const updatedCards = creditCardsCopy.filter((item) => item.id !== id);
    try {
      const db = getFirestore();
      const userRef = doc(db, "client", user.docId);
      await updateDoc(userRef, {
        ...user,
        creditCards: updatedCards,
      });
      toast.success("removed successfully");
      setCreditCards(updatedCards);
      dispatch(setUser({ ...user, creditCards: updatedCards }));
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="overflow-hidden">
      <h4 className="font-bold mb-3">My Cards</h4>
      <div className="flex flex-row overflow-x-auto w-full  p-2">
        {creditCards?.map((card, index) => (
          <button
            onClick={() => {
              setShowModal(true);
              setSelectedCredit(card);
            }}
            key={index}
          >
            <div className="p-4 gap-4">
              <Cards
                number={card.number?.replace(/(?<=\d{4})\d/g, "*")}
                expiry={card.expiry}
                cvc={card.cvc}
                name={card.name}
                focused={card.focus}
              />
            </div>
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={() => {
          setSelectedCredit(undefined);
          setShowModal(!showModal);
        }}
        className="w-[30%] py-2 font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Add Card
      </button>

      <AddCreditCardModal
        handleInputChange={handleInputChange}
        handleInputFocus={handleInputFocus}
        handleDeleteCard={handleDeleteCard}
        handleSaveCard={handleSaveCard}
        selectedCredit={selectedCredit}
        handleAddCard={handleAddCard}
        setIsOpen={setShowModal}
        isOpen={showModal}
        loading={loading}
        state={state}
      />
    </div>
  );
};

export default BillingTab;
