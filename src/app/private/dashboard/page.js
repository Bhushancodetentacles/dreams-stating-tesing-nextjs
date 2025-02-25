"use client";
import Table from "@/app/components/VTable";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { formatDate } from "@/utils/formatDate";
import ImageWithFallback from "@/app/components/ImageWithFallback ";
import { useApi } from "@/app/hooks/useApi";
import { Tooltip } from "@mui/material";
import Skeleton from "react-loading-skeleton";
import useDebounce from "@/utils/debounce";
import TransactionHash from "@/app/components/TranscationHash";
import Popup from "@/app/components/Popup";
import WithdrawalPoupup from "@/app/components/WithdrawalPoupup";

function DashboardPage() {
  const [loading, setLoading] = useState(false);
  const [transcationsLoading, setTranscationsLoading] = useState(false);
  const [propertiesLoading, setPropertiesLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState({});
  const [userTranscations, setUserTranscations] = useState([]);
  const [propertiesList, setPropertiesList] = useState([]);
  const { get } = useApi();
  // Using the custom debounce hook for the search value
  const [transactionSearch, setTransactionSearch] = useState(""); // State for transaction search query
  const [propertySearch, setPropertySearch] = useState(""); // State for property search query

  // Debounced search values for transactions and properties
  const debouncedTransactionSearch = useDebounce(transactionSearch, 500); // Debounce for transaction search
  const debouncedPropertySearch = useDebounce(propertySearch, 500); // Debounce for property search
  const [withdrawalModal, setWithdrawalModal] = useState(false);

  const [propertyIds, setPropertyIds] = useState([]);
  const [pendingDividends, setPendingDividends] = useState(0);
  const [refreshData, setRefreshData] = useState(false);
  const [ableToClaimAllDividend, setAbleToClaimAllDividend] = useState(false);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };



  // Columns for Transaction History Table
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
      width: "30%",
      sortable: true,
      render: (item) => <TransactionHash txHash={item.transactionHash} />,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: "15%",
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
      width: "35%",
      sortable: true,
      render: (item, index) => <span>{formatDate(item.date)}</span>,
    },
  ];

  // Columns for Property Listing Table
  const propertyColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "5%",
      sortable: true,
      render: (_, index) => <span>{index + 1}</span>,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: "10%",
      sortable: false,
      render: (property) => (
        <ImageWithFallback
          src={
            property.propertyImages?.length > 0 &&
            property.propertyImages[0].image
          }
          alt={property.propertyName}
          style={{ width: "30px", height: "30px", borderRadius: "100%" }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "propertyName",
      key: "propertyName",
      width: "15%",
      sortable: true,
    },
    {
      title: "Description",
      dataIndex: "propertyDescription",
      key: "propertyDescription",
      width: "20%",
      sortable: false,
      render: (property) => {
        const MAX_LENGTH = 50; // Limit the number of visible characters
        const shortDescription =
          property.propertyDescription.length > MAX_LENGTH
            ? `${property.propertyDescription.slice(0, MAX_LENGTH)}...`
            : property.propertyDescription;

        return (
          <Tooltip
            title={property.propertyDescription || "No description available"}
            arrow
          >
            <span>{shortDescription}</span>
          </Tooltip>
        );
      },
    },
    {
      title: "Monthly Interest",
      key: "monthlyInterest",
      width: "15%",
      sortable: true,
      render: (property) => (
        <span>${Number(property.monthlyInterest)?.toFixed(4)}</span>
      ),
    },

    {
      title: "Shares",
      dataIndex: "currentHolding",
      key: "currentHolding",
      width: "10%",
      sortable: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
      sortable: true,
      render: item => (
        <div>{item.isBurned ? "Burned" : "Active"}</div>
      )
    },
    {
      title: <div className="text-center">Action</div>,
      dataIndex: "action",
      key: "action",
      width: "20%",
      sortable: false,
      render: (item) => (
        <Link
          href={`/investor-property-details/${item.propertyId}`}
          className="w-max mx-auto px-4 py-2 main-text rounded-full flex items-center gap-1 justify-center transition duration-300  ease-in-out text-nowrap border-accent border"
          onClick={() => console.log(`Action: ${item.name}`)}
        >
          View Details <ChevronRight />
        </Link>
      ),
    },
  ];

  const handleTransactionSearchChange = (event) => {
    setTransactionSearch(event.target.value);
  };
  const handlePropertySearchChange = (event) => {
    setPropertySearch(event.target.value);
  };

  const [page, setPage] = useState(1);
  const [totalPages] = useState(5);

  // Handlers
  const handlePageChange = (event, value) => {
    setPage(value);
    console.log("Page changed to:", value);
  };

  const handleRowsPerPageChange = (value) => {
    console.log("Rows per page changed to:", value);
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const result = await get(`/investor-dashboard?page=1&perPage=1000`);
      setDashboardData(result);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch Dashboard Data
  useEffect(() => {
    fetchDashboardData();
  }, [refreshData]);

  // Fetch User Transactions based on debounced search, initially on load
  useEffect(() => {
    const fetchUserTransactions = async () => {
      setTranscationsLoading(true);
      try {
        const result = await get(
          `/user-transactions-history?page=1&perPage=5&search=${debouncedTransactionSearch}`
        );
        setUserTranscations(result?.data || []);
      } catch (error) {
        console.error("Error fetching user transactions:", error);
      } finally {
        setTranscationsLoading(false);
      }
    };

    fetchUserTransactions();
  }, [debouncedTransactionSearch, refreshData]); // Triggered initially and whenever debouncedSearch changes

  // Fetch Property Listings
  useEffect(() => {
    const fetchPropertyListing = async () => {
      setPropertiesLoading(true);
      try {
        const result = await get(
          `/buy-property-lists?page=1&perPage=5&search=${debouncedPropertySearch}`
        );
        setPropertiesList(result?.data || []);
      } catch (error) {
        console.error("Error fetching property listings:", error);
      } finally {
        setPropertiesLoading(false);
      }
    };

    fetchPropertyListing();
  }, [debouncedPropertySearch, refreshData]);

  useEffect(() => {
    const fetchAllDividends = async () => {
      try {
        const result = await get(`/get-own-property?page=1&perPage=1000`);
        setPropertyIds(result?.properties || []);
        setPendingDividends(result?.dividends || []);

        // Check if any dividend amount is greater than 0
        const hasDividendToClaim = result?.dividends?.some(
          (amount) => Number(amount) > 0
        );
        setAbleToClaimAllDividend(hasDividendToClaim);
      } catch (error) {
        console.error("Error fetching user property ids:", error);
      }
    };

    fetchAllDividends();
  }, [refreshData]); // Triggered initially and whenever debouncedSearch changes

  return (
    <>
      {withdrawalModal && (
        <Popup
          open={true}
          closeIcon={true}
          onDialogClose={() => setWithdrawalModal(false)}
        >
          <WithdrawalPoupup
            onClose={() => setWithdrawalModal(false)}
            callFn={() => setRefreshData((prev) => !prev)}
            amount={pendingDividends}
            propertyIdForWithdrawl={propertyIds}
          />
        </Popup>
      )}

      <motion.div
        initial="hidden"
        animate="visible"
        className="bg-background px-[10px] md:px-[60px] py-[24px] min-h-screen"
      >
        <motion.section
          id="portfolio"
          className="flex flex-col gap-[42px]"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="">
            <div className="flex flex-col gap-[24px]">
              <h2 className="text-xl md:text-2xl font-semibold main-text text-accent">
                Portfolio Overview
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-[25px] xl:gap-[65px]">
                <div className="card-grad bg-custom-gradient bg-cover bg-center text-accent shadow-hover rounded-[16px] flex flex-col justify-between gap-[24px] p-4 transform transition-all duration-300 ease-in-out hover:scale-100 md:hover:scale-105">
                  {loading ? (
                    <>
                      <div className="flex flex-col gap-2">
                        <Skeleton width={150} height={24} />
                        <div className="flex justify-between items-center">
                        </div>
                      </div>

                      <div className="flex flex-col justify-between">
                        <Skeleton width={100} height={36} />{" "}
                        <div className="flex justify-between gap-2">
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="main-text text-lg font-medium text-accent">
                        Total Portfolio Value
                      </h3>
                      <div className="flex justify-between items-center">
                        <p className="text-[36px] font-bold main-text">
                          $
                          {dashboardData?.portfolioValue?.toLocaleString() ||
                            "0"}
                        </p>
                        {/* <div className="flex flex-col items-end">
                          
                          <p className="text-xs font-normal text-accent">
                            +2.5% 
                          </p>
                        </div> */}
                      </div>
                    </>
                  )}
                </div>

                {/* Earnings Summary Card */}
                <div className="card-grad bg-custom-gradient bg-cover bg-center text-accent shadow-hover rounded-[16px] flex flex-col justify-between gap-[24px] p-4 transform transition-all duration-300 ease-in-out hover:scale-100 md:hover:scale-105">
                  {loading ? (
                    <>
                      {/* Skeleton for Title */}
                      <Skeleton width={150} height={24} />

                      {/* Skeleton for Earnings Summary */}
                      <div className="flex justify-between items-end">
                        <Skeleton width={100} height={36} />

                        {/* Skeleton for the list of earnings (Rental Income, Dividends, Other) */}
                        <div className="flex flex-col gap-2 items-end">
                          {/* <Skeleton width={180} height={16} /> */}
                          <Skeleton width={180} height={16} />
                          {/* <Skeleton width={180} height={16} /> */}
                        </div>
                      </div>

                      {/* Skeleton for the "View Details" Button */}
                      <div className="flex justify-end items-center">
                      <Skeleton width={100} height={24} />
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Actual Content After Data is Loaded */}
                      <h3 className="main-text text-lg font-medium text-accent">
                        Earnings Summary
                      </h3>
                      <div className="flex justify-between items-center">
                        <p className="text-[36px] font-bold main-text">
                          $
                          {dashboardData?.earningSummary?.toLocaleString() ||
                            "0"}
                        </p>
                        <div className="flex flex-col gap-2 items-end">
                          {/* <p className="flex items-center gap-1 main-text font-normal text-sm">
                            Rental Income: $
                            {dashboardData?.rentalIncome?.toLocaleString() ||
                              "0"}
                          </p> */}
                          <p className="flex items-center gap-1 main-text font-normal text-sm">
                            Claimed Dividends: $
                            {dashboardData?.dividends?.toLocaleString() || "0"}
                          </p>
                          {/* <p className="flex items-center gap-1 main-text font-normal text-sm">
                            Other: $
                            {dashboardData?.other?.toLocaleString() || "0"}
                          </p> */}
                        </div>
                      </div>

                      <Link
                        href="/dividends"
                        className="ms-auto text-contrast bg-accent hover:text-contrast px-3 py-1 text-[12px] rounded-[6px] border-2 border-accent font-medium"
                      >
                        View Details
                      </Link>
                    </>
                  )}
                </div>

                <div className="card-grad bg-custom-gradient bg-cover bg-center text-accent shadow-hover rounded-[16px] flex flex-col justify-between gap-[15px] p-4 transform transition-all duration-300 ease-in-out hover:scale-100 md:hover:scale-105">
                  {loading ? (
                    <>
                      {/* Skeleton for Title */}
                      <div className="flex items-center gap-5 justify-end">
                        <Skeleton width={100} height={32} />
                        <Skeleton width={120} height={32} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Skeleton width={100} height={24} />

                        <Skeleton width={120} height={32} />
                      </div>
                      <div className="flex items-center justify-between">
                        <Skeleton width={250} height={24} />

                        <Skeleton width={120} height={32} />
                      </div>
                      {/* Skeleton for Buttons */}
                      <div className="flex justify-end items-center">
                        <Skeleton width={100} height={32} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex flex-col gap-4">
                        <div className="flex flex-row lg:flex-col xl:flex-row items-center justify-end">

                          <button
                            disabled={!ableToClaimAllDividend}
                            onClick={() => {
                              ableToClaimAllDividend
                                ? setWithdrawalModal(true)
                                : undefined;
                            }}
                            className={`me-5  ${!ableToClaimAllDividend
                              ? " bg-transparent border text-grey border-grey "
                              : "bg-accent text-white "
                              } border-accent border px-3 py-1 text-[12px] rounded-[6px] mt-[10px] font-medium`}
                          >
                            Withdrawal
                          </button>

                          <Link href="/all-property-dividends">
                            <button className="me-auto text-contrast bg-accent hover:text-contrast px-3 py-1 text-[12px] border border-accent rounded-[6px] mt-[10px] font-medium">
                              All Properties Dividends Details
                            </button>
                          </Link>
                        </div>
                        {/* Actual Content Once Data is Loaded */}
                        <div className="flex flex-col gap-4">
                          <div className="flex items-center justify-between">
                            <h3 className="main-text text-lg font-medium text-accent">
                              Total Dividends :
                            </h3>{" "}
                            <p className="text-[24px] font-bold main-text">
                              ${dashboardData?.dividendsPerSecond?.toFixed(6) || "0"}
                            </p>

                          </div>
                          <div className="flex items-center justify-between gap-1 main-text font-normal text-sm">
                            <p className="main-text text-sm font-normal text-accent"> Dividends Available For Withdrawal : </p>
                            <p className="text-lg md:text-2xl font-bold main-text">
                              $
                              {dashboardData?.availableToWithdrawal?.toFixed(6) ||
                                "0"}
                            </p>
                          </div>
                        </div>

                        <Link href="/dividends" className="flex items-center justify-end">
                          <button className="text-nowrap text-contrast bg-accent hover:text-contrast px-3 py-1 text-[12px] border border-accent rounded-[6px] mt-[10px] font-medium">
                            View Details
                          </button>
                        </Link>
                      </div>

                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div className="flex flex-col gap-[24px]">
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <h2 className="main-text text-xl md:text-2xl text-accent font-semibold">
                Transaction History
              </h2>
              <input
                type="text"
                placeholder="Transaction Hash"
                value={transactionSearch}
                onChange={handleTransactionSearchChange}
                className="main-text font-medium text-sm border border-accent rounded-[8px] p-3 w-[267px] bg-transparent outline-none text-accent"
              />
            </div>
            <div>
              <Table
                cols={transactionColumns}
                data={userTranscations}
                totalPages={totalPages}
                isPagination={false}
                page={page}
                handlePageChange={handlePageChange}
                handleRowsPerPageChange={handleRowsPerPageChange}
                isTableLoading={transcationsLoading}
              />
            </div>
          </div>

          {/* Property Listing */}
          <div className="flex flex-col gap-[24px]">
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <h2 className="main-text text-xl md:text-2xl text-accent font-semibold">
                Your Current Portfolio
              </h2>
              <input
                type="text"
                placeholder="Property Name"
                className="main-text font-medium text-sm border border-accent rounded-[8px] p-3 w-[267px] bg-transparent outline-none text-accent"
                value={propertySearch}
                onChange={handlePropertySearchChange}
              />
            </div>
            <div>
              <Table
                cols={propertyColumns}
                data={propertiesList}
                totalPages={totalPages}
                page={page}
                handlePageChange={handlePageChange}
                handleRowsPerPageChange={handleRowsPerPageChange}
                isTableLoading={propertiesLoading}
              />
            </div>
          </div>
        </motion.section>
      </motion.div>
    </>
  );
}

export default DashboardPage;
