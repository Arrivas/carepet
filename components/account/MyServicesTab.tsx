import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
  getDocs,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadString,
} from "firebase/storage";
import { setPetServices } from "../../store/petServicesSlice";
import { firestore } from "../../config/firebase";
import { PetService } from "../../pages/_app";
import FormikField from "../forms/FormikField";
import AppFormField from "../forms/AppFormField";
import SubmitButton from "../forms/SubmitButton";
import { setLoading } from "../../store/loadingSlice";
import { toast } from "react-hot-toast";

const uploadImage = async (imageData: any, fileName: string) => {
  const storage = getStorage();
  try {
    const storageRef = ref(storage, `images/${fileName}`);
    await uploadString(storageRef, imageData, "data_url");

    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

const MyServicesTab = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const loading = useSelector((state: RootState) => state.loading.loading);
  const petServices = useSelector(
    (state: RootState) => state.petServices.value
  );
  const [selectedService, setSelectedService] = useState<
    PetService | undefined
  >(undefined);
  const [image, setImage] = useState<any>({
    file: null,
    fileName: "",
    imageData: null,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const fetchServices = async () => {
    try {
      const q = query(
        collection(firestore, "petServices"),
        where("providerInfo.providerDocId", "==", user?.docId)
      );

      const querySnapshot = await getDocs(q);
      const results: any = [];
      querySnapshot.forEach((doc) => {
        results.push(doc.data());
      });

      return results;
    } catch (error) {
      console.error("Error fetching pet services:", error);
    }
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchServices().then((res) => dispatch(setPetServices(res)));
    }
    return () => {
      isMounted = false;
    };
  }, []);

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

  const initialValues = {
    serviceProviderName: selectedService?.service.serviceProviderName || "",
    serviceName: selectedService?.service.serviceName || "",
    description: selectedService?.service.description || "",
    longDescription: selectedService?.service.longDescription || "",
    price: selectedService?.service.price || "",
  };

  const handleSubmit = async (values: any) => {
    const editService = {
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
      },
      imgLink: selectedService?.imgLink,
      docId: selectedService?.docId,
    };
    dispatch(setLoading(true));
    if (image.imageData) {
      try {
        const downloadURL = await uploadImage(image.imageData, image.fileName);
        editService.imgLink = downloadURL;
      } catch (error) {
        console.error("Error uploading image:", error);
        return;
      }
    }

    const petServiceDocRef = doc(
      firestore,
      "petServices",
      // @ts-ignore
      selectedService.docId
    );

    try {
      await updateDoc(petServiceDocRef, editService);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      toast.success("Pet service updated successfully!");
    } catch (error) {
      console.error("Error updating pet service:", error);
    }
    const petServicesCopy = [...petServices];
    const index = petServicesCopy.findIndex(
      (service) => service.docId === editService.docId
    );

    if (index !== -1) {
      petServicesCopy[index] = editService as PetService;
      dispatch(setPetServices(petServicesCopy));
    }
    dispatch(setLoading(false));
  };

  return (
    <>
      <div className="flex">
        <div className="flex-1">
          <ul>
            {petServices?.map((item) => (
              <li
                onClick={() => setSelectedService(item)}
                className={`py-2 px-2 hover:text-white hover:bg-green-550 cursor-pointer ${
                  item.docId === selectedService?.docId
                    ? "bg-green-550 text-white"
                    : ""
                }`}
                key={item.docId}
              >
                {item.service.serviceName}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-[3]">
          {selectedService !== undefined && (
            <div className="flex items-center justify-end overflow-y-auto ">
              <div className="overflow-y-auto  no-scrollbar xs:h-screen w-[90%] font-roboto relative px-2 xs:px-5">
                <FormikField
                  initialValues={initialValues}
                  onSubmit={handleSubmit}
                >
                  <div className="flex flex-col space-y-2 h-[80vh]">
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
                    <div className="flex flex-row items-center gap-5">
                      <img
                        src={image?.imageData || selectedService.imgLink}
                        className="h-[150px] w-[180px] rounded-md"
                      />
                      <input
                        ref={fileInputRef}
                        type="file"
                        id="fileInput"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="mt-1"
                      />
                    </div>
                    <p
                      className="mt-1 text-sm text-gray-600 "
                      id="file_input_help"
                    >
                      PNG, JPG.
                    </p>
                    <div className="pb-24">
                      <SubmitButton title="Save" disabled={loading} />
                    </div>
                  </div>
                </FormikField>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyServicesTab;
