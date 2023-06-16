import AppFormField from "../forms/AppFormField";
import FormikField from "../forms/FormikField";
import SubmitButton from "../forms/SubmitButton";
import Link from "next/link";
import React, { useState } from "react";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { firestore, auth } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
} from "firebase/auth";
import * as Yup from "yup";
import SelectForm from "../forms/SelectForm";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../store/loadingSlice";
import { RootState } from "../../store";
import { useRouter } from "next/navigation";

const userTypeItems = [
  { id: 1, label: "Client" },
  { id: 2, label: "Pet-Care Provider" },
];
import { welcomeMail } from "../../config/welcomeString";

const CreateAccount = () => {
  const loading = useSelector((state: RootState) => state?.loading.loading);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState(userTypeItems[0]);
  const dispatch = useDispatch();
  const router = useRouter();

  const passwordSchema = Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password can be maximum 20 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(/^[^\s]+$/, "Password cannot contain spaces")
    .matches(
      /^[^!@#$%^&*()\-_=+{};:,<.>]+$/,
      "Password cannot contain special characters"
    )
    .required();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: passwordSchema,
    age: Yup.number()
      .min(18, "age must be above 18")
      .typeError("age must be a number")
      .required(),
  });

  const initialValues = {
    name: "",
    email: "",
    password: "",
    age: "",
  };
  const handleSubmit = async (values: any, { setErrors, resetForm }: any) => {
    const newUser: any = {
      name: values.name.trim(),
      email: values.email.trim(),
      password: values.password.trim(),
      age: values.age,
      userType: selectedUserType.label,
      imgUrl:
        "https://firebasestorage.googleapis.com/v0/b/carepet-16aea.appspot.com/o/user.webp?alt=media&token=6518df48-8968-4e3a-9925-9821c96b524f",
      bookedDocIds: ["test"],
    };

    const collectionRef = collection(firestore, "mail");
    const newDocument = {
      to: [`${newUser.email}`],
      message: {
        subject: "Welcome",
        text: "",
        html: welcomeMail,
      },
    };
    dispatch(setLoading(true));
    try {
      fetchSignInMethodsForEmail(auth, newUser.email).then((doc) => {
        if (doc?.length !== 0) {
          dispatch(setLoading(false));
          return setErrors({
            email: "email is already taken",
          });
        }
      });

      createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
        .then(async (userCredential) => {
          // Signed in
          const docRef = await addDoc(
            collection(
              firestore,
              selectedUserType.label === "Client" ? "client" : "petCareProvider"
            ),
            newUser
          );
          const documentRef = doc(
            firestore,
            selectedUserType.label === "Client" ? "client" : "petCareProvider",
            docRef.id
          );
          await updateDoc(documentRef, { docId: docRef.id });
          resetForm({ values: newUser });
          await addDoc(collectionRef, newDocument);
          router.replace("/dashboard");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } catch (error) {
      console.error("Error creating document:", error);
    }
    dispatch(setLoading(false));
  };
  return (
    <>
      <title>Create Account</title>
      <div className="bg-[#68a98b] min-h-screen w-full flex items-center justify-center font-Montserrat">
        <div className="bg-white flex min-w-[350px] md:min-w-[48rem] shadow-lg md:min-h-[400px] rounded-md overflow-hidden flex-col md:flex-row">
          <div className="flex-1 relative hidden md:block">
            <img
              className="absolute top-0 left-0 h-full w-full object-cover"
              src="../../hero/playground_assets/kneel.svg"
              alt=""
            />
          </div>
          <div className="flex-1 relative">
            <div className="flex flex-col p-5 justify-center mx-auto">
              <img
                className="h-[50px] w-[250px] object-contain"
                src="../../hero/playground_assets/logo3.png"
                alt=""
              />
              <h2 className="font-black text-[1.2rem]">Sign Up To Carepet</h2>
              <FormikField
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                <div className="flex flex-col gap-1 mt-4 mb-2">
                  <div className="flex flex-col md:flex-row md:gap-1">
                    <div className="flex-2 space-y-1">
                      <p>Full name*</p>
                      <AppFormField name="name" placeholder="Name" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p>Age*</p>
                      <AppFormField name="age" placeholder="Age" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p>Email address*</p>
                    <AppFormField name="email" placeholder="Email" />
                  </div>
                  <p>Password*</p>
                  <AppFormField
                    type="password"
                    name="password"
                    placeholder="Password"
                    showPassword={showPassword}
                    onShowPassword={setShowPassword}
                  />
                  <p>User Type*</p>
                  <SelectForm
                    select={selectedUserType}
                    onSetSelect={setSelectedUserType}
                    selectItems={userTypeItems}
                  />
                </div>

                <SubmitButton
                  customBgColor="bg-[#318b9e] hover:bg-[#277f91]"
                  title="Create Account"
                  disabled={loading}
                />
                <div className="flex justify-center w-full my-5 pb-8">
                  <p className="text-gray-400">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-500 text-[14px]">
                      Log in
                    </Link>
                  </p>
                </div>
              </FormikField>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;
