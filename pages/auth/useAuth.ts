import { useEffect } from "react";
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { usePathname, useRouter } from "next/navigation";

export const loginIsRequiredClient = () => {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  if (typeof window !== "undefined") {
    if (user?.email) {
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
