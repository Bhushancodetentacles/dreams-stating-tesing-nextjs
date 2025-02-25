"use client";

import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import {
    DynamicContextProvider,
    useDynamicContext,
    useIsLoggedIn,
} from "@dynamic-labs/sdk-react-core";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { useEffect } from "react";

export default function ProviderWrapper({ children }) {
    const router = useRouter();

    return (
        <DynamicContextProvider
            settings={{
                environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID,
                walletConnectors: [EthereumWalletConnectors],
                eventsCallbacks: {
                    onAuthSuccess: async (args) => {
                        if (args.isAuthenticated) {
                            router.push("/dashboard");
                        }
                    },
                    onLogout: async () => {
                        router.push("/login");
                    },
                },
                termsOfServiceUrl: "https://pixl.property/terms.html",
                policiesConsentInnerComponent: (
                    <div>
                        <p>
                            By checking this box, you agree to our{" "}
                            <Link href="https://pixl.property/terms.html" target="_blank">
                                Terms of Service
                            </Link>
                        </p>
                    </div>
                ),
            }}
        >
            <AuthGuard>{children}</AuthGuard>
        </DynamicContextProvider>
    );
}

// Auth guard component to handle redirects
function AuthGuard({ children }) {
    const isAuthenticated = useIsLoggedIn();
    const { sdkHasLoaded } = useDynamicContext();

    const router = useRouter();
    const pathname = usePathname();
    const publicPaths = ["/login", "/termsServicesCheckbox", "/access-denied"]; // Add any public paths here

    useEffect(() => {
        if (!isAuthenticated && !publicPaths.includes(pathname) && sdkHasLoaded) {
            router.push("/login");
        }
    }, [isAuthenticated, pathname, router]);

    if (!isAuthenticated && !publicPaths.includes(pathname)) {
        return;
    }

    return <>{children}</>;
}
