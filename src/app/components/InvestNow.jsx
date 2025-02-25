"use client";
import React, { useState } from "react";

function InvestNow() {
  const [activeTab, setActiveTab] = useState("crypto"); 

  return (
    <div className="flex justify-center items-center bg-contrast text-accent">
      <div className="w-full p-6">
        <div className="flex justify-between">
          <button
            className={`flex-1 py-2 text-center border ${
              activeTab === "crypto" ? "bg-accentshade font-bold" : ""
            }`}
            onClick={() => setActiveTab("crypto")}
          >
            Crypto
          </button>
          <button
            className={`flex-1 py-2 text-center border ${
              activeTab === "fiat" ? "bg-accentshade font-bold" : ""
            }`}
            onClick={() => setActiveTab("fiat")}
          >
            Fiat
          </button>
        </div>

        <div className="mt-5 text-center">
          {activeTab === "crypto" ? (
            <div>
              <p className="mb-4">Available Shares: 1000000</p>
              <input
                type="text"
                className="w-full p-2 border border-accent mb-4"
                placeholder="Enter value"
              />
              <button className="py-2 px-6 bg-accent text-contrast rounded-full">Submit</button>
            </div>
          ) : (
            <p>Coming Soonnnnnnnnnnnnnnnnn!</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default InvestNow;
