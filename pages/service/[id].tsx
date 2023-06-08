import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  addDoc,
  arrayUnion,
  setDoc,
} from "firebase/firestore";
import { firestore } from "../../config/firebase";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import BookingDetails from "../../components/booking/BookingDetails";
import SuccessPage from "../../components/SuccessPage";
import WithAuth from "../../auth/WithAuth";
import Loading from "../../components/Loading";
import moment from "moment";

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
  const [bookedDetails, setBookedDetails] = useState<any>(undefined);
  const user = useSelector((state: RootState) => state.user.user);
  const [selectedDay, setSelectedDay] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const {
    docId: serviceDocId,
    imgLink,
    providerInfo,
    service,
  } = petServiceData;
  const { providerDocId, providerEmail, providerName, providerImgUrl } =
    providerInfo;
  const {
    description,
    longDescription,
    price,
    serviceName,
    serviceProviderName,
  } = service;

  const disableTimes = ["10:00 AM", "14:30 PM", "16:45 PM"];
  const handleBook = async () => {
    const bookingDetails = {
      clientDetails: {
        clientName: user.name,
        clientEmail: user.email,
        clientImgUrl: user.imgUrl,
        clientDocId: user.docId,
        clientBookingId: "",
        clientPhoneNumber: user.phone,
      },
      bookingDetails: {
        description,
        longDescription,
        price,
        serviceName,
        serviceProviderName,
        imgUrl: imgLink,
        serviceDocId,
        docId: "",
      },
      providerInfo,
      scheduling: {
        day: selectedDay.toISOString(),
        time: moment(selectedTime, "HH:mm").format("hh:mm A"),
        clientBookingId: "",
        serviceBookingId: "",
      },
    };

    try {
      // add booking details to user

      const userRef = doc(firestore, "client", user?.docId);
      const bookingsCollectionRef = collection(userRef, "bookings");
      const newBookingDocRef = await addDoc(
        bookingsCollectionRef,
        bookingDetails
      );
      const newBookingDocId = newBookingDocRef.id;
      bookingDetails.clientDetails.clientBookingId = newBookingDocId;

      await updateDoc(userRef, {
        bookedDocIds: arrayUnion(newBookingDocId),
      });

      await updateDoc(newBookingDocRef, {
        docId: newBookingDocId,
        ...bookingDetails,
      });

      const newMessage = {
        providerInfo: providerDocId,
        providerName,
        providerImgUrl,
        clientInfo: {
          clientDocId: user.docId,
          clientName: user.name,
          clientImgUrl: user.imgUrl,
        },
      };

      // add messages doc
      const messagesCollectionRef = collection(firestore, "messages");
      const newMessageDocRef = doc(messagesCollectionRef, newBookingDocId);
      await setDoc(newMessageDocRef, {
        ...newMessage,
        chatId: newMessageDocRef.id,
      });

      // service

      const petCareProviderRef = doc(
        firestore,
        "petCareProvider",
        providerDocId
      );
      await updateDoc(petCareProviderRef, {
        bookedDocIds: arrayUnion(newBookingDocId),
      });
      const petCareProviderBookingsRef = collection(
        petCareProviderRef,
        "bookings"
      );
      const newPetCareProviderBookingRef = await addDoc(
        petCareProviderBookingsRef,
        bookingDetails
      );

      const newPetCareProviderBookingId = newPetCareProviderBookingRef.id;

      bookingDetails.bookingDetails.docId = newBookingDocId;
      await updateDoc(newPetCareProviderBookingRef, {
        docId: newPetCareProviderBookingId,
        ...bookingDetails,
      });
      const petServicesRef = doc(firestore, "petServices", serviceDocId);

      // Push the scheduling data to the petServices document
      bookingDetails.scheduling.clientBookingId = newBookingDocId;
      bookingDetails.scheduling.serviceBookingId = newPetCareProviderBookingId;
      await updateDoc(petServicesRef, {
        scheduling: arrayUnion(bookingDetails.scheduling),
      });

      setBookedDetails(bookingDetails);
    } catch (error) {
      console.error("Error handling booking:", error);
    }
  };

  if (!user?.email) return <Loading />;

  return (
    <>
      <title>{serviceName}</title>
      <div className="h-screen bg-gray-100 p-5 font-Nunito">
        <div className="p-5 rounded-md h-full bg-white">
          {bookedDetails !== undefined ? (
            <SuccessPage bookedDetails={bookedDetails} />
          ) : (
            <BookingDetails
              disableTimes={disableTimes}
              selectedDay={selectedDay}
              selectedTime={selectedTime}
              setSelectedDay={setSelectedDay}
              setSelectedTime={setSelectedTime}
              handleBook={handleBook}
              petServiceData={petServiceData}
              user={user}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default WithAuth(PetServiceDetails);
