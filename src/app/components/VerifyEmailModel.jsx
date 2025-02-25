import React, { useState } from "react";
import toast from "react-hot-toast";
import { useApi } from "../hooks/useApi";

function VerifyEmailModel({ email, onClose }) {
    const [loading, setLoading] = React.useState(false);
    const { get } = useApi();

    const handleSendVerificationEmail = async (values) => {
        try {
          setLoading(true)
            const result = await get(`send-verify-email?email=${email}`);
            toast.success(result.message);
            onClose()
        } catch (error) {
            console.log(error);
            // throw error;
        } finally {
          setLoading(false)
        }
    };

    return (
        <>
            <div className="w-full lg:min-w-[40rem] mx-auto p-4">
                <h2 className="text-xl font-bold mb-4 text-accent">Verify Email</h2>
                <div className="border rounded-lg overflow-hidden p-6 bg-white shadow-md">
                    <p className="text-accent font-semibold text-lg mb-4">
                        Please verify your email to log in. A verification message will be sent to
                        your email.
                    </p>
                    <div className="space-y-4">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-normal text-accent"
                            >
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                placeholder="Enter your email address."
                                disabled
                                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-accent border-gray-300"
                            />
                        </div>

                        <button
                            onClick={handleSendVerificationEmail}
                            className={`w-full ${
                                loading ? "bg-gray-400" : "bg-accent"
                            } text-white px-6 py-3 rounded-lg shadow-md hover:bg-contrast border hover:text-accent hover:border-accent hover:border hover:font-bold border-transparent transition duration-300`}
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "Send Verification Email"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default VerifyEmailModel;
