"use client"
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useRouter } from "nextjs-toploader/app";

const AccessDeniedPage = () => {
    const router = useRouter();
    const {handleLogOut} = useDynamicContext()

    const handleLoginRedirect = async() => {
        await handleLogOut(); // Ensure this function is asynchronous and defined elsewhere
        router.push("/login");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md p-6 bg-white shadow-lg rounded-lg text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Account Blocked</h1>
                <p className="text-gray-700 mb-6">
                    Your account has been blocked by the admin. Please contact support if you
                    believe this is a mistake or login using another account.
                </p>
                <button
                    onClick={handleLoginRedirect}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Login with Another Account
                </button>
            </div>
        </div>
    );
};

export default AccessDeniedPage;
