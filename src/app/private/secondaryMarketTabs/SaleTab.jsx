"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useApi } from "@/app/hooks/useApi";
import Popup from "@/app/components/Popup";
import SellPropertyModel from "@/app/components/SellPropertyModel";
import DetailsPopup from "@/app/components/DetailsPopup";
import { Skeleton } from "@mui/material";
import { ReadMore } from "@/app/components/ReadMore";
import Image from "next/image";

const SaleTab = () => {
    const { get } = useApi();
    const [saleData, setSaleData] = useState([]);
    const [isSell, setSell] = useState(false);
    const [dataForSell, setDataForSell] = useState(null);
    const [isDetails, setDetails] = useState(false);
    const [loading, setLoading] = useState(true);

    const getSaleData = async () => {
        try {
            const result = await get("buy-property-lists");
            setSaleData(result.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getSaleData();
    }, []);

    const handleDetails = () => {
        setDetails(true);
    };

    const renderSkeletons = () =>
        Array.from({ length: 4 }).map((_, idx) => (
            <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                className="bg-contrast rounded-[24px] shadow-hover p-3 flex flex-col"
            >
                {/* Skeleton for Image */}
                <Skeleton variant="rectangular" height={150} className="rounded-t-[15px]" />
                <div className="p-6 flex flex-col gap-[16px]">
                    {/* Skeleton for Title */}
                    <Skeleton variant="text" width="60%" height={30} />
                    {/* Skeleton for Type */}
                    <Skeleton variant="text" width="80%" height={20} />
                    {/* Skeleton for Description */}
                    <Skeleton variant="text" width="90%" height={20} />
                    <div className="flex flex-col gap-[8px]">
                        {/* Skeleton for Expected Returns */}
                        <Skeleton variant="text" width="50%" height={20} />
                        {/* Skeleton for Current Holding */}
                        <Skeleton variant="text" width="40%" height={20} />
                    </div>
                    <div className="flex flex-row gap-[16px]">
                        {/* Skeleton for Buttons */}
                        <Skeleton variant="rectangular" width="45%" height={40} />
                        <Skeleton variant="rectangular" width="45%" height={40} />
                    </div>
                </div>
            </motion.div>
        ));

    return (
        <>
            {isSell && (
                <Popup onDialogClose={() => setSell(false)} open={isSell} closeIcon={true}>
                    <SellPropertyModel
                        data={dataForSell}
                        onClose={() => setSell(false)}
                        apiCall={getSaleData}
                    />
                </Popup>
            )}
            {isDetails && (
                <Popup onDialogClose={() => setDetails(false)} open={isDetails} closeIcon={true}>
                    <DetailsPopup
                        apiCall={getSaleData}
                        data={dataForSell}
                        onClose={() => setDetails(false)}
                    />
                </Popup>
            )}

            <div className="grid grid-cols-1 md:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                {loading ? (
                    renderSkeletons()
                ) : saleData.length > 0 ? (
                    saleData.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.2, duration: 0.6 }}
                            className="bg-contrast rounded-[24px] flex flex-col shadow-hover p-3"
                        >
                            <div className="flex flex-col md:col-span-1 relative">
                                {/*========= badge -============= */}
                                    <h5 className="badge">{item.propertyType}</h5>
                                <Image
                                    src={
                                        item.propertyImages.length > 0 &&
                                        item.propertyImages[0].image
                                    }
                                    alt={`Apartment ${idx + 1}`}
                                    className="rounded-t-[15px] w-full min-h-64 h-64 object-cover"
                                    height={50}
                                    width={50}
                                />
                            </div>
                            <div className="py-4 px-3 flex flex-col justify-between h-full gap-5">
                                <div className="flex flex-col gap-3">
                                    <div className="flex flex-col">
                                    {item.propertyTypeId == 1 && (
                                        <p className=" text-[#ca2f2f] text-xs font-medium ">
                                            You cannot put this property in secondary market as it is
                                            Bridging facility property
                                        </p>
                                    )}
                                        <h2 className="main-text text-xl md:text-2xl font-bold flex items-center justify-between w-full text-accent">
                                            {item.propertyName}
                                        </h2>
                                        <p className="main-text text-md font-medium">
                                            {item.propertyType}
                                        </p>
                                    </div>

                                    <p className="text-sm text-buttonhover font-medium break-words min-h-20 leading-relaxed">
                                        <ReadMore
                                            id="property-description"
                                            text={item.propertyDescription}
                                            amountOfChars={150}
                                        />
                                    </p>

                                    <div className="flex flex-col gap-[24px]">
                                        <div className="flex flex-col gap-4 md:flex-row justify-between">
                                            <p className="main-text font-medium text-buttonhover">
                                                Expected Returns Per Share:{" "}
                                                <span className="font-semibold text-accent">
                                                    $ {item.monthlyInterest}/
                                                </span>{" "}
                                                month
                                            </p>
                                            <p className="main-text font-medium text-buttonhover">
                                                Current Holding:{" "}
                                                <span className="font-semibold text-accent">
                                                    {item.currentHolding}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row gap-[24px] w-full items-center justify-center">
                                    <button
                                        onClick={() => {
                                            handleDetails(true);
                                            setDataForSell(item);
                                        }}
                                        disabled={item.propertyTypeId == 1}
                                        className={`flex items-center justify-center w-full md:w-1/2 lg:w-2/3 xl:w-1/2 main-text font-semibold border rounded-[31px] p-4 transition-all duration-300 
                                          ${item.propertyTypeId == 1
                                                ? "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed"
                                                : "text-accent border-accent hover:bg-[#EDEAF3] hover:text-accent hover:border-[#EDEAF3]"
                                            }`}
                                    >
                                        Market Details
                                    </button>
                                    <button
                                        onClick={() => {
                                            setSell(true);
                                            setDataForSell(item);
                                        }}
                                        disabled={
                                            item.currentHolding === 0 || item.propertyTypeId == 1
                                        }
                                        className={`flex items-center justify-center w-full md:w-1/2 lg:w-2/3 xl:w-1/2 main-text font-semibold border rounded-[31px] p-4 transition-all duration-300
    ${item.currentHolding === 0 || item.propertyTypeId == 1
                                                ? "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed"
                                                : "text-contrast bg-accent border-accent hover:bg-[#51406b] hover:text-white"
                                            }`}
                                    >
                                        Put On Sell
                                    </button>
                                </div>

                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center h-full col-span-1 text-center md:col-span-1 xl:col-span-2 2xl:col-span-3 w-full">
                        <p className="main-text text-2xl font-bold text-accent ">
                            No Properties Available
                        </p>
                    </div>
                )}
            </div>
        </>
    );
};

export default SaleTab;
