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
  query,
  where,
  DocumentSnapshot,
} from "firebase/firestore";
import { firestore } from "../../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import BookingDetails from "../../components/booking/BookingDetails";
import SuccessPage from "../../components/SuccessPage";
import WithAuth from "../../auth/WithAuth";
import Loading from "../../components/Loading";
import moment from "moment";
import { toast } from "react-hot-toast";
import { setLoading } from "../../store/loadingSlice";
import { formatAsCurrency } from "../../functions/formatAsCurrency";
import { useRouter } from "next/navigation";

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
    revalidate: 10,
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
  const [selectedTime, setSelectedTime] = useState(
    new Date().setHours(8, 0, 0)
  );
  const {
    docId: serviceDocId,
    imgLink,
    providerInfo,
    service,
    scheduling,
  } = petServiceData;
  const { providerDocId, providerEmail, providerName } = providerInfo;
  const {
    description,
    longDescription,
    price,
    serviceName,
    serviceProviderName,
  } = service;
  const dispatch = useDispatch();
  const router = useRouter();

  async function searchBookingByServiceId(
    docId: string,
    currentServiceId: string
  ): Promise<boolean> {
    const clientRef = doc(firestore, "client", docId);
    const bookingsQuery = query(
      collection(clientRef, "bookings"),
      where("bookingDetails.serviceDocId", "==", currentServiceId)
    );

    try {
      const bookingsSnapshot = await getDocs(bookingsQuery);
      const matchingBookings = bookingsSnapshot.docs.filter((doc) => {
        const status = doc.data().status;
        return status === "pendingPayment" || status === "ongoing";
      });

      if (matchingBookings.length === 0) {
        return false; // No matching booking found
      }

      return true; // Matching booking found
    } catch (error) {
      console.error("Error searching for booking:", error);
      return false; // Error occurred during search
    }
  }

  const handleBook = async (currentServiceId: any) => {
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
      providerInfo: {
        ...providerInfo,
        providerBookingDocId: "",
      },
      scheduling: {
        day: selectedDay.toISOString(),
        time: `${moment(selectedTime, "HH:mm").format("HH:mm")} ${moment(
          selectedTime,
          "HH:mm"
        ).format("A")}`,
        clientBookingId: "",
        serviceBookingId: "",
      },
      status: "pendingPayment",
    };
    dispatch(setLoading(true));
    const isCurrentlyBooked = await searchBookingByServiceId(
      user?.docId,
      currentServiceId
    );
    if (user?.phone === "" || user?.phone === undefined) {
      router.push("/account");
      toast.error("Please add your phone number first to start booking");
    }
    if (isCurrentlyBooked) {
      dispatch(setLoading(false));
      return toast.error(
        "Please finish your current booking before scheduling another with this provider."
      );
    }
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
        providerImgUrl: imgLink,
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
      await updateDoc(newBookingDocRef, bookingDetails);
      await updateDoc(newPetCareProviderBookingRef, bookingDetails);

      await updateDoc(petServicesRef, {
        scheduling: arrayUnion({ ...bookingDetails.scheduling }),
      });

      setBookedDetails(bookingDetails);
      // email
      const collectionRef = collection(firestore, "mail");
      const { time } = bookingDetails.scheduling;
      const mergedDateTime = moment(time, "hh:mm A").format("LLLL");
      const newDocument = {
        to: [`${bookingDetails.clientDetails.clientEmail}`],
        message: {
          subject: "You Have Successfully Booked At Carepet",
          text: "",
          html: `
          <p style="font-family: Arial, sans-serif; font-size: 14px;">
            You have booked a <strong>${
              bookingDetails.bookingDetails.serviceProviderName
            }</strong> at the time and date of <strong>${mergedDateTime}</strong>. 
            <br>
            Please pay the amount due of <strong>${formatAsCurrency(
              Number(bookingDetails.bookingDetails.price)
            )}</strong>.
            <br>
            Go to <strong>Account > Bookings > Add payment</strong> on the corresponding booked details.
          </p>`,
        },
      };
      await addDoc(collectionRef, newDocument);
    } catch (error) {
      console.error("Error handling booking:", error);
    }
    dispatch(setLoading(false));
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
              scheduling={scheduling}
              selectedDay={selectedDay}
              selectedTime={selectedTime as any}
              setSelectedDay={setSelectedDay}
              setSelectedTime={setSelectedTime as any}
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
