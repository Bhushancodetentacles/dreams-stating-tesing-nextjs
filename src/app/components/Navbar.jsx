"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import TopBar from "./TopBar";
import Image from "next/image";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [topBarVisible, setTopBarVisible] = useState(true);
  const [currentPath, setCurrentPath] = useState("#hero");
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null);

  const sectionsRef = useRef({});

  const navItems = [
    { href: "https://pixl.property/", label: "Home" },
    { href: "https://pixl.property/propertyindex.html", label: "Properties" },
    {
      label: "PiXL",
      hasDropdown: true,
      dropdownItems: [
        { href: "https://pixl.property/home.html#about", label: "About Us" },
        { href: "https://pixl.property/home.html#why-us", label: "Why Us" },
        { href: "https://pixl.property/home.html#faqs", label: "FAQ" },
        { href: "https://pixl.property/home.html#team", label: "Team" },
      ],
    },
    {
      label: "Features",
      hasDropdown: true,
      dropdownItems: [
        { href: "https://pixl.property/home.html#tokens", label: "Token" },
        { href: "https://pixl.property/home.html#platform", label: "Platform" },
      ],
    },
    { href: "https://pixl.property/wp-whitepaper.html", label: "Whitepaper" },
    { href: "https://pixl.property/compliance-overview.html", label: "Compliance" },
    { href: "https://pixl.property/home.html#contact", label: "Contact" },
  ];

  const handleLinkClick = (href, isAnchor) => {
    if (isAnchor) {
      setTimeout(() => {
        const section = document.querySelector(href);
        const offset = 80; // Offset for fixed navbar
        const topPosition =
          section?.getBoundingClientRect().top + window.pageYOffset - offset;

        if (topPosition) {
          window.scrollTo({
            top: topPosition,
            behavior: "smooth",
          });
        }
      }, 300);
    } else {
      window.location.href = href; // Navigate to dynamic pages
    }
  };

  const handleCloseMenu = () => {
    setIsMobileMenuOpen(false);
    setMobileDropdownOpen(null);
  };

  useEffect(() => {
    sectionsRef.current = navItems.reduce((acc, item) => {
      if (item.href && item.href.startsWith("#")) {
        const id = item.href.slice(1);
        acc[id] = document.getElementById(id);
      }
      return acc;
    }, {});

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentPath(`#${entry.target.id}`);
        }
      });
    };

    const observerOptions = {
      root: null,
      threshold: 0.9,
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    Object.values(sectionsRef.current).forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, [navItems]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <TopBar setShowTopBar={setTopBarVisible} />
      <header
        className={`sticky transition-all bg-contrast shadow-lg z-50 py-2 ${
          topBarVisible ? "top-[55px]" : "top-0"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between py-5 px-3">
          <Link href="/">
            <span className="flex items-center">
              <Image
                src="/images/newImg/logo.png"
                alt="Logo"
                className="md:w-40 w-24"
                width={50}
                height={50}
              />
            </span>
          </Link>
          {/* Desktop Nav */}
          <div className="flex items-center">
            <nav className="hidden xl:flex space-x-4">
              <ul className="flex ">
                {navItems.map((item) => {
                  const isAnchor = item.href?.startsWith("#");
                  return (
                    <li
                      key={item.href || item.label}
                      className="relative group"
                    >
                      {item.hasDropdown ? (
                        <div className="relative group">
                          <Link
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              isAnchor
                                ? handleLinkClick(item.href, true)
                                : handleLinkClick(item.href, false);
                            }}
                            className="flex items-center px-4"
                          >
                            <span
                              className={`text-base font-normal hover:text-accent hover:font-medium transition ${
                                currentPath === item.href
                                  ? "text-accent"
                                  : "text-accent"
                              }`}
                            >
                              {item.label}
                            </span>
                            <ChevronDown className="ml-2 text-accent group-hover:text-accent transition" />
                          </Link>
                          <div className="absolute left-0 mt-2 bg-white shadow-lg rounded-md w-40 hidden group-hover:block transition-opacity duration-300">
                            <ul className="space-y-2 p-3">
                              {item.dropdownItems?.map((dropdownItem) => {
                                const isDropdownAnchor =
                                  dropdownItem.href?.startsWith("#");
                                return (
                                  <li key={dropdownItem.href}>
                                    <Link
                                      href=""
                                      onClick={(e) => {
                                        e.preventDefault();
                                        isDropdownAnchor
                                          ? handleLinkClick(
                                              dropdownItem.href,
                                              true
                                            )
                                          : handleLinkClick(
                                              dropdownItem.href,
                                              false
                                            );
                                      }}
                                      className="block text-md leading-loose text-accent hover:text-accent"
                                    >
                                      {dropdownItem.label}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                          </div>
                        </div>
                      ) : (
                        <Link
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handleLinkClick(item.href, isAnchor);
                          }}
                          className="px-4 "
                        >
                          <span
                            className={`text-base font-normal hover:text-accent hover:font-medium transition ${
                              currentPath === item.href
                                ? "text-accent"
                                : "text-accent"
                            }`}
                          >
                            {item.label}
                          </span>
                        </Link>
                      )}
                      <span
                        className={`absolute left-0 bottom-[-20px] h-[2px] bg-accent transition-all duration-300 ${
                          currentPath === item.href ? "w-full" : "w-0"
                        } group-hover:w-full`}
                      ></span>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <Link href="/login">
              <h6 className="ms-[30px] text-xs md:text-sm md:px-6 md:py-2 text-accent border-accent border-2 px-2 py-1 rounded-full hover:bg-nav-hover hover:text-contrast hover:border-2 hover:border-accent transform transition-all duration-300 ease-in-out ">
                Login / Register
              </h6>
            </Link>
            {/* <Link href="/public/signup">
              <h6 className="md:ms-[30px] text-xs md:text-sm md:px-6 md:py-2 text-accent border-accent border-2 px-2 py-1 rounded-full hover:bg-nav-hover hover:text-contrast hover:border-2 hover:border-accent transform transition-all duration-300 ease-in-out ">
              Register
              </h6>
            </Link> */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden text-2xl cursor-pointer z-[10000] me-3"
            >
              <Menu />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`fixed inset-0 bg-nav-mobile-background transition-transform duration-300 overflow-hidden z-[9999] ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } xl:hidden`}
          onClick={handleCloseMenu}
        >
          <div className="p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-end">
              <X
                className="text-pink"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
            <ul className="space-y-2 absolute top-[60px] left-[20px] right-[20px] bottom-[20px] py-5 m-0 rounded bg-contrast overflow-y-auto transition-transform duration-300 z-[9998] shadow-lg">
              {navItems.map((item) => {
                const isAnchor = item.href?.startsWith("#");
                return (
                  <li key={item.href || item.label} className="relative">
                    {item.hasDropdown ? (
                      <div
                        className="flex justify-between items-center p-2 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          setMobileDropdownOpen((prev) =>
                            prev === item.label ? null : item.label
                          );
                        }}
                      >
                        <span
                          className={`text-xs uppercase  ${
                            currentPath === item.href
                              ? "text-accent"
                              : "text-accent"
                          }`}
                        >
                          {item.label}
                        </span>
                        <ChevronDown
                          className={`transition-transform ${
                            mobileDropdownOpen === item.label
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      </div>
                    ) : (
                      <Link
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleLinkClick(item.href, isAnchor);
                          handleCloseMenu();
                        }}
                        className={`block p-2 text-xs uppercase  ${
                          currentPath === item.href
                            ? "text-accent"
                            : "text-accent"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                    {item.hasDropdown && mobileDropdownOpen === item.label && (
                      <ul className="pl-6 space-y-2">
                        {item.dropdownItems?.map((dropdownItem) => {
                          const isDropdownAnchor =
                            dropdownItem.href?.startsWith("#");
                          return (
                            <li key={dropdownItem.href}>
                              <Link
                                href=""
                                className="block text-sm text-accent hover:text-accent"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleLinkClick(
                                    dropdownItem.href,
                                    isDropdownAnchor
                                  );
                                  handleCloseMenu();
                                }}
                              >
                                {dropdownItem.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </header>
    </>
  );
}

export default Navbar;
