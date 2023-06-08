import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setLoading } from "../store/loadingSlice";

const WithAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const hocComponent: React.FC<P> = (props) => {
    // const user = useSelector((state: RootState) => state.user.user);
    const [user, loading] = useAuthState(auth);
    const router = useRouter();

    useEffect(() => {
      if (typeof window !== "undefined") {
        if (!user?.email) {
          // Redirect to login page if the user is not authenticated
          return router.push("/login");
        }
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return hocComponent;
};

export default WithAuth;
