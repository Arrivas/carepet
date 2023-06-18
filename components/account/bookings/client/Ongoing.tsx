import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { Bookings } from "../../../../pages/_app";
import { formatAsCurrency } from "../../../../functions/formatAsCurrency";
import moment from "moment";
import CopyToClipboardButton from "../../../helpers/CopyToClipboardButton";
import { useRouter } from "next/navigation";
import { firestore } from "../../../../config/firebase";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi";
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  QuerySnapshot,
  DocumentData,
  onSnapshot,
  query,
  where,
  serverTimestamp,
  arrayRemove,
  deleteDoc,
} from "firebase/firestore";
import { getStorage, getDownloadURL, uploadBytes, ref } from "firebase/storage";
import { setBookings } from "../../../../store/bookingsSlice";
import { ImageState } from "../../../../pages/account";
import PaymentModal from "../../pyment/PaymentModal";
import { toast } from "react-hot-toast";
import ShowReceiptModal from "../../pyment/ShowReceiptModal";

interface OngoingProps {
  bookings: Bookings[];
}

const Ongoing: React.FC<OngoingProps> = ({}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const bookings = useSelector((state: RootState) => state.bookings.bookings);
  const [receiptImage, setReceiptImage] = useState<ImageState>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>({});
  const statusArray = [
    "pendingPayment",
    "ongoing",
    "paymentSubmitted",
    "paymentRejected",
  ];

  useEffect(() => {
    const getCollection =
      user?.userType === "Client" ? "client" : "petCareProvider";
    const userBookingsRef = collection(firestore, getCollection);
    const bookingsDocRef = doc(userBookingsRef, user.docId);
    const chatsCollectionRef = query(
      collection(bookingsDocRef, "bookings"),
      where("status", "in", statusArray)
    );
    const unsubscribe = onSnapshot(
      chatsCollectionRef,
      (querySnapshot: QuerySnapshot<DocumentData>) => {
        const results: any = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          data.isClientDetailsOpen = false;
          results.push(data);
        });
        dispatch(setBookings(results));
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const handleCancelBooking = async (
    clientDocId: string,
    clientBookDocId: string,
    providerDocId: string,
    serviceDocId: string,
    providerBookDocId: string
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel the booking?"
    );
    if (confirmed) {
      try {
        const clientRef = doc(firestore, "client", clientDocId);
        const clientBookingsRef = collection(clientRef, "bookings");
        const petServicesRef = doc(firestore, "petServices", serviceDocId);
        const petCareProviderRef = doc(
          firestore,
          "petCareProvider",
          providerDocId
        );
        const petCareProviderBookingsRef = collection(
          petCareProviderRef,
          "bookings"
        );
        const messageDocRef = doc(firestore, "messages", clientBookDocId);

        const petServicesSnapshot = await getDoc(petServicesRef);
        const petServicesData = petServicesSnapshot.data();
        const updatedScheduling = petServicesData?.scheduling?.filter(
          (item: any) => item.clientBookingId !== clientBookDocId
        );

        await updateDoc(petServicesRef, {
          scheduling: updatedScheduling,
        });

        await updateDoc(clientRef, {
          bookedDocIds: arrayRemove(clientBookDocId),
        });

        await updateDoc(petCareProviderRef, {
          bookedDocIds: arrayRemove(clientBookDocId),
        });

        await deleteDoc(messageDocRef);

        await updateDoc(doc(clientBookingsRef, clientBookDocId), {
          status: "cancelled",
          cancellationDateTime: serverTimestamp(),
        });

        await updateDoc(doc(petCareProviderBookingsRef, providerBookDocId), {
          status: "cancelled",
          cancellationDateTime: serverTimestamp(),
        });
      } catch (error) {
        toast.error("something went wrong");
      }
    }
  };
  const handleAddPayment = async (
    petCareProviderDocId: string,
    petCareBookingDocId: string,
    clientDocId: string,
    clientBookingDocId: string
  ) => {
    try {
      const storage = getStorage();
      const storageRef = ref(storage, `userImages/${receiptImage?.fileName}`);
      // @ts-ignore
      await uploadBytes(storageRef, receiptImage?.file);
      const downloadURL = await getDownloadURL(storageRef);

      const clientRef = doc(firestore, "client", clientDocId);
      const petCareProviderRef = doc(
        firestore,
        "petCareProvider",
        petCareProviderDocId
      );

      const clientBookingRef = collection(clientRef, "bookings");
      const clientBookingDocRef = doc(clientBookingRef, clientBookingDocId);

      const providerBookingRef = collection(petCareProviderRef, "bookings");
      const providerBookingDocRef = doc(
        providerBookingRef,
        petCareBookingDocId
      );

      await updateDoc(clientBookingDocRef, {
        paymentImgUrl: downloadURL,
        status: "paymentSubmitted",
      });
      await updateDoc(providerBookingDocRef, {
        paymentImgUrl: downloadURL,
        status: "paymentSubmitted",
      });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setIsOpen(false);
      toast.success("Payment submitted successfully.");
    } catch (error) {
      console.error("Error submitting payment:", error);
    }
  };

  const handleAcceptPayment = async (
    petCareProviderDocId: string,
    petCareBookingDocId: string,
    clientDocId: string,
    clientBookingDocId: string
  ) => {
    try {
      const clientRef = doc(firestore, "client", clientDocId);
      const petCareProviderRef = doc(
        firestore,
        "petCareProvider",
        petCareProviderDocId
      );

      const clientBookingRef = collection(clientRef, "bookings");
      const clientBookingDocRef = doc(clientBookingRef, clientBookingDocId);

      const providerBookingRef = collection(petCareProviderRef, "bookings");
      const providerBookingDocRef = doc(
        providerBookingRef,
        petCareBookingDocId
      );

      await updateDoc(clientBookingDocRef, {
        status: "ongoing",
      });
      await updateDoc(providerBookingDocRef, {
        status: "ongoing",
      });
      toast.success("Payment accepted");
    } catch (error) {
      console.error("Error submitting payment:", error);
    }
  };

  const handleRejectPayment = async (
    petCareProviderDocId: string,
    petCareBookingDocId: string,
    clientDocId: string,
    clientBookingDocId: string
  ) => {
    try {
      const clientRef = doc(firestore, "client", clientDocId);
      const petCareProviderRef = doc(
        firestore,
        "petCareProvider",
        petCareProviderDocId
      );

      const clientBookingRef = collection(clientRef, "bookings");
      const clientBookingDocRef = doc(clientBookingRef, clientBookingDocId);

      const providerBookingRef = collection(petCareProviderRef, "bookings");
      const providerBookingDocRef = doc(
        providerBookingRef,
        petCareBookingDocId
      );

      await updateDoc(clientBookingDocRef, {
        status: "paymentRejected",
      });
      await updateDoc(providerBookingDocRef, {
        status: "paymentRejected",
      });
      toast.success("Payment rejected");
    } catch (error) {
      console.error("Error submitting payment:", error);
    }
  };

  const handleCompleteBooking = async (
    clientDocId: string,
    clientBookDocId: string,
    providerDocId: string,
    serviceDocId: string,
    providerBookDocId: string
  ) => {
    const confirmed = window.confirm(
      "Are you sure do you want to complete the booking?"
    );
    if (confirmed) {
      // Perform the cancellation logic

      // Get references to the necessary documents and collections
      const clientRef = doc(firestore, "client", clientDocId);
      const clientBookingsRef = collection(clientRef, "bookings");
      const petServicesRef = doc(firestore, "petServices", serviceDocId);
      const petCareProviderRef = doc(
        firestore,
        "petCareProvider",
        providerDocId
      );
      const petCareProviderBookingsRef = collection(
        petCareProviderRef,
        "bookings"
      );
      const messageDocRef = doc(firestore, "messages", clientBookDocId);

      // Retrieve scheduling data from petServices
      const petServicesSnapshot = await getDoc(petServicesRef);
      const petServicesData = petServicesSnapshot.data();
      const updatedScheduling = petServicesData?.scheduling?.filter(
        (item: any) => item.clientBookingId !== clientBookDocId
      );

      // Update documents with cancellation details
      await updateDoc(petServicesRef, {
        scheduling: updatedScheduling,
      });

      await updateDoc(clientRef, {
        bookedDocIds: arrayRemove(clientBookDocId),
      });

      await updateDoc(petCareProviderRef, {
        bookedDocIds: arrayRemove(clientBookDocId),
      });

      // Delete message document
      await deleteDoc(messageDocRef);

      // Update booking status and cancellation date/time
      await updateDoc(doc(clientBookingsRef, clientBookDocId), {
        status: "completed",
        dateTimeCompletion: serverTimestamp(),
      });

      await updateDoc(doc(petCareProviderBookingsRef, providerBookDocId), {
        status: "completed",
        dateTimeCompletion: serverTimestamp(),
      });
    }
  };
  const filterBook = bookings.filter((item: any) => {
    if (user && user.userType === "Client" && user.bookedDocIds) {
      // @ts-ignore
      if (user.bookedDocIds.includes(item.docId)) {
        return true;
      }
    } else if (user && user.userType === "Pet-Care Provider" && statusArray) {
      if (item && statusArray.includes(item.status)) {
        // Add a null check for item here
        return true;
      }
    }
    return false;
  });

  return (
    <>
      <div className="overflow-y-auto max-h-[99%]">
        {filterBook?.length === 0 ? (
          <>
            <center className="mt-5">
              <span className="text-gray-200 w-full text-center italic">
                no items yet
              </span>
            </center>
          </>
        ) : (
          filterBook?.map((item: any) => {
            const {
              bookingDetails,
              clientDetails,
              providerInfo,
              scheduling,
              docId,
              status,
              paymentImgUrl,
              isClientDetailsOpen,
            } = item;

            const {
              clientDocId,
              clientBookingId,
              clientEmail,
              clientName,
              clientPhoneNumber,
            } = clientDetails;
            const { providerDocId, providerName, providerPhone } = providerInfo;

            const {
              description,
              imgUrl,
              longDescription,
              price,
              serviceName,
              serviceDocId,
              serviceProviderName,
            } = bookingDetails;

            const { day, time, serviceBookingId } = scheduling;
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
                        {status === "pendingPayment"
                          ? "Pending Payment"
                          : status === "cancelled"
                          ? "Cancelled"
                          : status === "paymentSubmitted"
                          ? "Payment submitted, waiting for confirmation"
                          : status === "paymentRejected"
                          ? "Payment Rejected"
                          : "Ongoing"}
                      </span>
                    </div>
                    {user?.userType === "Pet-Care Provider" &&
                      status === "paymentSubmitted" && (
                        <div className="flex justify-between w-full my-2">
                          <span>Payment Receipt</span>
                          <button
                            onClick={() => {
                              setSelectedBooking(item);
                              setShowReceipt(true);
                            }}
                            className="underline text-blue-400"
                          >
                            Show Receipt
                          </button>
                        </div>
                      )}
                    {/* show client details */}
                    {user?.userType !== "Client" && isClientDetailsOpen && (
                      <>
                        <button
                          onClick={() => {
                            const bookingsCopy = [...filterBook];
                            const updatedBookings = bookingsCopy.map(
                              (copyItem: any) => {
                                if (copyItem.docId === item.docId) {
                                  return {
                                    ...copyItem,
                                    isClientDetailsOpen:
                                      !copyItem.isClientDetailsOpen,
                                  };
                                }
                                return copyItem;
                              }
                            );
                            dispatch(setBookings(updatedBookings));
                          }}
                          className="flex justify-between w-full py-3 rounded-md "
                        >
                          <span>client details</span>{" "}
                          {isClientDetailsOpen ? (
                            <HiOutlineChevronUp size={15} />
                          ) : (
                            <HiOutlineChevronDown size={15} />
                          )}
                        </button>

                        <div className="flex flex-col gap-2">
                          <span>
                            client name:
                            <span className="font-bold"> {clientName}</span>
                          </span>
                          <span>
                            client email:{" "}
                            <span className="font-bold">{clientEmail}</span>
                          </span>
                          <span>
                            client phone#:{" "}
                            <span className="font-bold">
                              {clientPhoneNumber}
                            </span>
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="h-full w-full my-2 flex flex-row gap-2 justify-end ">
                  {(user?.userType === "Client" &&
                    status === "pendingPayment") ||
                  (user?.userType === "Client" &&
                    status === "paymentRejected") ? (
                    <button
                      onClick={() => {
                        setIsOpen(true);
                        setSelectedBooking(item);
                      }}
                      className="text-white flex items-center flex-row bg-green-550 hover:bg-green-600 px-5 py-3 min-w-[120px] rounded-md"
                    >
                      Add Payment
                    </button>
                  ) : null}
                  {(user?.userType === "Pet-Care Provider" &&
                    status === "pendingPayment") ||
                  (user?.userType === "Pet-Care Provider" &&
                    status === "paymentRejected") ? (
                    <button
                      onClick={() =>
                        handleCancelBooking(
                          clientDocId,
                          clientBookingId,
                          providerDocId,
                          serviceDocId,
                          serviceBookingId
                        )
                      }
                      className="text-white flex items-center flex-row bg-red-500 hover:bg-red-600 px-5 py-3 min-w-[120px] rounded-md"
                    >
                      Cancel Booking
                    </button>
                  ) : (
                    <></>
                  )}

                  {user?.userType === "Pet-Care Provider" &&
                    status === "paymentSubmitted" && (
                      <>
                        <button
                          onClick={() =>
                            handleAcceptPayment(
                              providerDocId,
                              serviceBookingId,
                              clientDocId,
                              clientBookingId
                            )
                          }
                          className="text-white flex items-center flex-row bg-green-500 hover:bg-green-600 px-5 py-3 min-w-[120px] rounded-md"
                        >
                          Accept Payment
                        </button>
                        <button
                          onClick={() =>
                            handleRejectPayment(
                              providerDocId,
                              serviceBookingId,
                              clientDocId,
                              clientBookingId
                            )
                          }
                          className="text-white flex items-center flex-row bg-red-500 hover:bg-red-600 px-5 py-3 min-w-[120px] rounded-md"
                        >
                          Reject Payment
                        </button>
                      </>
                    )}
                  {user?.userType === "Pet-Care Provider" &&
                    status === "ongoing" && (
                      <button
                        onClick={() =>
                          handleCompleteBooking(
                            clientDocId,
                            clientBookingId,
                            providerDocId,
                            serviceDocId,
                            serviceBookingId
                          )
                        }
                        className="text-white flex items-center flex-row bg-green-550 hover:bg-green-600 px-5 py-3 min-w-[120px] rounded-md "
                      >
                        Complete Booking
                      </button>
                    )}

                  <button
                    onClick={() =>
                      router.push(`/messages/room/${clientBookingId}`)
                    }
                    className="text-white flex items-center flex-row bg-[#89b3cc] hover:bg-[#7aadca] px-5 py-3 min-w-[120px] rounded-md "
                  >
                    Send Message
                  </button>
                </div>

                {/* separator */}
                <div className="w-full h-[1px] my-5 bg-gray-200" />
              </div>
            );
          })
        )}
      </div>
      <ShowReceiptModal
        paymentImgUrl={selectedBooking?.paymentImgUrl}
        setShowReceipt={setShowReceipt}
        showReceipt={showReceipt}
      />
      <PaymentModal
        price={selectedBooking?.bookingDetails?.price}
        fileInputRef={fileInputRef}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        receiptImage={receiptImage}
        setReceiptImage={setReceiptImage}
        providerName={selectedBooking?.providerInfo?.providerName}
        providerPhone={selectedBooking?.providerInfo?.providerPhone}
        handleSubmit={handleAddPayment}
        clientDocId={selectedBooking?.clientDetails?.clientDocId}
        clientBookingId={selectedBooking?.clientDetails?.clientBookingId}
        providerDocId={selectedBooking?.providerInfo?.providerDocId}
        serviceDocId={selectedBooking?.bookingDetails?.serviceDocId}
        docId={selectedBooking?.scheduling?.serviceBookingId}
      />
    </>
  );
};

export default Ongoing;
