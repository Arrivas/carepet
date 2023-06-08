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
} from "firebase/firestore";
import { firestore } from "../../config/firebase";
import { useRouter } from "next/navigation";

interface ChatLitsItemProps {
  index: number;
  item: any;
}

const ChatLitsItem: React.FC<ChatLitsItemProps> = ({ item }) => {
  const [chats, setChats] = useState<any>([]);
  const router = useRouter();

  useEffect(() => {
    const messagesRef = collection(firestore, "messages");
    const messageDocRef = doc(messagesRef, item.messagesDocId);
    const chatsCollectionRef = collection(messageDocRef, "chats");

    const queryString: any = query(
      chatsCollectionRef,
      orderBy("timeStamp", "desc"),
      limit(1)
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
          src={item?.providerImgUrl}
          className="h-[50px] w-[50px] object-cover rounded-full"
        />
        <div className="flex flex-col items-start">
          <span className="font-bold">{item?.providerName}</span>
          <span className="text-xs">
            {chats[0]?.message || "start a converstation"}
          </span>
        </div>
      </button>
    </>
  );
};

export default ChatLitsItem;
