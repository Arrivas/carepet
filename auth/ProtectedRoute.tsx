import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import Loading from "../components/Loading";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";

const ProtectedRoute = ({ children }: any) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setLoading(false);
        if (!user) {
          router.push("/login");
          dispatch(setUser(null));
        }
      });

      return () => {
        unsubscribe();
      };
    }, 700); // Add a slight delay of 500 milliseconds before rendering the protected content

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (loading) {
    // Render a loading state or spinner while authentication status is being checked
    return <Loading />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
