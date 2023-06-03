import "../styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "../store";
import { setUser } from "../store/userSlice";
import { collection, getDocs, where, query } from "firebase/firestore";
import { firestore } from "../config/firebase";
import { useEffect, useState } from "react";
import Providers from "../components/Providers";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import SideNav from "../components/SideNav";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";
import "react-credit-cards-2/dist/es/styles-compiled.css";

export interface Client {
  age: string;
  bookings: {
    history: any[];
    ongoing: any;
  };
  docId: string;
  email: string;
  id?: string;
  imgUrl: string;
  name: string;
  password: string;
  userType: string;
  creditCards: any[];
}

export interface PetCareProvider {
  age: string;
  bookings: {
    history: any[];
    ongoing: any;
  };
  docId: string;
  email: string;
  id?: string;
  imgUrl: string;
  name: string;
  password: string;
  userType: string;
}

export interface CreditCard {
  number: string;
  expiry: string;
  cvc: string;
  name: string;
  focus: any;
  id: any;
}

const fetchUserData = async (email: string | null | undefined) => {
  try {
    const clientQuery = query(
      collection(firestore, "client"),
      where("email", "==", email)
    );

    const petCareProviderQuery = query(
      collection(firestore, "petCareProvider"),
      where("email", "==", email)
    );

    const [clientSnapshot, petCareProviderSnapshot] = await Promise.all([
      getDocs(clientQuery),
      getDocs(petCareProviderQuery),
    ]);

    let currentUser: any = [];

    clientSnapshot.forEach((doc) => {
      currentUser.push({ id: doc.id, ...doc.data() });
    });

    if (currentUser.length === 0) {
      petCareProviderSnapshot.forEach((doc) => {
        currentUser.push({ id: doc.id, ...doc.data() });
      });
    }
    return currentUser[0];
  } catch (error) {
    console.error("Error fetching documents:", error);
  }
};

function MyApp({ Component, pageProps }: AppProps) {
  const [user] = useAuthState(auth);
  const [openNav, setOpenNav] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    if (user?.email)
      fetchUserData(user?.email).then((res) => store.dispatch(setUser(res)));
  }, [user]);

  return (
    <Providers>
      <Toaster />
      <SideNav openNav={openNav} setOpenNav={setOpenNav} />
      <div
        className={` ${
          pathName === "/" ||
          pathName === "/login" ||
          pathName === "/create/account"
            ? ""
            : openNav
            ? ""
            : "ml-64"
        }`}
      >
        <Component {...pageProps} />
      </div>
    </Providers>
  );
}

export default MyApp;
