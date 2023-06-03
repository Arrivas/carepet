import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import FormikField from "../components/forms/FormikField";
import AppFormField from "../components/forms/AppFormField";
import SubmitButton from "../components/forms/SubmitButton";
import { updateDoc, doc, getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-hot-toast";
import { setUser } from "../store/userSlice";
import { setLoading } from "../store/loadingSlice";
import ProfileTab from "../components/account/ProfileTab";
import BillingTab from "../components/account/BillingTab";

const sideAccountTabItems = [
  { id: 1, title: "My Profile" },
  { id: 2, title: "Billing" },
];

export interface ImageState {
  file: Blob | ArrayBuffer | Uint8Array;
  fileName: string;
  imageData: string | null;
}

const profile = () => {
  const fileInputRef = useRef<any>(null);
  const user = useSelector((state: RootState) => state.user.user);
  const loading = useSelector((state: RootState) => state.loading.loading);
  const [activeTab, setActiveTab] = useState("My Profile");
  const [image, setImage] = useState<ImageState>();
  const dispatch = useDispatch();

  const initialValues = {
    name: user?.name || "",
    age: user?.age || "",
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

  const handleSubmit = async (values: any) => {
    const currentUser = {
      ...user,
      name: values.name,
      age: values.age,
    };
    dispatch(setLoading(true));
    try {
      if (image?.imageData !== undefined) {
        const storage = getStorage();
        const storageRef = ref(storage, `userImages/${image?.fileName}`);
        await uploadBytes(storageRef, image.file);

        const downloadURL = await getDownloadURL(storageRef);
        currentUser.imgUrl = downloadURL;
      }
      const getCollection =
        user.userType === "Client" ? "client" : "petCareProvider";
      const db = getFirestore();
      const userRef = doc(db, getCollection, user.docId);
      await updateDoc(userRef, currentUser);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      toast.success("Profile updated successfully!");
      dispatch(setUser(currentUser));
    } catch (error) {
      console.error("Error updating user:", error);
    }
    dispatch(setLoading(false));
  };

  return (
    <>
      <title>Profile</title>
      <div className="h-screen bg-gray-100 p-4">
        <h4 className="my-3 font-semibold text-lg">Account Settings</h4>
        <div className="bg-white rounded-md h-[90%] overflow-hidden flex flex:col md:flex-row relative">
          <div className="flex flex-col items-start w-full max-w-[227px] p-5 gap-3 border-r border-gray-100">
            {sideAccountTabItems.map((item) => (
              <button
                onClick={() => setActiveTab(item.title)}
                className={`mr-14 ${
                  activeTab === item.title ? "bg-green-50 text-green-550" : ""
                } p-2 px-4 rounded-full tracking-wider font-semibold`}
                key={item.id}
              >
                {item.title}
              </button>
            ))}
          </div>
          <div className="flex-grow overflow-hidden p-5">
            {activeTab === "My Profile" ? (
              <ProfileTab
                fileInputRef={fileInputRef}
                handleFileChange={handleFileChange}
                handleSubmit={handleSubmit}
                image={image}
                initialValues={initialValues}
                loading={loading}
                user={user}
              />
            ) : (
              <BillingTab />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default profile;