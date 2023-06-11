import React from "react";
import { useRouter } from "next/router";
import Lottie from "lottie-react";
import loadingAnimation from "../loadingLottie.json";

const LOADER_THRESHOLD = 250;

export default function NavigationLoader(props: any) {
  const [isLoading, setLoading] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    let timer: any = null;

    const start = () => {
      if (!timer) {
        timer = setTimeout(() => setLoading(true), LOADER_THRESHOLD);
      }
    };

    const end = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      setLoading(false);
    };

    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeComplete", end);
    router.events.on("routeChangeError", end);

    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);

      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };
  }, [router.events]);

  if (!isLoading) return null;

  return (
    <div className="z-[99999] flex h-[100vh] bg-white/90 w-full mx-auto inset-0 absolute items-center justify-center">
      <Lottie animationData={loadingAnimation} loop={true} autoplay={true} />
    </div>
  );
}
