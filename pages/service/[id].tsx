import React from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { firestore } from "../../config/firebase";
import { GetStaticProps } from "next";

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
  const { docId, imgLink, providerInfo, service } = petServiceData;
  const { docId: provDocId, email, name } = providerInfo;
  const {
    description,
    longDescription,
    price,
    serviceName,
    serviceProviderName,
  } = service;
  return (
    <>
      <title>{serviceName}</title>
      <div className="p-5">
        <div>{serviceName}</div>
      </div>
    </>
  );
};

export default PetServiceDetails;
