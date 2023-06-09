import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { formatAsCurrency } from "../../../../functions/formatAsCurrency";
import moment from "moment";
import CopyToClipboardButton from "../../../helpers/CopyToClipboardButton";
import { firestore } from "../../../../config/firebase";
import {
  collection,
  doc,
  QuerySnapshot,
  DocumentData,
  onSnapshot,
  query,
  where,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { setBookings } from "../../../../store/bookingsSlice";
import HistoryModal from "../../history/HistoryModal";
import { toast } from "react-hot-toast";

const History = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const bookings = useSelector((state: RootState) => state.bookings.bookings);
  const dispatch = useDispatch();
  const [isRateOpen, setIsRateOpen] = useState<boolean>(false);
  const [selectedBooking, setSelectedBooking] = useState<any>({});
  const [selectedRate, setSelectedRate] = useState(1);
  const [descriptionText, setDescriptionText] = useState<string>("");

  useEffect(() => {
    const getCollection =
      user?.userType === "Client" ? "client" : "petCareProvider";
    const userBookingsRef = collection(firestore, getCollection);

    const bookingsDocRef = doc(userBookingsRef, user?.docId);

    const chatsCollectionRef = query(
      collection(bookingsDocRef, "bookings"),
      where("status", "in", ["cancelled", "completed"])
    );

    const unsubscribe = onSnapshot(
      chatsCollectionRef,
      (querySnapshot: QuerySnapshot<DocumentData>) => {
        const bookings: any = [];
        querySnapshot.forEach((doc: any) => {
          bookings.push(doc.data());
        });
        dispatch(setBookings(bookings));
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const handleSubmitRate = async () => {
    const bookingRef = doc(
      collection(
        firestore,
        "client",
        selectedBooking?.clientDetails?.clientDocId,
        "bookings"
      ),
      selectedBooking?.clientDetails?.clientBookingId
    );
    const newRate = {
      imgUrl: user?.imgUrl,
      userName: user?.name,
      rate: selectedRate,
      descriptionText: descriptionText.trim(),
    };
    if (selectedRate === 0) return toast.error("rate cannot go below 1 star");
    const petServiceRef = doc(
      collection(firestore, "petServices"),
      selectedBooking?.bookingDetails?.serviceDocId
    );
    try {
      // @ts-ignore
      await updateDoc(bookingRef, { isRated: true, rate: selectedRate });
      await updateDoc(petServiceRef, {
        ratings: arrayUnion(newRate),
      });
      setIsRateOpen(false);
      toast.success("rating added successfully");
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  return (
    <>
      <div className="overflow-y-auto max-h-[99%]">
        {bookings?.length === 0 ? (
          <>
            <center className="mt-5">
              <span className="text-gray-200 w-full text-center italic">
                no items yet
              </span>
            </center>
          </>
        ) : (
          bookings
            ?.filter((item) => {
              if (item.status === "cancelled" || item.status === "completed")
                return item;
            })
            .map((item) => {
              const {
                bookingDetails,
                clientDetails,
                providerInfo,
                scheduling,
                docId,
                status,
                cancellationDateTime,
                dateTimeCompletion,
                isRated,
              } = item;

              const { clientDocId, clientBookingId } = clientDetails;
              const { providerDocId } = providerInfo;

              const {
                description,
                imgUrl,
                longDescription,
                price,
                serviceName,
                serviceDocId,
                serviceProviderName,
              } = bookingDetails;
              const { day, time } = scheduling;
              const mergedDateTime = moment(time, "hh:mm A").format("LLLL");
              return (
                <div className="p-4" key={docId}>
                  <div className="flex flex-row justify-between items-center">
                    <img
                      src={imgUrl}
                      alt="image"
                      className="h-[180px] w-[220px] rounded-md object-cover hidden md:block"
                    />
                    <div className="flex-grow px-5">
                      <div className="flex justify-between w-full">
                        <span>Ref Number</span>
                        <span className="flex items-center">
                          <CopyToClipboardButton text={docId} />
                          {docId}
                        </span>
                      </div>
                      <div className="flex justify-between w-full my-2">
                        <span>Service Name</span>
                        <span>{serviceName}</span>
                      </div>
                      <div className="flex justify-between w-full my-2">
                        <span>Service Provider Name</span>
                        <span>{serviceProviderName}</span>
                      </div>
                      <div className="flex justify-between w-full my-2">
                        <span>Price</span>
                        <span>{formatAsCurrency(Number(price))}</span>
                      </div>
                      <div className="flex justify-between w-full my-2">
                        <span>Reserved Date&Time</span>
                        <span>{mergedDateTime}</span>
                      </div>
                      <div className="flex justify-between w-full my-2">
                        <span>Status</span>
                        <span>
                          {status === "cancelled" ? "Cancelled" : "Completed"}
                        </span>
                      </div>
                      <div className="flex justify-between w-full my-2">
                        <span>
                          {status === "cancelled"
                            ? `Cancelation Date&Time`
                            : `Date&Time Completion`}
                        </span>
                        <span>
                          {moment(
                            status === "cancelled"
                              ? new Date(cancellationDateTime?.seconds * 1000)
                              : new Date(dateTimeCompletion?.seconds * 1000)
                          ).format("LLLL")}
                        </span>
                      </div>
                    </div>
                  </div>
                  {!isRated && user.userType === "Client" && (
                    <div className="h-full w-full my-2 flex flex-row gap-2 justify-end ">
                      <button
                        onClick={() => {
                          console.log(item);
                          setSelectedBooking(item);
                          setIsRateOpen(!isRateOpen);
                        }}
                        className="text-white flex items-center flex-row bg-yellow-300 hover:bg-yellow-400 px-5 py-3 rounded-md"
                      >
                        Rate
                      </button>
                    </div>
                  )}

                  {/* spearator */}
                  <div className="w-full h-[1px] my-5 bg-gray-200" />
                </div>
              );
            })
        )}
      </div>
      <HistoryModal
        descriptionText={descriptionText}
        setDescriptionText={setDescriptionText}
        handleSubmitRate={handleSubmitRate}
        selectedRate={selectedRate}
        setSelectedRate={setSelectedRate}
        bookingDetails={selectedBooking?.bookingDetails}
        isOpen={isRateOpen}
        setIsOpen={setIsRateOpen}
        clientDetails={selectedBooking?.clientDetails}
        user={user}
      />
    </>
  );
};

export default History;
