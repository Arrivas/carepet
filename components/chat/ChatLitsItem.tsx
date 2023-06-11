import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  getDocs,
  doc,
  updateDoc,
  getFirestore,
  where,
  orderBy,
  limit,
  query,
  QuerySnapshot,
  DocumentData,
  getDoc,
} from "firebase/firestore";
import { firestore } from "../../config/firebase";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface ChatLitsItemProps {
  index: number;
  item: any;
}

const ChatLitsItem: React.FC<ChatLitsItemProps> = ({ item }) => {
  const [chats, setChats] = useState<any>([]);
  const [chatDetails, setChatDetails] = useState<any>({});
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.user);

  const fetchChatDetails = async () => {
    const messagesRef = collection(firestore, "messages");

    try {
      // @ts-ignore
      const messageDocRef = doc(messagesRef, item.messagesDocId);
      const unsubscribe = onSnapshot(messageDocRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const documentData = docSnapshot.data();
          setChatDetails(documentData);
        } else {
          console.log("Document does not exist.");
        }
      });

      return unsubscribe;
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

  useEffect(() => {
    const messagesRef = collection(firestore, "messages");
    const messageDocRef = doc(messagesRef, item.messagesDocId);
    const chatsCollectionRef = collection(messageDocRef, "chats");
    fetchChatDetails();
    const queryString: any = query(
      chatsCollectionRef,
      orderBy("timeStamp", "desc")
    );
    const unsubscribe = onSnapshot(
      queryString,
      (querySnapshot: QuerySnapshot<DocumentData>) => {
        const chats: any = [];
        querySnapshot.forEach((doc: any) => {
          chats.push(doc.data());
        });

        setChats(chats);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      <button
        onClick={() => router.push(`/messages/room/${item.messagesDocId}`)}
        className="flex flex-row gap-2 items-center rounded-md hover:bg-gray-100 p-4"
      >
        <img
          src={
            user?.userType === "Client"
              ? item?.providerImgUrl
              : item?.clientInfo?.clientImgUrl
          }
          className="h-[50px] w-[50px] object-cover rounded-full"
        />
        <div className="flex flex-col items-start">
          <span className="font-bold">
            {user?.userType === "Client"
              ? item?.providerName
              : item?.clientInfo.clientName}
          </span>
          <span
            className={`text-xs ${
              user?.userType === "Client" && chatDetails?.clientSeen
                ? "text-gray-300"
                : user?.userType === "Pet-Care Provider" &&
                  chatDetails?.serviceProviderSeen
                ? "text-gray-300"
                : "text-black"
            }`}
          >
            {chats[0]?.message || "start a converstation"}
          </span>
        </div>
      </button>
    </>
  );
};

export default ChatLitsItem;
