"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUp } from "lucide-react"; // Import lucide icons
import Image from "next/image";
import Script from "next/script";

function Footer() {
    // Data for social links
    const socialLinks = [
        {
            href: "https://x.com/PiXLRWA",
            icon: (
                <p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-twitter-x"
                        viewBox="0 0 16 16"
                    >
                        <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                    </svg>
                </p>
            ),
        },
        {
            href: "https://www.facebook.com/people/Pixl/61572666922653/",
            icon: (
                <p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-facebook"
                        viewBox="0 0 16 16"
                    >
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                    </svg>
                </p>
            ),
        },
        {
            href: "https://www.instagram.com/pixl_property/",
            icon: (
                <p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-instagram"
                        viewBox="0 0 16 16"
                    >
                        <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                    </svg>
                </p>
            ),
        },
        {
            href: "https://www.linkedin.com/company/pixl-property",
            icon: (
                <p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-linkedin"
                        viewBox="0 0 16 16"
                    >
                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                    </svg>
                </p>
            ),
        },
    ];

    // Data for the footer links
    const footerLinks = [
        {
            title: "Useful Links",
            links: [
                { text: "Home", href: "https://pixl.property/" },
                { text: "About us", href: "https://pixl.property/home.html#about" },
                {
                    text: "Compliance",
                    href: "https://pixl.property/compliance-overview.html",
                },
                { text: "Terms of service", href: "https://pixl.property/terms.html" },
                { text: "Privacy policy", href: "https://pixl.property/privacy.html" },
            ],
        },
        {
            title: "Our Services",
            links: [
                {
                    text: "The Properties",
                    href: "https://pixl.property/propertyindex.html",
                },
                { text: "The Tokens", href: "https://pixl.property/home.html#tokens" },
                {
                    text: "The Platform",
                    href: "https://pixl.property/home.html#platform",
                },
                {
                    text: "Whitepaper",
                    href: "https://pixl.property/wp-whitepaper.html",
                },
                { text: "FAQs", href: "https://pixl.property/home.html#faqs" },
            ],
        },
    ];

    const [showButton, setShowButton] = useState(false);

    const checkScrollTop = () => {
        if (window.scrollY > 300) {
            setShowButton(true);
        } else {
            setShowButton(false);
        }
    };

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    useEffect(() => {
        window.addEventListener("scroll", checkScrollTop);
        return () => window.removeEventListener("scroll", checkScrollTop);
    }, []);

    return (
        <>
            {/* Scroll to Top Button */}
            {showButton && (
                <a
                    href="#"
                    id="scroll-top"
                    className="fixed bottom-4 right-4 bg-accent text-white p-3 rounded shadow-lg flex items-center justify-center z-[99]"
                    onClick={(e) => {
                        e.preventDefault();
                        scrollTop();
                    }}
                >
                    <ArrowUp className="text-white" />
                </a>
            )}

            {/* Footer */}
            <footer className="relative text-default-color bg-footer text-sm">
                <div className="container mx-auto px-6 pt-6 md:px-12 md:pt-12 border-t ">
                    <div className="grid grid-cols-12 gap-6 md:gap-4 md:grid-cols-3 lg:grid-cols-12 border-b pb-6">
                        {/* First Column - Larger (spans 12 on small, 4 on medium screens) */}
                        <div className="footer-about col-span-12 md:col-span-2 lg:col-span-4">
                            <Link href="/" className="logo flex items-center">
                                <Image
                                    src="/images/newImg/logo.png"
                                    alt="Logo"
                                    width={100}
                                    height={100}
                                    className="max-h-8 mr-2 md:max-h-10 mb-[25px]"
                                />
                            </Link>
                            <div className="text-md pt-3 text-accent font-heading font-regular">
                                <p className="mb-2">Lloyds Accountancy</p>
                                <p className="mb-2">Wm Limited Electra House</p>
                                <p className="mb-2">Electra Way, Crewe, CW1 6GL</p>
                                <p className="mb-2">United Kingdom</p>
                                <p className="mt-5 mb-1">
                                    <strong>Phone:</strong> <span>+44 7736 778 319</span>
                                </p>
                                <p className="mb-1">
                                    <strong>Email:</strong>{" "}
                                    <a href="mailto:info@pixlpro.co.uk">info@pixlpro.co.uk</a>
                                </p>
                            </div>
                            <div className="social-links flex mt-6">
                                {socialLinks.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.href}
                                        className="flex items-center justify-center w-10 h-10 rounded-full border text-buttonhover transition-colors duration-300 hover:text-accent hover:border-accent mr-2.5"
                                    >
                                        {link.icon}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Middle Columns - Smaller (each spans 12 on small, 4 on medium screens) */}
                        {footerLinks.map((section, index) => (
                            <div
                                key={index}
                                className="footer-links col-span-12 md:col-span-2 lg:col-span-2"
                            >
                                <h4 className="text-base text-accent font-normal hover:font-bold pb-3">
                                    {section.title}
                                </h4>
                                <ul className="list-none p-0 m-0">
                                    {section.links.map((link, idx) => (
                                        <li key={idx} className="py-2">
                                            <Link
                                                href={link.href}
                                                className="text-buttonhover hover:text-accent"
                                            >
                                                {link.text}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {/* Last Column - Larger (spans 12 on small, 4 on medium screens) */}
                        <div className="col-span-12 lg:col-span-4 md:col-span-12">
                            <div className="footer-newsletter">
                                <h4 className="text-base font-normal text-accent hover:font-bold mb-5">
                                    Our Newsletter
                                </h4>
                                <p className="text-sm font-normal text-accent">
                                    Subscribe to our property newsletter and receive the latest news
                                    about new on-plan and off-plan properties in the market.
                                </p>
                                <form action="" className=" mt-4">
                                    <div className="newsletter-form flex mt-[30px] mb-4">
                                        <input
                                            name="email"
                                            type="email"
                                            placeholder=""
                                            className="py-3 px-4  rounded-s-[4px] border border-footer-text text-footer-text w-full focus-visible:none focus:outline-none"
                                        />
                                        <input
                                            type="submit"
                                            value="Subscribe"
                                            className="py-3 px-4  rounded-e-[4px] bg-accent text-white cursor-pointer hover:bg-accent-dark"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="copyright text-center border-secondary">
                    <p className="py-6 text-accent">
                        <span>Copyright</span>{" "}
                        <Link href="/">
                            {" "}
                            <strong className="px-1 sitename">PiXL</strong>{" "}
                        </Link>
                        <span>All Rights Reserved</span>
                    </p>
                </div>
                {/* <!-- ElevenLabs Chat Bot Widget --> */}
                <elevenlabs-convai agent-id="100X4QC9E4jqM3NQAxnJ"></elevenlabs-convai>
                <Script
                    src="https://elevenlabs.io/convai-widget/index.js"
                    async
                    type="text/javascript"
                ></Script>
            </footer>
        </>
    );
}

export default Footer;
