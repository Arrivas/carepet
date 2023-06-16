import React, { PureComponent, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  collection,
  onSnapshot,
  doc,
  where,
  query,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";
import { firestore } from "../../config/firebase";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const ongoingStatusArray = [
  "pendingPayment",
  "ongoing",
  "paymentSubmitted",
  "paymentRejected",
];

const Charts = () => {
  const [chartDetails, setChartDetails] = useState({
    booked: 0,
    ongoing: 0,
    cancelled: 0,
  });
  const user = useSelector((state: RootState) => state.user.user);

  const fetchBookings = () => {
    const bookingsCollectionRef = collection(firestore, "petCareProvider");
    const bookingsDocRef = doc(bookingsCollectionRef, user.docId);
    const chatsCollectionRef = query(collection(bookingsDocRef, "bookings"));
    const unsubscribe = onSnapshot(
      chatsCollectionRef,
      (querySnapshot: QuerySnapshot<DocumentData>) => {
        querySnapshot.forEach((bookingsDoc) => {
          if (bookingsDoc?.data()?.status === "completed")
            setChartDetails((prevState) => ({
              ...prevState,
              booked: prevState.booked + 1,
            }));
          else if (ongoingStatusArray.includes(bookingsDoc?.data()?.status)) {
            setChartDetails((prevState) => ({
              ...prevState,
              ongoing: prevState.ongoing + 1,
            }));
          } else {
            setChartDetails((prevState) => ({
              ...prevState,
              cancelled: prevState.cancelled + 1,
            }));
          }
        });
      }
    );

    return () => unsubscribe();
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchBookings();
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const data = [
    {
      name: "Clients",
      "ongoing services": chartDetails.ongoing,
      "booked services": chartDetails.booked,
      "cancelled services": chartDetails.cancelled,
    },
  ];

  return (
    <>
      <div className="h-screen flex items-center justify-center flex-col font-Nunito">
        <h1 className="text-2xl font-bol">Report Generation</h1>
        <ResponsiveContainer
          width="80%"
          height="80%"
          className="mx-auto w-full"
        >
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="booked services" fill="#3b9679" />
            <Bar dataKey="ongoing services" fill="#75bccb" />
            <Bar dataKey="cancelled services" fill="#ffa285" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default Charts;
