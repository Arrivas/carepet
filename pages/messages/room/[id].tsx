import React, { FormEvent, useEffect, useState, useRef } from "react";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  addDoc,
  QuerySnapshot,
  DocumentData,
  onSnapshot,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { firestore } from "../../../config/firebase";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { IoSend } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useRouter } from "next/router";
import { HiArrowSmLeft } from "react-icons/hi";

export const getStaticPaths: GetStaticPaths = async () => {
  const querySnapshot = await getDocs(collection(firestore, "messages"));
  const messages: any[] = [];
  querySnapshot.forEach((doc) => messages.push(doc.data()));

  // Map data to an array of path objects with params (id)
  const paths = messages.map((item: any) => {
    return {
      params: { id: item.chatId },
    };
  });

  return {
    paths,
    fallback: false,
    revalidate: 10,
  };
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  return {
    props: {},
  };
};

interface MessagesRoomProps {
  clientImgUrl: string;
  message: string;
  timeStamp: string;
  from: string;
}

const MessagesRoom = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [formValue, setFormValue] = useState("");
  const router = useRouter();
  const { id: chatId } = router.query;
  const [chats, setChats] = useState<MessagesRoomProps[]>();
  const [chatDetails, setChatDetails] = useState<any>({});
  const scrollChat = useRef(null);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (formValue.trim() === "") return;
    const newChat = {
      clientImgUrl: user?.imgUrl,
      message: formValue.trim(),
      timeStamp: new Date().toISOString(),
      from: user?.userType,
    };
    setFormValue("");
    const messagesRef = collection(firestore, "messages");
    // @ts-ignore
    const messageDocRef = doc(messagesRef, chatId);
    // update seen
    if (user.userType === "Client")
      await updateDoc(messageDocRef, {
        clientSeen: true,
        serviceProviderSeen: false,
      });
    else {
      await updateDoc(messageDocRef, {
        clientSeen: false,
        serviceProviderSeen: true,
      });
    }
    const chatsCollectionRef = collection(messageDocRef, "chats");
    await addDoc(chatsCollectionRef, newChat);
    scrollChat.current &&
      // @ts-ignore
      scrollChat?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchChatDetails = async () => {
    const messagesRef = collection(firestore, "messages");

    try {
      // @ts-ignore
      const messageDocRef = doc(messagesRef, chatId);
      const docSnapshot = await getDoc(messageDocRef);

      if (docSnapshot.exists()) {
        const documentData = docSnapshot.data();
        return documentData;
      } else {
        console.log("Document does not exist.");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };

  const setSeen = async (messageDocRef: any) => {
    if (user.userType === "Client")
      await updateDoc(messageDocRef, {
        clientSeen: true,
      });
    else {
      await updateDoc(messageDocRef, {
        serviceProviderSeen: true,
      });
    }
  };

  useEffect(() => {
    const messagesRef = collection(firestore, "messages");
    // @ts-ignore
    const messageDocRef = doc(messagesRef, chatId);

    setSeen(messageDocRef).then((res) => console.log(res));

    const chatsCollectionRef = collection(messageDocRef, "chats");

    const queryString: any = query(
      chatsCollectionRef,
      orderBy("timeStamp", "asc"),
      limit(25)
    );

    fetchChatDetails().then((res) => setChatDetails(res as any));
    const unsubscribe: any = onSnapshot(
      queryString,
      (querySnapshot: QuerySnapshot<DocumentData>) => {
        const chats: any = [];
        querySnapshot.forEach((doc) => {
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
      <title>
        {user?.userType === "Client"
          ? chatDetails?.providerName
          : chatDetails?.clientInfo?.clientName}
      </title>
      <div className="flex flex-col  mx-auto h-screen font-Nunito">
        <div className="flex flex-col p-2 px-4 border-b border-gray-50 shadow-sm">
          <button
            onClick={() => router.back()}
            className="flex text-xs items-center text-[#bebebe]"
          >
            <HiArrowSmLeft size={25} color="#bebebe" />
            go back
          </button>
          <div className="flex items-center gap-2 ">
            <img
              src={
                user?.userType === "Client"
                  ? chatDetails?.providerImgUrl
                  : chatDetails?.clientInfo?.clientImgUrl
              }
              className="h-[40px] w-[40px] rounded-full"
            />
            <h4 className="font-bold">
              {user?.userType === "Client"
                ? chatDetails?.providerName
                : chatDetails?.clientInfo?.clientName}
            </h4>
          </div>
        </div>
        <div className="flex-grow overflow-y-auto p-5">
          <div className="flex flex-col">
            {chats?.length === 0 ? (
              <div className="flex justify-center">
                <span className="text-gray-300 italic">
                  start a conversation
                </span>
              </div>
            ) : (
              chats?.map((item, index: number) => {
                const isFirst = index === 0;
                const isLast = index === chats.length - 1;
                const isClient = user.userType === item.from;

                const customClassName = isClient
                  ? "self-end bg-[#646464] p-2 text-white"
                  : "self-start bg-[#e8e4ec] p-2 text-black";

                return (
                  <p
                    key={item.timeStamp}
                    className={`rounded-full my-[2px] ${
                      isClient ? `pl-4 pr-3 ` : "pl-3 pr-4"
                    }  ${customClassName}`}
                  >
                    {item.message}
                  </p>
                );
              })
            )}
            <div ref={scrollChat}></div>
          </div>
        </div>
        <form onSubmit={handleSendMessage} className="bg-white p-4">
          <div className="flex flex-row items-center gap-2">
            <input
              autoComplete="off"
              autoCorrect="false"
              className="w-full py-3 px-4 bg-gray-100 focus:none ring-0  rounded-full"
              name="formValue"
              value={formValue}
              type="text"
              onChange={(e) => setFormValue(e.target.value)}
              placeholder="Aa"
            />
            <button type="submit">
              <IoSend size={25} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default MessagesRoom;
