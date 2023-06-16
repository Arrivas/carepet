import React from "react";
import FormikField from "../components/forms/FormikField";
import AppFormField from "../components/forms/AppFormField";
import Link from "next/link";
import SubmitButton from "../components/forms/SubmitButton";
import * as Yup from "yup";
import {
  fetchSignInMethodsForEmail,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setLoading } from "../store/loadingSlice";
import { toast } from "react-hot-toast";

const forgot = () => {
  const loading = useSelector((state: RootState) => state.loading.loading);
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email().required(),
  });

  const handleSubmit = async (values: any, { setErrors, resetForm }: any) => {
    try {
      dispatch(setLoading(true));
      const signInMethods = await fetchSignInMethodsForEmail(
        auth,
        values.email.trim()
      );

      if (signInMethods.length === 0) {
        dispatch(setLoading(false));
        return setErrors({
          email: "Email is not registered",
        });
      }

      await sendPasswordResetEmail(auth, values.email.trim());

      toast.success("Password reset email sent");
      resetForm();
    } catch (error: any) {
      toast.error("Something went wrong");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <>
      <title>Forgot Password</title>
      <div className="bg-[#68a98b] min-h-screen w-full flex items-center justify-center font-Montserrat">
        <div className="bg-white flex  min-w-[400px] md:min-w-[800px] shadow-lg md:min-h-[400px] rounded-md overflow-hidden flex-col md:flex-row">
          <div className="flex-1 relative hidden md:block">
            <img
              className="absolute -bottom-7 left-0 h-[80%] w-full object-contain"
              src="../../hero/playground_assets/forgot.svg"
              alt=""
            />
          </div>
          <div className="flex-1 relative flex flex-col justify-center ">
            <div className="flex flex-col p-5 justify-center mx-auto w-full">
              <img
                className="h-[50px] w-[250px] object-contain"
                src="../../hero/playground_assets/logo3.png"
                alt=""
              />
              <h2 className="font-black text-[1.2rem]">Forgot Password</h2>
              <FormikField
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                <div className="flex flex-col gap-2 mt-4">
                  <p>Email address*</p>
                  <AppFormField name="email" placeholder="Email" />
                </div>
                <SubmitButton
                  disabled={loading}
                  title="Reset Password"
                  containerClass="py-2 px-4 rounded-md text-white mt-2 bg-[#ffa285] hover:bg-[#f78663]"
                />
              </FormikField>
              <div className="flex justify-center w-full my-5 pb-8">
                <p className="text-gray-400">
                  Remembered your password?{" "}
                  <Link href="/login" className="text-blue-500 text-[14px]">
                    Log in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default forgot;
