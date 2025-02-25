"use client";
import React, { useEffect } from "react";

import {
  DynamicEmbeddedWidget,
  useIsLoggedIn,
} from "@dynamic-labs/sdk-react-core";
import { useRouter } from "nextjs-toploader/app";
const LoginPage = () => {
  const isLoggedIn = useIsLoggedIn();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [isLoggedIn]);
  
  return (
    <>
      <div className=" md:my-[6%] my-[25%] w-full md:w-[30%] m-auto shadow-hover rounded-lg">
        {!isLoggedIn ? (
          <DynamicEmbeddedWidget className="w-[30%] h-[500px]" />
        ) : (
          <div>Logging In....</div>
        )}
      </div>
    </>
  );
};

export default LoginPage;
