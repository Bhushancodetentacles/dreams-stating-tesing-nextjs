import React, { useState, useEffect, useCallback } from "react";
import SumsubWebSdk from "@sumsub/websdk-react";
import { useApi } from "../hooks/useApi";

const SumsubVerification = () => {
  const [accessToken, setAccessToken] = useState("");
  const { get } = useApi();
  // Fetch new access token
  const fetchAccessToken = async () => {
    try {
      const result = await get("create-access-token");
      setAccessToken(result.accessToken);
    } catch (error) {
      console.error(
        "Error fetching access token:",
        error.response?.data || error.message
      );
    }
  };

  // Token expiration handler
  const accessTokenExpirationHandler = useCallback(() => {
    console.log("Access token expired. Fetching a new token...");
    fetchAccessToken();
  }, []);

  // Handle Sumsub SDK messages
  const messageHandler = (type, payload) => {
    if (
      type === "idCheck.onApplicantStatusChanged" &&  payload.reviewResult &&
      payload.reviewResult.reviewAnswer === "GREEN"
    ) {
      const user_info = JSON.parse(localStorage.getItem("user_info"));
      const data = {
        ...user_info,
        kycStatus: true,
      };
      localStorage.setItem("user_info", JSON.stringify(data));
    } else if (type === "idCheck.onStatusChanged") {
      console.log("Status changed:", payload);
    }
  };

  // Handle Sumsub SDK errors
  const errorHandler = (error) => {
    console.error("Sumsub SDK error:", error);
  };

  // Fetch the initial access token on mount
  useEffect(() => {
    fetchAccessToken();
  }, []);

  if (!accessToken) {
    return <div className="p-4">Loading verification...</div>;
  }

  return (
    <div className="w-full lg:min-w-[40rem] mx-auto">
      <h2 className="text-xl font-bold mb-4 main-text">
        Identity Verification
      </h2>
      <div className="border rounded-lg overflow-hidden">
        <SumsubWebSdk
          accessToken={accessToken}
          expirationHandler={accessTokenExpirationHandler}
          onMessage={messageHandler}
          onError={errorHandler}
        />
      </div>
    </div>
  );
};

export default SumsubVerification;
