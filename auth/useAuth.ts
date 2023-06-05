import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { usePathname, useRouter } from "next/navigation";

export const checkAuth = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  if (loading) return;
  if (typeof window !== "undefined") {
    if (user?.email && !loading) {
      return router.push("/dashboard");
    }
  }
};

export const checkUserAuth = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const path = usePathname();
  if (
    path === "/" ||
    path === "/create-account" ||
    path === "forgot-password" ||
    path === "contact"
  )
    return;
  if (typeof window !== "undefined") {
    if (!user?.email) {
      return router.push("/login");
    }
  }
};
