"use client";
import { Bell, MessageCircleWarning, X } from "lucide-react"; // Importing close icon (X)
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useIsLoggedIn } from "@dynamic-labs/sdk-react-core";

const Header = () => {
  const [isShowNotification, setIsShowNotification] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname(); // Add this
  const [activeTab, setActiveTab] = useState(""); // State for active tab
  const isAuthenticated = useIsLoggedIn();

  // Update this useEffect to sync with current route
  useEffect(() => {
    // Map pathname to tab names
    if (pathname.includes("/dashboard")) {
      setActiveTab("dashboard");
    } else if (pathname.includes("available-properties")) {
      setActiveTab("availableProperties");
    } else if (pathname.includes("transaction-history")) {
      setActiveTab("transactionHistory")
    } else if (pathname.includes("secondary-market-tabs")) {
      setActiveTab("secondaryMarket");
    } else {
      setActiveTab("")
    }
  }, [pathname]); // Depend on pathname changes

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const divRef = useRef(null); // Reference to the notification div
  const menuRef = useRef(null); // Reference to the mobile menu div
  // Close mobile menu on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleTabClick = (tab) => {
    setActiveTab(tab); // Update active tab state
    setIsMobileMenuOpen(false); // Close mobile menu after clicking a tab
  };

  return (
    <>
      <header className="bg-accentshade px-4 py-3 md:px-[60px] shadow-hover z-50">
        <div className="flex items-center justify-between flex-wrap">
          <Link
            href={isAuthenticated ? "/dashboard" : "/login"}
            onClick={() => handleTabClick("dashboard")}
          >
            <Image
              src="/images/newImg/logo.png"
              alt="pixL Logo"
              className="w-[135px] h-[34px]"
              width={135}
              height={34}
            />
          </Link>

          <div
            ref={menuRef}
            className={`${isMobileMenuOpen ? "block" : "!hidden"
              } absolute top-[60px] left-0 w-full bg-contrast xl:hidden flex flex-col p-6 gap-4 z-50 shadow-2xl`}
          >
            {/* Close button */}
            <button
              onClick={toggleMobileMenu}
              className="text-2xl text-accent self-end"
            >
              <X /> {/* Close icon */}
            </button>

            {isAuthenticated && (
              <Link
                href="/dashboard"
                className={`${activeTab === "dashboard"
                  ? "border-b-2 border-pink w-max"
                  : "border-transparent hover:border-pink hover:text-accent hover:border-b-2 transition duration-300 ease-in-out"
                  }  text-accent font-normal text-md`}
                onClick={() => handleTabClick("dashboard")}
              >
                Portfolio Overview
              </Link>
            )}
            <Link
              href="/available-properties"
              className={`${activeTab === "availableProperties"
                ? "border-b-2 border-pink w-max"
                : "border-transparent hover:border-pink hover:text-accent hover:border-b-2 transition duration-300 ease-in-out "
                }  text-accent font-normal text-md`}
              onClick={() => handleTabClick("availableProperties")}
            >
              Available Properties
            </Link>
            {isAuthenticated && (
              <Link
                href="/transaction-history"
                className={`${activeTab === "transactionHistory"
                  ? "border-b-2 border-pink w-max"
                  : "border-transparent hover:border-pink hover:text-accent hover:border-b-2 transition duration-300 ease-in-out"
                  }  text-accent font-normal text-md`}
                onClick={() => handleTabClick("transactionHistory")}
              >
                Transaction History
              </Link>
            )}

            <Link
              href="/secondary-market-tabs"
              className={`${activeTab === "secondaryMarket"
                ? "border-b-2 border-pink w-max"
                : "border-transparent hover:border-pink hover:text-accent hover:border-b-2 transition duration-300 ease-in-out"
                }  text-accent font-normal text-md`}
              onClick={() => handleTabClick("secondaryMarket")}
            >
              Secondary Market
            </Link>
            {/* <ConnectButton /> */}
          </div>
          <nav className="stroke hidden xl:flex xl:justify-center  text-sm flex-col xl:flex-row w-full xl:w-auto items-center">
            {isAuthenticated && (
              <Link
                href="/dashboard"
                className={`px-4 py-3 text-accent text-base font-normal ${activeTab === "dashboard" ? "active" : ""
                  }`}
                onClick={() => handleTabClick("dashboard")}
              >
                Portfolio Overview
              </Link>
            )}
            <Link
              href="/available-properties"
              className={`px-4 py-3 text-accent text-base font-normal ${activeTab === "availableProperties" ? "active" : ""
                }`}
              onClick={() => handleTabClick("availableProperties")}
            >
              Available Properties
            </Link>
            {isAuthenticated && (
              <Link
                href="/transaction-history"
                className={`px-4 py-3 text-accent text-base font-normal ${activeTab === "transactionHistory" ? "active" : ""
                  }`}
                onClick={() => handleTabClick("transactionHistory")}
              >
                Transaction History
              </Link>
            )}
            <Link
              href="/secondary-market-tabs"
              className={`px-4 py-3 text-accent text-base font-normal ${activeTab === "secondaryMarket" ? "active" : ""
                }`}
              onClick={() => handleTabClick("secondaryMarket")}
            >
              Secondary Market
            </Link>
          </nav>



          {isAuthenticated && (
            <div className="flex items-center gap-4 md:gap-6">
              <div ref={divRef} className="relative">
                {isShowNotification && (
                  <div className="absolute card-grad top-11 right-[-48px] p-4 rounded-[16px] flex flex-col gap-[31px] z-10">
                    <div className="flex flex-col gap-[24px]">
                      {[...Array(3)].map((_, index) => (
                        <div
                          className="flex items-center gap-[10px] w-max"
                          key={index}
                        >
                          <img
                            src="/images/home.webp"
                            alt="Profile"
                            className="h-[44px] w-[44px] rounded-full"
                          />
                          <div className="flex flex-col gap-[6px]">
                            <p className="main-text text-contrast font-medium">
                              New property added in Miami, FL.
                            </p>
                            <p className="main-text text-xs font-medium">
                              2 hours ago.
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Link
                      href="/notification"
                      onClick={() => setIsShowNotification(false)}
                      className="main-text border border-[#CCCCCC] rounded-[31px] p-4 text-center"
                    >
                      More Info
                    </Link>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4">
                {" "}
                <button
                  className="xl:hidden text-2xl focus:outline-none text-accent"
                  onClick={toggleMobileMenu}
                >
                  ☰
                </button>{" "}
                <Link href="/profile">
                  <Image
                    src={"/images/avtaar.jpg"}
                    alt="Profile"
                    className="h-8 w-8 rounded-full"
                    onError={(e) => {
                      e.target.src = "/images/avtaar.jpg"; // Set the default image if an error occurs
                    }}
                    width={32}
                    height={32}
                  />
                </Link>{" "}
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
