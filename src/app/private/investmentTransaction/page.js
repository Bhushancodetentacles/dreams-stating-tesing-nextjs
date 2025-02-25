"use client";
import Table from "@/app/components/VTable";
import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";

const InvestmentTransactionpage = () => {
  const transactionColumns = [
    { key: "id", title: "ID", sortable: true, width: "5%" },
    {
      key: "transactionHash",
      title: "Transaction Hash",
      sortable: true,
      width: "30%",
    },
    { key: "amount", title: "Amount", sortable: true, width: "15%" },
    { key: "date", title: "Date", sortable: true, width: "15%" },
    { key: "status", title: "Status", sortable: true, width: "15%" },
    { key: "action", title: "Action", sortable: true, width: "10%" },
  ];

  // Columns for Property Listing Table
  const propertyColumns = [
    { key: "id", title: "ID", sortable: true, width: "5%" },
    { key: "image", title: "Image", sortable: false, width: "10%" },
    { key: "name", title: "Name", sortable: true, width: "25%" },
    { key: "description", title: "Description", sortable: false, width: "10%" },
    { key: "earning", title: "Earning", sortable: true, width: "10%" },
    { key: "price", title: "Price", sortable: true, width: "10%" },
    { key: "quantity", title: "Quantity", sortable: true, width: "10%" },
    { key: "action", title: "Action", sortable: false, width: "20%" },
  ];

  const [transactionData] = useState([
    {
      id: 1,
      transactionHash: "0x123abc456def",
      type: "Credit",
      amount: "$500",
      date: "2024-11-19",
    },
    {
      id: 2,
      transactionHash: "0x789ghi101jkl",
      type: "Debit",
      amount: "$200",
      date: "2024-11-18",
    },
    {
      id: 3,
      transactionHash: "0x111mno222pqr",
      type: "Credit",
      amount: "$300",
      date: "2024-11-17",
    },
  ]);

  const [propertyData] = useState([
    {
      id: 1,
      image: "https://via.placeholder.com/50", // Example placeholder image URL
      name: "Luxury Apartment",
      description: "A beautiful luxury apartment in downtown.",
      earning: "$5000",
      price: "$300,000",
      quantity: "2",
      action: "Edit",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/50",
      name: "Beach House",
      description: "A serene beach house with ocean views.",
      earning: "$12000",
      price: "$1,200,000",
      quantity: "1",
      action: "Edit",
    },
  ]);

  const [page, setPage] = useState(1);
  const [totalPages] = useState(5);
  const [isTableLoading] = useState(false);

  // Handlers
  const handlePageChange = (event, value) => {
    setPage(value);
    console.log("Page changed to:", value);
  };

  const handleRowsPerPageChange = (value) => {
    console.log("Rows per page changed to:", value);
  };

  return (
    <div className="px-[10px] md:px-[60px] bg-background min-h-screen py-6">
      <div className="flex flex-col gap-[24px]">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="flex gap-4 items-center">
            <ArrowLeft
              className="main-text cursor-pointer"
              onClick={() => history.go(-1)}
            />
            <h2 className="main-text text-xl md:text-2xl font-semibold text-accent">
              Investment Transaction
            </h2>
          </div>

          <button className="flex items-center justify-center w-24 main-text border border-accent text-sm font-medium rounded-[8px] h-[36px]">
            Filter
          </button>
        </div>

        <div>
          <Table
            cols={transactionColumns}
            data={transactionData}
            totalPages={totalPages}
            page={page}
            handlePageChange={handlePageChange}
            handleRowsPerPageChange={handleRowsPerPageChange}
            isTableLoading={isTableLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default InvestmentTransactionpage;
