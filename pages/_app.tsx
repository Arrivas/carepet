import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RootState, store } from "../store";
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
import "react-datepicker/dist/react-datepicker.css";
import "../styles/main.custom.css";
import "../styles/main.homeStyle.css";
import React from "react";
import VerifyEmail from "../components/VerifyEmail";
import NavigationLoader from "../components/NavigationLoader";
import "rc-rate/assets/index.css";

export interface Client {
  age: string;
  docId: string;
  email: string;
  id?: string;
  imgUrl: string;
  name: string;
  password: string;
  userType: string;
  phone: string;
  bookedDocIds: [];
}

export interface ClientSliceState {
  user: Client;
}

export interface PetCareProvider {
  age: string;
  docId: string;
  email: string;
  id?: string;
  imgUrl: string;
  name: string;
  password: string;
  userType: string;
  phone: string;
  bookedDocIds: [];
}

export interface PetService {
  docId: string;
  imgLink: string;
  providerInfo: {
    providerDocId: string;
    providerEmail: string;
    providerName: string;
  };
  service: {
    description: string;
    longDescription: string;
    price: string;
    serviceName: string;
    serviceProviderName: string;
  };
}

export interface PetServiceInitialState {
  value: PetService[];
}

export interface Scheduling {
  day: string;
  time: string;
  clientBookingId: string;
  serviceBookingId: string;
}

export interface Bookings {
  clientDetails: {
    clientName: string;
    clientEmail: string;
    clientImgUrl: string;
    clientDocId: string;
    clientBookingId: string;
    clientPhoneNumber: string;
  };
  providerInfo: {
    providerName: string;
    providerEmail: string;
    providerPhone: string;
    providerDocId: string;
    providerImgUrl: string;
  };

  bookingDetails: {
    description: string;
    longDescription: string;
    price: string;
    serviceName: string;
    serviceProviderName: string;
    imgUrl: string;
    serviceDocId: string;
    docId: string;
  };
  scheduling: Scheduling;
  docId: string;
  status: string;
  cancellationDateTime?: any;
  paymentImgUrl?: string;
  dateTimeCompletion?: any;
  isRated?: boolean;
}

export interface BookingsSliceState {
  bookings: Bookings[];
}
export interface ClientBookingsSliceState {
  clientBookings: Bookings[];
}

export interface SuccessPageProps {
  clientDetails: {
    clientName: string;
    clientEmail: string;
    clientImgUrl: string;
    clientDocId: string;
    clientBookingId: string;
    clientPhoneNumber: string;
  };
  providerInfo: {
    providerName: string;
    providerEmail: string;
    providerPhone: string;
    providerDocId: string;
    providerImgUrl: string;
  };

  bookingDetails: {
    description: string;
    longDescription: string;
    price: string;
    serviceName: string;
    serviceProviderName: string;
    imgUrl: string;
    serviceDocId: string;
    docId: string;
  };
  scheduling: Scheduling;
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
  const [user, loading, error] = useAuthState(auth);
  const [refreshing, setRefreshing] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState<any>(null);
  const pathName = usePathname();

  useEffect(() => {
    if (user && user.emailVerified) {
      if (!loading) {
        user?.email &&
          fetchUserData(user?.email).then((res) =>
            store.dispatch(setUser(res))
          );
      }
    }
  }, [user, user?.emailVerified]);

  useEffect(() => {
    let interval: any;
    if (!user?.emailVerified && user?.email) {
      interval = setInterval(() => {
        console.log("asd");
        if (user?.email && !refreshing) {
          if (user?.emailVerified === true) {
            user.reload();
            setRefreshing(false);
          }
          setRefreshing(true);
          user.reload().then(() => {
            setRefreshing(false);
          });
        }
      }, 2000);
      setRefreshInterval(interval);
    } else {
      clearInterval(refreshInterval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [user?.emailVerified, user]);
  return (
    <>
      <Toaster />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      <meta httpEquiv="Permissions-Policy" content="interest-cohort=()"></meta>

      <React.Fragment>
        <Providers>
          <SideNav openNav={openNav} setOpenNav={setOpenNav} />
          {/* <TopNav /> */}
          {!user?.emailVerified && user?.email ? (
            <VerifyEmail />
          ) : (
            <div
              className={` ${
                (pathName === "/contact" && !user?.email) ||
                pathName === "/" ||
                pathName === "/gallery" ||
                pathName === "/about" ||
                pathName === "/login" ||
                pathName === "/create/account"
                  ? ""
                  : openNav
                  ? ""
                  : "ml-0 md:ml-64"
              }`}
            >
              <NavigationLoader />
              <Component {...pageProps} />
            </div>
          )}
        </Providers>
      </React.Fragment>
    </>
  );
}

export default MyApp;
