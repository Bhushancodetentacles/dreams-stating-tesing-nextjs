import { useApi } from "@/app/hooks/useApi";
import { Link } from "lucide-react";
import React, { useEffect, useState } from "react";
import { polygon, polygonAmoy } from "viem/chains";
import Skeleton from "react-loading-skeleton";
import { formatDate } from "@/utils/formatDate";

const ENV = process.env.NEXT_PUBLIC_ENV;

const TransactionDetailPopup = ({ txHash = "" }) => {
    const [loading, setLoading] = useState(false);
    const [details, setDetails] = useState({});
    const [error, setError] = useState("");
    const { get } = useApi();

    useEffect(() => {
        const fetchUserTransactions = async () => {
            setLoading(true);
            try {
                setError("");
                const result = await get(`/user-transaction-detail?transactionHash=${txHash}`);
                setDetails(result || {});
            } catch (error) {
                console.error("Error fetching transaction details:", error);
                setError("something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchUserTransactions();
    }, [txHash]);

    if (error.length)
        return (
            <div className="flex flex-col items-center justify-center h-1/3">
                {" "}
                <p className="text-red-500 text-center">{error}</p>
            </div>
        );


    return (
        <div className="flex flex-col gap-9 items-center justify-center">
            <p className="text-accent text-lg md:text-2xl font-semibold">
                {loading ? <Skeleton width={200} /> : "Transaction Details"}
            </p>
            <div className="flex flex-col gap-4 w-full">
            <div className="grid grid-cols-1 gap-4 w-full">
                <div className="gap-2 md:gap-24 w-full flex">
                    <p className="text-sm md:text-base text-accent w-1/2">Transaction Hash</p>
                    <div className="flex gap-2 items-center w-1/2 justify-end">
                        {loading ? (
                            <Skeleton width={300} />
                        ) : (
                            <p className="text-sm md:text-base font-semibold text-accent break-keep">
                                {txHash.slice(0, 6)}...{txHash.slice(-6) || ""}
                            </p>
                        )}
                        {!loading && (
                            <Link
                                onClick={() =>
                                    window.open(
                                        ENV === "dev"
                                            ? polygonAmoy.blockExplorers.default.url +
                                                  "/tx/" +
                                                  txHash
                                            : polygon.blockExplorers.default.url,
                                        "_blank"
                                    )
                                }
                                className="size-[18px] text-accent cursor-pointer"
                            />
                            // <Link
                            //     onClick={() =>
                            //         window.open(
                            //             polygonAmoy.blockExplorers.default.url + "/tx/" + txHash,
                            //             "_blank"
                            //         )
                            //     }
                            //     className="size-[18px] text-accent cursor-pointer"
                            // />
                        )}
                    </div>
                </div>
                <div className="gap-2 md:gap-7 w-full flex">
                    <p className="text-sm md:text-base text-accent w-1/2">Status</p>
                    <p className="text-sm md:text-base font-semibold w-1/2 text-right text-accent">
                        {loading ? <Skeleton width={100} /> : "Successful"}
                    </p>
                </div>
                {/* <div className="gap-2 md:gap-7">
                    <p className="text-base text-accent">Amount</p>
                    <p className="text-md font-semibold">
                        {loading ? <Skeleton width={80} /> : `$${details.amount || 0}`}
                    </p>
                </div> */}
            </div>
            <div className="grid grid-cols-1 w-full gap-4 ">
                {[
                    { label: "Property Name", value: details.propertyName || "-" },
                    { label: "Total Tokens", value: `${details.share || 0}` },
                    { label: "Total Amount", value: `$${details.amount || 0}` },
                ].map((item, index) => (
                    <div key={index} className="gap-2 md:gap-7 w-full flex">
                        <p className="text-sm md:text-base text-accent w-1/2">{item.label}</p>
                        <p className="text-sm md:text-base font-semibold text-accent w-1/2 text-end">
                            {loading ? <Skeleton width={150} /> : item.value}
                        </p>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 w-full gap-4 ">
                {[
                    { label: "Token Price", value: `$${details.tokenPrice || 0}` },
                    { label: "Transaction Date", value: formatDate(details.transactionDate) || "" },
                    {
                        label: "Transaction Type",
                        value: details.transactionType
                            ? `${details.transactionType} Property`
                            : "Buy Property",
                    },
                ].map((item, index) => (
                    <div key={index} className="gap-2 md:gap-7 w-full flex">
                        <p className="text-sm md:text-base text-accent w-1/2">{item.label}</p>
                        <p className="text-sm md:text-base font-semibold text-accent w-1/2 text-end">
                            {loading ? <Skeleton width={120} /> : item.value}
                        </p>
                    </div>
                ))}
            </div>
            </div>
        </div>
    );
};

export default TransactionDetailPopup;
