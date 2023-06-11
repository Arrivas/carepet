import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { auth } from "../config/firebase";
import { setUser } from "../store/userSlice";
import { useRouter } from "next/navigation";
import { useSendEmailVerification } from "react-firebase-hooks/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const VerifyEmail = () => {
  const [user] = useAuthState(auth);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isSecondTime, setIsSecondTime] = useState(false);
  const [displayMessage, setDisplayMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [sendEmailVerification, sending, error] =
    useSendEmailVerification(auth);

  const onSendEmailVerification = async () => {
    setTimeLeft(20);
    setIsSecondTime(true);
    setLoading(true);
    try {
      const success = await sendEmailVerification();
      if (success) {
        toast.success("email sent");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (timeLeft === 0) {
      setTimeLeft(null);
    }
    // exit early when we reach 0
    if (!timeLeft) return;
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [timeLeft]);

  return (
    <>
      <div className="flex items-center justify-center font-Nunito">
        <div className="pt-1 h-[550px] xs:h-screen w-[455px] xs:w-[375px] font-roboto relative px-2 xs:px-5">
          <center>
            <img
              className="h-[8rem] self-center object-cover object-center my-10"
              src="/email.png"
              alt="email"
            />
            <div>
              <p>verify your email first before proceeding</p>
              <p className="font-bold">{user?.email}</p>
            </div>

            <div>
              {timeLeft === null ? (
                <div className="w-[80%]">
                  <button
                    type="button"
                    className="w-full py-2 font-bold mt-3 text-white bg-green-550 rounded hover:bg-green-600"
                    style={{
                      backgroundColor: "primary",
                    }}
                    onClick={() => {
                      onSendEmailVerification();
                      // setIsEmailVerified(true);
                    }}
                  >
                    {isSecondTime ? "re-send" : "send"} verification
                  </button>
                </div>
              ) : (
                <div>
                  <p className="self-center font-semibold text-center my-4">
                    please wait before re-sending again
                  </p>
                  <p className="self-center font-light">{timeLeft}</p>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                auth.signOut();
                dispatch(setUser({}));
                router.prefetch("/login");
              }}
              className="mt-10"
            >
              back to log in
            </button>
          </center>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
