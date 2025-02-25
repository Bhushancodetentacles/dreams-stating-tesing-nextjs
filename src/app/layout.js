import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import ProviderWrapper from "./context/ProviderWrapper";
import Script from "next/script";

export const metadata = {
  title: "PIXL - Revolutionizing Real Estate Investment",
  description: "PIXL - Revolutionizing Real Estate Investment",
  keywords: "PIXL - Revolutionizing Real Estate Investment",
  author: "PIXL - Revolutionizing Real Estate Investment",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, user-scalable=yes"
                />
                <meta name="description" content={metadata.description} />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                {/* Google Tag Manager */}
                <Script async src="https://www.googletagmanager.com/gtag/js?id=G-VBFNR0D3YS" />
                <Script id="google-analytics">
                    {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-VBFNR0D3YS');
          `}
                </Script>
                <title>{metadata.title}</title>
            </head>
            <body>
                <NextTopLoader
                    color="#1657cb"
                    initialPosition={0.08}
                    crawlSpeed={200}
                    height={3}
                    crawl={true}
                    showSpinner={true}
                    easing="ease"
                    speed={200}
                    shadow="0 0 10px #2299DD,0 0 5px #2299DD"
                    template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-[#4a308c1a] backdrop-blur" role="spinner"><div class="w-8 h-8 border-4 border-[#3f2762] border-dotted rounded-full animate-spin"></div></div>'
                    zIndex={1600}
                    showAtBottom={false}
                />
                <ProviderWrapper>{children}</ProviderWrapper>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                    toastOptions={{
                        style: {
                            border: "1px solid  #3F2762",
                            padding: "8px 16px",
                            backgroundColor: " #3F2762",
                            color: "white",
                        },
                    }}
                />
            </body>
        </html>
    );
}
