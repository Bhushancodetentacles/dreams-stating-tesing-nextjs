import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useApi } from "@/app/hooks/useApi";
import Popup from "@/app/components/Popup";
import BuyPropertySecondaryMarket from "@/app/components/BuyPropertySecondaryMarket";
import { ReadMore } from "@/app/components/ReadMore";
import Image from "next/image";
import SumsubVerification from "@/app/components/SumsubVerification";

const BuyTab = () => {
    const [loading, setLoading] = useState(true);
    const { get } = useApi();
    const [propertyData, setPropertyData] = useState([]);
    const [isBuy, setIsBuy] = useState(false);
    const [propertyDataToBuy, setPropertyDataToBuy] = useState(null);
    const [isKycModalOpen, setIsKycModalOpen] = useState(false);
    const [hasKycDone, setHasKycDone] = useState(false);

    const getBuySecondaryPropertyList = async (page = 1, perPageItem = 1000) => {
        setLoading(true);
        try {
            const result = await get(
                `/buy-secondary-property-lists?page=${page}&perPage=${perPageItem}`
            );
            setPropertyData(result.data);
        } catch (error) {
            console.error("Error fetching property data:", error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    };

    const getKycStatus = async () => {
        try {
            const response = await get("/get-profile");
            setHasKycDone(response.investor.kycStatus);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getKycStatus();
    }, []);

    useEffect(() => {
        getBuySecondaryPropertyList();
    }, []);

    return (
        <>
            {isKycModalOpen && (
                <Popup open={true} closeIcon={true} onDialogClose={() => setIsKycModalOpen(false)}>
                    <SumsubVerification />
                </Popup>
            )}
            {isBuy && (
                <Popup open={true} onDialogClose={() => setIsBuy(false)} closeIcon={true}>
                    <BuyPropertySecondaryMarket
                        data={propertyDataToBuy}
                        apiCall={getBuySecondaryPropertyList}
                        onClose={() => setIsBuy(false)}
                    />
                </Popup>
            )}

            <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                {propertyData.map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.2, duration: 0.6 }}
                        className="bg-contrast shadow-hover rounded-[24px] p-3 flex flex-col gap-[4px]"
                    >
                        <div className="flex flex-col gap-4">
                            {/* Skeleton for image and actual image */}
                            {loading ? (
                                <Skeleton height={200} className="rounded-t-[15px]" />
                            ) : (
                                <div className="flex flex-col md:col-span-1 relative">
                                    {/*========= badge -============= */}
                                    <h5 className="badge">{item.propertyType}</h5>
                                    <Image
                                        src={item.propertyImages[0].image}
                                        alt="secondary token"
                                        className="rounded-t-[15px] w-full min-h-64 h-64 object-cover"
                                        height={50}
                                        width={50}
                                    />
                                </div>
                            )}
                        </div>

                        <div className="py-4 px-3 flex flex-col justify-between h-full gap-5">
                            <div className="flex flex-col gap-[16px] lg:gap-1 xl:gap-4 justify-center md:col-span-2 text-accent">
                                {/* Skeleton for Title and Actual Content */}
                                <div className="flex flex-col">
                                    {loading ? (
                                        <Skeleton width="60%" height={24} />
                                    ) : (
                                        <h5 className="main-text text-xl md:text-2xl font-bold flex items-center justify-between w-full text-accent">
                                            {item.propertyName}
                                        </h5>
                                    )}
                                    {loading ? (
                                        <Skeleton width="80%" />
                                    ) : (
                                        <p className="main-text text-md font-medium">
                                            {item.propertyType}
                                        </p>
                                    )}
                                </div>

                                {/* Skeleton for Description and Actual Content */}
                                <p className="text-sm text-buttonhover font-medium break-words min-h-20 leading-relaxed">
                                    {loading ? (
                                        <Skeleton count={3} />
                                    ) : (
                                        <ReadMore
                                            id="property-description"
                                            text={item.propertyDescription}
                                            amountOfChars={150}
                                        />
                                    )}
                                </p>

                                <div className="flex flex-col gap-[4px] md:gap-[24px]">
                                    <div className="flex flex-col gap-2 md:gap-4 md:flex-row justify-between">
                                        {/* Skeleton for Price and Returns */}
                                        {loading ? (
                                            <>
                                                <Skeleton width="100%" />
                                                <Skeleton width="100%" />
                                            </>
                                        ) : (
                                            <>
                                                <p className="main-text text-buttonhover font-medium">
                                                    Expected Returns Per Share :{" "}
                                                    <span className="font-semibold text-accent">
                                                        ${item.monthlyInterest} / month
                                                    </span>
                                                </p>
                                                <p className="main-text text-buttonhover font-medium">
                                                    Total Shares:{" "}
                                                    <span className="font-semibold text-accent">
                                                        {item.totalShare}
                                                    </span>
                                                </p>
                                            </>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-2 md:gap-4 md:flex-row justify-between">
                                        {/* Skeleton for Price per Share and Actual Content */}
                                        {loading ? (
                                            <>
                                                <Skeleton width="100%" />
                                                <Skeleton width="100%" />
                                            </>
                                        ) : (
                                            <>
                                                <p className="main-text text-buttonhover font-medium">
                                                    Price per Share:{" "}
                                                    <span className="font-semibold text-accent">
                                                        ${item.pricePerShare}
                                                    </span>
                                                </p>
                                                <p className="main-text text-buttonhover font-medium">
                                                    Total Price:{" "}
                                                    <span className="font-semibold text-accent">
                                                        ${item.totalPrice}
                                                    </span>
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Skeleton for Button and Actual Button */}
                            <div className="flex flex-col md:flex-row items-center gap-[24px] w-full">
                                {loading ? (
                                    <Skeleton height={48} width="100%" className="rounded-[31px]" />
                                ) : (
                                    <>
                                        <Link
                                            href={`/investor-property-details/${item.propertyId}`}
                                            className="flex items-center justify-center w-full md:w-1/2 lg:w-2/3 xl:w-1/2 main-text text-accent font-semibold border border-accent group rounded-[31px] p-4 hover:bg-[#EDEAF3] hover:text-accent hover:border-[#EDEAF3] transition-all duration-300"
                                        >
                                            More Info
                                        </Link>
                                        <button
                                            onClick={() => {
                                                if (hasKycDone) {
                                                    setIsBuy(true);
                                                    setPropertyDataToBuy(item);
                                                } else {
                                                    setIsKycModalOpen(true);
                                                }
                                            }}
                                            // onClick={() => {
                                            //     if (hasKycDone) {
                                            //         setIsBuy(true);
                                            //         setPropertyDataToBuy(item);
                                            //     } else {
                                            //         setIsKycModalOpen(true);
                                            //     }
                                            // }}
                                            className="flex items-center justify-center mx-auto w-full md:w-1/2 main-text text-contrast bg-accent hover:bg-white hover:text-accent hover:border hover:border-accent transition-all duration-300 ease-in-out font-semibold btn-grad rounded-[31px] p-4"
                                        >
                                            Buy
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
                {!loading && propertyData.length === 0 && (
                    <div className="text-center w-full col-span-3">
                        <p className="text-lg font-bold text-accent">No Properties Found</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default BuyTab;
