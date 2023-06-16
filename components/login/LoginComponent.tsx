import React, { useState } from "react";
import Link from "next/link";
import { auth } from "../../config/firebase";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import FormikField from "../forms/FormikField";
import AppFormField from "../forms/AppFormField";
import SubmitButton from "../forms/SubmitButton";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../store/loadingSlice";
import { RootState } from "../../store";

const LoginComponent = () => {
  const loading = useSelector((state: RootState) => state.loading.loading);
  const [showPassword, setShowPassword] = useState(false);
  const [user] = useAuthState(auth);
  const router = useRouter();
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };
  const handleSubmit = (values: any, { setErrors }: any) => {
    dispatch(setLoading(true));
    signInWithEmailAndPassword(
      auth,
      values.email.trim(),
      values.password.trim()
    )
      .then((userCredential) => {
        router.push("/dashboard");
        localStorage.setItem("hasUser", "true");
        dispatch(setLoading(false));
      })
      .catch((error) => {
        if (error.code === "auth/user-not-found") {
          setErrors({ email: "email is not registered" });
        } else if (error.code === "auth/wrong-password") {
          setErrors({ password: "invalid email or password" });
        }
        dispatch(setLoading(false));
      });
    dispatch(setLoading(false));
  };

  if (user?.email) return <></>;
  return (
    <>
      <title>Login</title>
      <div className="bg-[#68a98b] h-screen w-full flex items-center justify-center font-Montserrat">
        <div className="bg-white flex min-w-[400px] md:min-w-[800px] shadow-lg  md:min-h-[420px] rounded-md overflow-hidden flex-col md:flex-row ">
          <div className="flex-1 relative">
            <img
              className="absolute top-0 left-0 h-full w-full object-cover"
              src="./hero/playground_assets/animals.svg"
              alt=""
            />
          </div>
          <div className="flex-1 relative">
            <div className=" flex flex-col p-5 justify-center mx-auto">
              <img
                className="h-[100px] w-[250px] object-contain"
                src="./hero/playground_assets/logo3.png"
                alt=""
              />
              <h2 className="font-black text-[1.2rem]">Sign In To Carepet</h2>
              <FormikField
                initialValues={initialValues}
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col gap-3 mt-2 mb-2">
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
                <Link href="/forgot" className="text-blue-500 text-xs self-end">
                  forgot Password?
                </Link>
                <SubmitButton
                  disabled={loading}
                  title="Log In"
                  customBgColor="bg-[#8EAAD9] hover:bg-[#7F99C3]"
                  containerClass="w-[5rem] mt-2"
                />
                <div className="flex justify-center flex-col w-full my-5">
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
        </div>
      </div>
    </>
  );
};

export default LoginComponent;
