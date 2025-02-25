"use client";
import React, { useEffect, useState } from "react";
import Table from "@/app/components/VTable";
import { ArrowLeft } from "lucide-react";
import { useApi } from "@/app/hooks/useApi";
import { formatDate } from "@/utils/formatDate";
import Link from "next/link";

function Page() {
    const [transactions, setTransactions] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [isTableLoading, setIsTableLoading] = useState(false);

    const { get } = useApi();

    const getTransactionData = async () => {
        try {
            setIsTableLoading(true);
            const response = await get(`/get-dividend-list?page=${page}&perPage=${perPage}`);
            setTransactions(response.data);
            setTotalPages(response.lastPage);
        } catch (error) {
        } finally {
            setIsTableLoading(false);
        }
    };

    const column = [
        {
            title: "ID",
            key: "id",
            render: (item, index) => <>{page * perPage - perPage + index + 1}</>,
        },
        {
            title: "Property Name",
            dataIndex: "propertyName",
            key: "propertyName",
            width: "20%",
            sortable: true,
        },
        {
            title: "Transaction Hash",
            key: "trxHash",
            render: (item) => (
                <Link
                    target="_blank"
                    href={`${process.env.NEXT_PUBLIC_EXPLORER_URL}tx/${item.trxHash}`}
                >
                    {item.trxHash.substring(0, 4) + "..." + item.trxHash.substring(62, 66)}
                </Link>
            ),
        },
        {
            title: "Amount",
            key: "amount",
            render: (item) => <>{item.amount}</>,
        },
        {
            title: "Date",
            key: "date",
            render: (item) => <>{formatDate(item.createdAt)}</>,
        },
    ];

    const handlePageChange = (event, value) => {
        setPage(value);
    };
    const handleRowsPerPageChange = (event) => {
        setPerPage(event);
        setPage(1);
    };

    useEffect(() => {
        getTransactionData();
    }, [page, perPage]);

    return (
        <div>
            <div className="bg-background min-h-screen px-[10px] md:px-[60px] py-[24px] flex flex-col gap-[24px]">
                <div className="flex justify-between flex-col md:flex-row md:items-center">
                    <div className="flex gap-4 items-center text-accent">
                        <ArrowLeft
                            className="main-text cursor-pointer"
                            size={32}
                            onClick={() => history.go(-1)}
                        />
                        <h2 className="main-text text-xl md:text-2xl py-3 md:py-0 font-bold text-accent">
                            Dividend
                        </h2>
                    </div>
                </div>
                <div>
                    <Table
                        cols={column}
                        data={transactions}
                        isTableLoading={isTableLoading}
                        totalPages={totalPages}
                        page={page}
                        handlePageChange={handlePageChange}
                        handleRowsPerPageChange={handleRowsPerPageChange}
                        isPagination={true}
                    />
                </div>
            </div>
        </div>
    );
}

export default Page;
