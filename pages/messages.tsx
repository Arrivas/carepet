import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  collection,
  query,
  onSnapshot,
  getDocs,
  doc,
  updateDoc,
  getFirestore,
  where,
  QuerySnapshot,
  DocumentData,
  orderBy,
  limit,
} from "firebase/firestore";
import { firestore } from "../config/firebase";
import { setBookings } from "../store/bookingsSlice";
import ChatLitsItem from "../components/chat/ChatLitsItem";
import { setLoading } from "../store/loadingSlice";
import Loading from "../components/Loading";

const fetchMessages = async (refIds: string[]) => {
  if (!refIds || refIds.length === 0) {
    return [];
  }

  const messagesCollectionRef = collection(firestore, "messages");
  const messagesQuerySnapshot = await getDocs(messagesCollectionRef);
  const messages: any[] = [];

  messagesQuerySnapshot.forEach((messageDoc) => {
    if (refIds.includes(messageDoc.id)) {
      messages.push({ ...messageDoc.data(), messagesDocId: messageDoc.id });
    }
  });

  return messages;
};

const messages = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const loading = useSelector((state: RootState) => state.loading.loading);
  const [messages, setMessages] = useState<any>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    let isMounted = true;
    dispatch(setLoading(true));
    if (isMounted) {
      fetchMessages(user?.bookedDocIds).then((res) => setMessages(res));
      dispatch(setLoading(false));
    }

    return () => {
      isMounted = false;
    };
  }, [user?.bookedDocIds]);

  return (
    <>
      <div className="font-Nunito p-5">
        <h1 className="font-bold text-[2rem] text-gray-600">Messages</h1>
        <div className="flex flex-col gap-2 my-5 max-h-[85vh] overflow-y-auto">
          {messages?.length && !loading ? (
            messages?.map((item: any, index: number) => (
              <ChatLitsItem index={index} item={item} key={index} />
            ))
          ) : loading ? (
            <Loading />
          ) : (
            <>
              <div className="h-[70vh] flex items-center justify-center">
                <span className="text-gray-300 italic">
                  no messages available yet
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default messages;
