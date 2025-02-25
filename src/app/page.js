"use client";
import { useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import { useEffect } from "react";
import { useRouter } from "nextjs-toploader/app";

function Page() {
  const isLoggedIn = useIsLoggedIn();
  const router = useRouter();
  useEffect(() => {
    router.push(isLoggedIn ? "/dashboard" : "/login");
  }, []);
  return null;
}

export default Page;
