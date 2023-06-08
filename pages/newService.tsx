import AppFormField from "../components/forms/AppFormField";
import FormikField from "../components/forms/FormikField";
import SubmitButton from "../components/forms/SubmitButton";
import React, { useState, useRef } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  getFirestore,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setLoading } from "../store/loadingSlice";
import { addPetService } from "../store/petServicesSlice";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";

const newService = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading] = useAuthState(auth);
  const isLoading = useSelector((state: RootState) => state.loading.loading);
  const [image, setImage] = useState<any>({
    file: null,
    fileName: "",
    imageData: null,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const user = useSelector((state: RootState) => state.user.user);

  const initialValues = {
    serviceProviderName: "",
    serviceName: "",
    description: "",
    longDescription: "",
    price: "",
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileName = file.name;
      const reader = new FileReader();

      reader.onload = (event) => {
        const imageData = event.target?.result as string;
        setImage({ file, fileName, imageData });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values: any, { resetForm }: any) => {
    const newService = {
      service: {
        serviceProviderName: values.serviceProviderName,
        serviceName: values.serviceName,
        description: values.description,
        longDescription: values.longDescription,
        price: values.price,
      },
      providerInfo: {
        providerName: user.name,
        providerEmail: user.email,
        providerDocId: user.docId,
        providerPhone: user.phone,
        providerImgUrl: user.imgUrl,
      },
      imgLink: "",
      docId: "",
      scheduling: [],
    };
    if (user?.phone === undefined || user?.phone === "") {
      toast.error("add your phone number first");
      return router.push("/account");
    }
    dispatch(setLoading(true));
    try {
      const storage = getStorage();
      const storageRef = ref(storage, "images/" + image.fileName);
      await uploadString(storageRef, image.imageData, "data_url");

      const downloadURL = await getDownloadURL(storageRef);

      const db = getFirestore();
      const collectionRef = collection(db, "petServices");
      const docRef = await addDoc(collectionRef, newService);

      await updateDoc(doc(db, "petServices", docRef.id), {
        imgLink: downloadURL,
        docId: docRef.id,
      });
      newService.imgLink = downloadURL;
      newService.docId = docRef.id;
      setImage({});
      resetForm({ values: initialValues });
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      dispatch(addPetService(newService));
      toast.success("New service uploaded successfully!");
    } catch (error) {
      toast.error("Error uploading service");
    }
    dispatch(setLoading(false));
  };

  if (user?.userType === "Client") router.replace("./dashboard");
  return (
    <>
      {user?.userType === "Client" ? (
        <></>
      ) : (
        <>
          <title>Post Services</title>
          <div className="flex items-center justify-center font-Nunito">
            <div className="pt-10 h-[550px] xs:h-screen w-[455px] xs:w-[375px] font-roboto relative px-2 xs:px-5">
              <h1 className="text-3xl font-semibold mb-5">
                Upload New Service To Carepet
              </h1>
              {user?.phone === undefined || user?.phone === "" ? (
                <button
                  onClick={() => router.push("/account")}
                  className="bg-yellow-100 w-full p-2 text-left my-2"
                  type="button"
                >
                  <span className="text-yellow-400">
                    add your spanhone# first before create new service. <br />
                    <span className="font-semibold">click here</span>
                  </span>
                </button>
              ) : null}
              <FormikField
                initialValues={initialValues}
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col space-y-2">
                  <AppFormField
                    placeholder="Service Provider Name"
                    name="serviceProviderName"
                    label="Service Provider Name"
                  />
                  <AppFormField
                    placeholder="Service Name"
                    name="serviceName"
                    label="Service Name"
                  />
                  <AppFormField
                    placeholder="Description"
                    name="description"
                    label="Description"
                  />
                  <AppFormField
                    textarea={true}
                    placeholder="Long Description"
                    name="longDescription"
                    label="Long Description"
                  />
                  <AppFormField
                    placeholder="Price"
                    name="price"
                    label="Price"
                  />
                  <input
                    ref={fileInputRef}
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mt-1"
                  />
                  <p
                    className="mt-1 text-sm text-gray-600 "
                    id="file_input_help"
                  >
                    PNG, JPG.
                  </p>
                </div>
                <div className="pb-5">
                  <SubmitButton title="Upload" disabled={isLoading} />
                </div>
              </FormikField>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default newService;
