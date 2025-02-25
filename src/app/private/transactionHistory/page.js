"use client";
import Popup from "@/app/components/Popup";
import Table from "@/app/components/VTable";
import { ArrowLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Import motion from framer-motion
import TransactionDetailPopup from "./TransactionDetailPopup";
import { useApi } from "@/app/hooks/useApi";
import { formatDate } from "@/utils/formatDate";
import TransactionHash from "@/app/components/TranscationHash";

const TransactionHistoryPage = () => {
    const { get } = useApi();
    const [detailModal, setDetailModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedTxHash, setSelectedTxHash] = useState("");
    const [userTranscations, setUserTranscations] = useState([]);

    const transactionColumns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
            width: "5%",
            sortable: true,
            render: (_, index) => <span>{index + 1}</span>,
        },
        {
            title: "Transaction Hash",
            dataIndex: "transactionHash",
            key: "transactionHash",
            width: "20%",
            sortable: true,
            render: (item) => <TransactionHash txHash={item.transactionHash} />,
        },
        {
            title: "Type",
            dataIndex: "type",
            key: "type",
            width: "10%",
            sortable: true,
            render: (item, index) => <span>{item.type}</span>,
        },
        {
            title: "Total Tokens",
            dataIndex: "share",
            key: "share",
            width: "15%",
            sortable: true,
            render: (item, index) => <span>{item.share || "0"}</span>,
        },
        {
            title: "Total Amount",
            dataIndex: "amount",
            key: "amount",
            width: "15%",
            sortable: true,
            render: (item, index) => <span>${item.amount || "0"}</span>,
        },
        {
            title: "Date",
            dataIndex: "date",
            key: "date",
            width: "15%",
            sortable: true,
            render: (item, index) => <span>{formatDate(item.date)}</span>,
        },
        // {
        //     title: <div className="text-center">Status</div>,
        //     dataIndex: "status",
        //     key: "status",
        //     width: "10%",
        //     sortable: true,
        //     render: (item) => (
        //         <div className="px-4 py-2 main-text rounded flex items-center gap-1 transition duration-300 ease-in-out text-nowrap justify-center mx-auto">
        //             {item.status === "Success" && (
        //                 <span className="border-[#65a30d] border main-text rounded-full font-semibold text-[#65a30d] px-3 py-1">
        //                     Success
        //                 </span>
        //             )}
        //             {item.status === "Pending" && (
        //                 <span className="border border-[#f59e0b] main-text rounded-full font-semibold text-[#f59e0b] px-3 py-1">
        //                     Pending
        //                 </span>
        //             )}
        //             {item.status === "Failed" && (
        //                 <span className="border border-[#DC3545] main-text rounded-full font-semibold text-[#DC3545] px-4 py-1">
        //                     Failed
        //                 </span>
        //             )}
        //         </div>
        //     ),
        // },
        {
            title: <div className="text-center">Action</div>,
            dataIndex: "action",
            key: "action",
            width: "20%",
            render: (item) => (
                <button
                    onClick={() => {
                        setDetailModal(true);
                        setSelectedTxHash(item.transactionHash);
                    }}
                    className="px-4 py-2 mx-auto main-text rounded-full flex items-center gap-1 transition duration-300 ease-in-out text-nowrap border border-accent"
                >
                    View Details <ChevronRight />
                </button>
            ),
        },
    ];

    const [page, setPage] = useState(1);
    const [perPageItem, setPerPageItem] = useState(10);
    const [totalPages, setTotalPages] = useState(1);
    
    

    // Handlers
    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleRowsPerPageChange = (perPage) => {
        setPerPageItem(perPage);
        setPage(1);
    };

    useEffect(() => {
        const fetchUserTransactions = async () => {
            setLoading(true);
            try {
                const result = await get(
                    `/user-transactions-history?page=${page}&perPage=${perPageItem}`
                );
                setUserTranscations(result?.data || []);
                setTotalPages(result.lastPage);
            } catch (error) {
                console.error("Error fetching user transactions:", error);
            } finally {
                setLoading(false);
            }
        };

        // Fetch on initial load or when debounced search changes
        fetchUserTransactions();
    }, [page, perPageItem]); // Triggered initially and whenever debouncedSearch changes
    return (
        <>
            {detailModal && (
                <Popup open={true} closeIcon={true} onDialogClose={setDetailModal}>
                    <TransactionDetailPopup txHash={selectedTxHash} />
                </Popup>
            )}
            <div className="px-[10px] md:px-[60px] bg-background min-h-screen py-6">
                <div className="flex flex-col gap-[24px]">
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                        <div className="flex gap-4 items-center text-accent ">
                            <ArrowLeft
                                className="main-text cursor-pointer"
                                size={32}
                                onClick={() => history.go(-1)}
                            />
                            <h2 className=" text-xl md:text-2xl text-accent font-semibold">
                                Transaction History
                            </h2>
                        </div>
                    </div>

                    {/* Table with bottom-to-top animation */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }} // Start 50px below the final position
                        animate={{ opacity: 1, y: 0 }} // End at original position with full opacity
                        transition={{ duration: 0.5 }} // Transition duration of 0.5s
                    >
                        <Table
                            cols={transactionColumns}
                            data={userTranscations}
                            totalPages={totalPages}
                            page={page}
                            isPagination={true}
                            handlePageChange={handlePageChange}
                            handleRowsPerPageChange={handleRowsPerPageChange}
                            isTableLoading={loading}
                        />
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default TransactionHistoryPage;
