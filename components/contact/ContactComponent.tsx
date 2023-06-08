import AppFormField from "../forms/AppFormField";
import FormikField from "../forms/FormikField";
import SubmitButton from "../forms/SubmitButton";
import React from "react";
import { CiLocationOn } from "react-icons/ci";
import { AiOutlinePhone } from "react-icons/ai";
import { HiOutlineMail } from "react-icons/hi";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { firestore } from "../../config/firebase";
import { toast } from "react-hot-toast";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setLoading } from "../../store/loadingSlice";

const ContactComponent = () => {
  const loading = useSelector((state: RootState) => state.loading.loading);
  const dispatch = useDispatch();
  const initialValues = {
    name: "",
    email: "",
    message: "",
  };

  const validationSchema = Yup.object({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    message: Yup.string().required(),
  });

  const handleSubmit = async (values: any, { resetForm }: any) => {
    const newData = {
      name: values.name,
      email: values.email,
      message: values.message,
    };
    dispatch(setLoading(true));
    try {
      const docRef = await addDoc(collection(firestore, "inquiries"), newData);
      const documentRef = doc(firestore, "inquiries", docRef.id);
      await updateDoc(documentRef, { docId: docRef.id });
      toast.success("successfully submitted");
      resetForm({ values: initialValues });
    } catch (error) {
      console.error("Error creating document:", error);
    }
    dispatch(setLoading(false));
  };
  return (
    <>
      <title>Contact Us</title>
      <div className="flex flex-col h-screen items-center justify-center overflow-hidden p-5 font-Nunito">
        <h1 className="text-3xl tracking-wide my-2">CONTACT US</h1>
        <p className="text-gray-500 italic">
          If You Want To Know Anything From Us ? Please Drop A Note Here !
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 my-5">
          <div className="mb-4 md:mb-0">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row items-start gap-2 mb-2">
                <div className="flex items-center justify-center border border-gray-200 rounded-md p-1">
                  <CiLocationOn size={25} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Visit Us</h3>
                  <p className="text-gray-400">
                    Come say hello at our office HQ.
                  </p>
                  <p className="font-semibold">
                    Lingayen, Pangasinan, Philippines
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <div className="flex flex-row items-start gap-2 mb-2">
                <div className="flex items-center justify-center border border-gray-200 rounded-md p-1">
                  <AiOutlinePhone size={25} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Call Us</h3>
                  <p className="text-gray-400">Mon-Sat from 8 am to 5 pm</p>
                  <p className="font-semibold">+6398...</p>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <div className="flex flex-row items-start gap-2 mb-2">
                <div className="flex items-center justify-center border border-gray-200 rounded-md p-1">
                  <HiOutlineMail size={25} />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Email Us</h3>
                  <p className="text-gray-400">
                    Our friendly team is here to help
                  </p>
                  <p className="font-semibold">sampleemail@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <FormikField
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              <div className="flex flex-row gap-2">
                <AppFormField name="name" placeholder="Name" />
                <AppFormField
                  name="email"
                  placeholder="sampleemail@email.com"
                />
              </div>
              <div className="mt-2">
                <AppFormField
                  name="message"
                  placeholder="Message"
                  textarea={true}
                />
              </div>
              <SubmitButton title="submit" disabled={loading} />
            </FormikField>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactComponent;
