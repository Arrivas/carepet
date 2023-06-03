import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const WithAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const hocComponent: React.FC<P> = (props) => {
    const [user] = useAuthState(auth);
    const router = useRouter();
    useEffect(() => {
      if (typeof window !== "undefined") {
        if (!user?.email) {
          // Redirect to login page if the user is not authenticated
          router.replace("/login");
          return;
        }
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  return hocComponent;
};

export default WithAuth;
