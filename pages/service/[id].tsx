import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../../config/firebase";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { CreditCard } from "../_app";
import BookingDetails from "../../components/booking/BookingDetails";
import SuccessPage from "../../components/SuccessPage";

export const getStaticPaths = async () => {
  const querySnapshot = await getDocs(collection(firestore, "petServices"));
  const services = [] as any;
  querySnapshot.forEach((doc) => services.push(doc.data()));

  // map data to an array of path objects with params (id)
  const paths = services.map((item: any) => {
    return {
      params: { id: item.docId },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: any) => {
  const id = context?.params.id;
  const petServiceRef = doc(collection(firestore, "petServices"), id);
  const docSnapshot = await getDoc(petServiceRef);
  const petServiceData = docSnapshot.data();

  return {
    props: { petServiceData },
  };
};

const PetServiceDetails = ({ petServiceData }: any) => {
  const [selectedCard, setSelectedCard] = useState<CreditCard | undefined>(
    undefined
  );
  const [bookedDetails, setBookedDetails] = useState<any>(undefined);
  const user = useSelector((state: RootState) => state.user.user);
  const {
    docId: serviceDocId,
    imgLink,
    providerInfo,
    service,
  } = petServiceData;
  const { docId: provDocId, email, name } = providerInfo;
  const {
    description,
    longDescription,
    price,
    serviceName,
    serviceProviderName,
  } = service;

  const handleBook = async () => {
    const bookingDetails = {
      clientDetails: {
        name: user.name,
        email: user.email,
        imgUrl: user.imgUrl,
        selectedCard,
        userId: user.docId,
      },
      bookingDetails: {
        description,
        longDescription,
        price,
        serviceName,
        serviceProviderName,
        provDocId,
        email,
        name,
        imgUrl: imgLink,
        serviceDocId,
      },
    };
    const userCopy: any = { ...user };
    userCopy.bookings = {
      ...userCopy.bookings,
      ongoing: userCopy.bookings.ongoing.concat(bookingDetails),
    };

    try {
      // Update user document
      const userRef = doc(firestore, "client", user?.docId);
      await updateDoc(userRef, userCopy);

      // Update petCareProvider document
      const petCareProviderRef = doc(firestore, "petCareProvider", provDocId);
      const petCareProviderDoc = await getDoc(petCareProviderRef);
      if (petCareProviderDoc.exists()) {
        const petCareProviderData = petCareProviderDoc.data();
        const updatedOngoing = [
          ...(petCareProviderData.bookings?.ongoing || []),
          bookingDetails,
        ];

        await updateDoc(petCareProviderRef, {
          bookings: {
            ongoing: updatedOngoing,
          },
        });
      }
      setBookedDetails(bookingDetails);
    } catch (error) {
      console.error("Error handling booking:", error);
    }
  };

  return (
    <>
      <title>{serviceName}</title>
      <div className="h-screen bg-gray-100 p-5">
        <div className="p-5 rounded-md h-full bg-white">
          {bookedDetails !== undefined ? (
            <SuccessPage />
          ) : (
            <BookingDetails
              handleBook={handleBook}
              petServiceData={petServiceData}
              selectedCard={selectedCard}
              setSelectedCard={setSelectedCard}
              user={user}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default PetServiceDetails;
