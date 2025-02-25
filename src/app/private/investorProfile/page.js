"use client";
import Popup from "@/app/components/Popup";
import SumsubVerification from "@/app/components/SumsubVerification";
import { useApi } from "@/app/hooks/useApi";
import { DynamicEmbeddedWidget } from "@dynamic-labs/sdk-react-core";
import { ArrowLeft, CircleCheckBig, CircleHelp } from "lucide-react";
import React, { useEffect } from "react";
import { Tooltip } from "@mui/material";

const ProfilePage = () => {
    const { get } = useApi();
    const [isKycModalOpen, setIsKycModalOpen] = React.useState(false);
    const [hasKycDone, setHasKycDone] = React.useState(false);

    const getProfileData = async () => {
        try {
            const response = await get("/get-profile");
            setHasKycDone(response.investor.kycStatus);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getProfileData();
    }, []);

    return (
        <>
            {isKycModalOpen && (
                <Popup
                    open={true}
                    onDialogClose={() => {
                        setIsKycModalOpen(false);
                        getProfileData()
                    }}
                    closeIcon={true}
                    dialogClass={
                        "bg-background min-h-screen px-6 overflow-hidden sm:px-12 lg:px-[60px] py-[24px] flex flex-col gap-[24px]"
                    }
                    dialogContentClass={
                        "bg-background rounded-3xl  h-max relative  gap-5 flex flex-col dialog-close"
                    }
                >
                    <SumsubVerification />
                </Popup>
            )}

            <div className="bg-background  px-6 sm:px-12 lg:px-[60px] py-[24px] flex flex-col gap-[24px]">
                {/* Header Section */}
                <section>
                    <div>
                        <div className="flex flex-col gap-1">
                            <h2 className="main-text text-xl md:text-2xl text-accent font-semibold flex items-center gap-4">
                                <ArrowLeft
                                    onClick={() => window.history.back()}
                                    className="cursor-pointer"
                                    size={32}
                                />
                                Manage Your Profile
                            </h2>
                            <p className="text-sm font-normal main-text text-accent ps-12">
                                Keep your information accurate and up-to-date to ensure seamless
                                communication and account security.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Profile Form Section */}
                <div className="flex items-center justify-end gap-4">
                    {hasKycDone ? (
                        <p className="text-sm font-medium border-2 border-green-600 rounded-md p-2 text-green-600 flex items-center gap-2">
                            KYC Verified <CircleCheckBig />
                        </p>
                    ) : (
                        <Tooltip
                            title={
                                <span style={{ fontSize: "0.8rem", padding: "1rem" }}>
                                    You need to verify KYC
                                </span>
                            }
                            placement="top"
                        >
                            <button
                                onClick={() => setIsKycModalOpen(true)}
                                className="text-accent font-semibold border border-accent rounded-md py-2 px-4 hover:bg-accent hover:text-background transition-all duration-300 flex items-center gap-2"
                            >
                                KYC Verification <CircleHelp />
                            </button>
                        </Tooltip>
                    )}
                </div>
                <div className="w-full md:w-[50%] m-auto p-2 shadow-hover">
                    <DynamicEmbeddedWidget />
                </div>
            </div>
        </>
    );
};

export default ProfilePage;
