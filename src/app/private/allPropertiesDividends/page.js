"use client";
import React, { useEffect, useState } from "react";
import Table from "@/app/components/VTable";
import { ArrowLeft, Wallet } from "lucide-react";
import { useApi } from "@/app/hooks/useApi";
import Popup from "@/app/components/Popup";
import WithdrawalPoupup from "@/app/components/WithdrawalPoupup";

function Page() {
    const { get } = useApi();

    // Dividends listings states starts

    const [dividendsLoading, setDividendsLoading] = useState(false);
    const [userPropertyDividends, setUserPropertyDividends] = useState([]);
    const [dividendsPage, setDividendsPage] = useState(1);
    const [dividendsPerPage, setDividendsPerPage] = useState(10);
    const [totalDividendsPages, setTotalDividendsPages] = useState(1);
    const [withdrawlAmount, setWithdrawlAmount] = useState();
    const [refreshData, setRefreshData] = useState(false);
    const [propertyIdForWithdrawl, setPropertyIdForWithdrawl] = useState("");
    const [withdrawalModal, setWithdrawalModal] = useState(false);

    // Handlers
    const handleDividendsPageChange = (event, value) => {
        setDividendsPage(value);
        console.log("Dividends Page changed to:", value);
    };

    const handleDividendsRowsPerPageChange = (value) => {
        setDividendsPerPage(value);
        console.log("Rows per dividends Page changed to:", value);
    };

    // Columns for Property Dividends Listing Table
    const dividendsColumns = [
        {
            title: "Sr.No.",
            dataIndex: "id",
            key: "id",
            width: "5%",
            sortable: true,
            render: (item, index) => <>{dividendsPage * dividendsPerPage - dividendsPerPage + index + 1}</>,
        },

        {
            title: "Name",
            dataIndex: "propertyName",
            key: "propertyName",
            width: "20%",
            sortable: true,
        },

  
        {
            title: "Property Type",
            dataIndex: "propertyType",
            key: "propertyType",
            width: "15%",
            sortable: true,
        },
        {
            title: "Purchased Date",
            dataIndex: "startDate",
            key: "startDate",
            width: "15%",
            sortable: true,
            render: (property) => (
                <span>{new Date(property.startDate * 1000).toLocaleDateString()}</span>
            ),
        },
        {
            title: "Withdrawal Date",
            dataIndex: "withdrawalDate",
            key: "withdrawalDate",
            width: "15%",
            sortable: true,
            render: (property) => (
                <span>{new Date(property.withdrawalDate * 1000).toLocaleDateString()}</span>
            ),
        },

        {
            title: "Total Dividend",
            key: "dividend",
            width: "15%",
            sortable: true,
            render: (property) => <span>${Number(property.dividend)?.toFixed(4)}</span>,
        },
        {
            title: "Dividend Available For Withdrawl",
            key: "dividend",
            width: "15%",
            sortable: true,
            render: (property) => (
                <span>${Number(property.totalWithdrawalAmount)?.toFixed(4)}</span>
            ),
        },
        {
            title: <div className="text-center">Action</div>,
            dataIndex: "action",
            key: "action",
            width: "15%",
            sortable: false,
            render: (property) => {
                const isDisabled = Number(property.totalWithdrawalAmount) <= 0;

                return (
                    <div
                        className={`mx-auto w-max px-4 py-2 main-text rounded-full text-sm flex items-center gap-1 justify-center transition duration-300 ease-in-out text-nowrap border-accent border ${
                            isDisabled
                                ? "bg-transparent text-gray-400 cursor-not-allowed"
                                : "bg-accent text-white cursor-pointer"
                        }`}
                        onClick={() => {
                            if (!isDisabled) {
                                setWithdrawalModal(true);
                                setWithdrawlAmount(Number(property.totalWithdrawalAmount));
                                setPropertyIdForWithdrawl(property.propertyId);
                            }
                        }}
                    >
                        Withdraw <Wallet size={15} />
                    </div>
                );
            },
        },
    ];

    // Dividends listings states end

    // Fetch User Divinds History
    useEffect(() => {
        const fetchUserDividends = async () => {
            setDividendsLoading(true);
            try {
                const result = await get(
                    `/user-property-supply-details?page=${dividendsPage}&perPage=${dividendsPerPage}`
                );
                setTotalDividendsPages(result?.lastPage || []);
                setUserPropertyDividends(result?.data || []);
            } catch (error) {
                console.error("Error fetching user dividends:", error);
            } finally {
                setDividendsLoading(false);
            }
        };

        fetchUserDividends();
    }, [dividendsPage, dividendsPerPage, refreshData]); // Triggered initially and whenever debouncedSearch changes

    return (
        <>
            {withdrawalModal && (
                <Popup open={true} closeIcon={true} onDialogClose={() => setWithdrawalModal(false)}>
                    <WithdrawalPoupup
                        onClose={() => setWithdrawalModal(false)}
                        callFn={() => setRefreshData((prev) => !prev)}
                        amount={[withdrawlAmount]}
                        propertyIdForWithdrawl={[propertyIdForWithdrawl]}
                    />
                </Popup>
            )}

            <div className="bg-background min-h-screen px-[10px] md:px-[60px] py-[24px] flex flex-col gap-[24px]">
                <div className="flex justify-between flex-col md:flex-row md:items-center">
                    <div className="flex gap-4 items-center text-accent">
                        <ArrowLeft
                            className="main-text cursor-pointer"
                            size={32}
                            onClick={() => history.go(-1)}
                        />
                        <h2 className="main-text text-xl md:text-2xl py-3 md:py-0 font-bold text-accent">
                           All Property Dividends
                        </h2>
                    </div>
                </div>
                <div>
                    <Table
                        cols={dividendsColumns}
                        data={userPropertyDividends}
                        totalPages={totalDividendsPages}
                        isPagination={totalDividendsPages > 1}
                        page={dividendsPage}
                        handlePageChange={handleDividendsPageChange}
                        handleRowsPerPageChange={handleDividendsRowsPerPageChange}
                        isTableLoading={dividendsLoading}
                    />
                    <p className="mt-6 text-center sm:text-end text-[#e46868] font-medium">Dividents for Bridging Facility Investments cannot be Withdrawal until the Withdrawal fate</p>
                </div>
            </div>
        </>
    );
}

export default Page;
