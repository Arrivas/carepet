import React, { useState } from "react";
import Link from "next/link";
import { firestore, auth } from "../../config/firebase";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { signInWithEmailAndPassword } from "firebase/auth";
import FormikField from "../forms/FormikField";
import AppFormField from "../forms/AppFormField";
import SubmitButton from "../forms/SubmitButton";

const LoginComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const initialValues = {
    email: "",
    password: "",
  };
  const dispatch = useDispatch();

  const handleSubmit = (values: any, { setErrors }: any) => {
    signInWithEmailAndPassword(
      auth,
      values.email.trim(),
      values.password.trim()
    )
      .then((userCredential) => {
        router.replace("/dashboard");
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          setErrors({ email: "email is not registered" });
        } else if (error.code === "auth/wrong-password") {
          setErrors({ password: "invalid email or password" });
        }
      });
  };
  return (
    <>
      <title>Login</title>
      <div className="flex items-center justify-center">
        <div className="pt-10 h-[550px] xs:h-screen w-[455px] xs:w-[375px] font-roboto relative px-2 xs:px-5">
          <img
            className="mt-6 h-[1.8rem] object-cover object-center my-10"
            src="/logo-black.png"
            alt="logo"
          />
          <h1 className="text-3xl font-semibold">Log in to your Account</h1>
          <p className="text-gray-300">
            Welcome back! Select method to log in:
          </p>
          {/* form */}
          <FormikField initialValues={initialValues} onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3 mt-4 mb-2">
              <AppFormField name="email" placeholder="Email" />
              <AppFormField
                type="password"
                name="password"
                placeholder="Password"
                showPassword={showPassword}
                onShowPassword={setShowPassword}
              />
            </div>
            {/* forgot password */}
            <div className="flex justify-end w-full">
              <Link href="/forgot" className="text-blue-500 text-[14px]">
                Forgot Password?
              </Link>
            </div>
            <SubmitButton title="Log In" />
            <div className="flex justify-center w-full my-5">
              <p className="text-gray-400">
                Don't have an account?{" "}
                <Link
                  href="/create/account"
                  className="text-blue-500 text-[14px]"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </FormikField>
        </div>
      </div>
    </>
  );
};

export default LoginComponent;
