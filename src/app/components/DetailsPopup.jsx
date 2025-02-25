"use client";
import React, { useEffect, useState } from "react";
import Popup from "./Popup";
import TransactionConfirmation from "./TransactionConfirmation";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import { useApi } from "../hooks/useApi";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import useContract from "../hooks/useContract";

const DetailsPopup = ({ data, onClose, apiCall }) => {
    const { primaryWallet } = useDynamicContext();
    const { get, post } = useApi();
    const {  getSingnature } = useContract();

    const [propertyData, setPropertyData] = useState([]);
    const [isTransaction, setIsTransaction] = useState(false);
    const [transactionMessage, setTransactionMessage] = useState("Please wait...");
    const [loading, setLoading] = useState(false);

    const getPropertyDetails = async () => {
        try {
            setLoading(true);
            const result = await get(`put-on-sale-property-list?propertyId=${data.propertyId}&page=1&perPage=1000`);
            setPropertyData(result.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };


    const handleCancel = async (sellId) => {
        try {
            // const walletAddress = checkWalletAddress();
            // if (walletAddress) {
            //     return;
            // }
            setIsTransaction(true);
            setTransactionMessage("Waiting to cancel property");

            const cancelSharesMeta = await post("get-cancel-share-sale-meta", {
                userAddress: primaryWallet.address,
                sellId: sellId,
            });

            const buySignature = await getSingnature(cancelSharesMeta);

            const receiptCancel = await post("execute-trx", {
                userAddress: primaryWallet.address,
                signature: buySignature,
                trxData: cancelSharesMeta.trxData,
                functionName: "cancelProperty",
            });

            console.log("receiptCancel", receiptCancel);

            toast.success("Property Cancelled Successfully");
            setIsTransaction(false);
            setTransactionMessage("Please wait...");
            apiCall && apiCall();
            onClose();
        } catch (error) {
            setIsTransaction(false);
            setTransactionMessage("Please wait...");
            console.log(error);
        }
    };

    useEffect(() => {
        getPropertyDetails();
    }, []);

    return (
        <div>
            {isTransaction && (
                <Popup open={true} onDialogClose={() => setIsTransaction(false)}>
                    <TransactionConfirmation message={transactionMessage} isLoading={true} />
                </Popup>
            )}
            <div className="">
                <h2 className="text-lg font-bold mb-4 text-accent">Market Details</h2>
                <div className="overflow-x-auto rounded-[16px] table-content shadow-hover">
                    <table className="w-full !rounded-lg border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="px-6 py-4 text-accent text-xs font-medium main-text bg-accentshade tracking-wider table-th text-left">
                                    Sr No
                                </th>
                                <th className="px-6 py-4 text-accent text-xs font-medium main-text bg-accentshade tracking-wider table-th text-left">
                                    Name
                                </th>
                                <th className="px-6 py-4 text-accent text-xs font-medium main-text bg-accentshade tracking-wider table-th text-left">
                                    Shares
                                </th>
                                <th className="px-6 py-4 text-accent text-xs font-medium main-text bg-accentshade tracking-wider table-th text-left">
                                    Sell Shares
                                </th>
                                <th className="px-6 py-4 text-accent text-xs font-medium main-text bg-accentshade tracking-wider table-th text-left">
                                    Remaining Shares
                                </th>
                                <th className="px-6 py-4 text-accent text-xs font-medium main-text bg-accentshade tracking-wider table-th text-left">
                                    Amount/Share
                                </th>
                                <th className="px-6 py-4 text-accent text-xs font-medium main-text bg-accentshade tracking-wider table-th text-center">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-accent text-xs font-medium main-text bg-accentshade tracking-wider table-th text-center">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {loading
                                ? Array.from({ length: 5 }).map((_, idx) => (
                                      <tr key={idx}>
                                          <td className="px-6 py-4 border-t border-accent">
                                              <Skeleton width={20} />
                                          </td>
                                          <td className="px-6 py-4 border-t border-accent">
                                              <Skeleton width={120} />
                                          </td>
                                          <td className="px-6 py-4 border-t border-accent">
                                              <Skeleton width={120} />
                                          </td>
                                          <td className="px-6 py-4 border-t border-accent">
                                              <Skeleton width={120} />
                                          </td>
                                          <td className="px-6 py-4 border-t border-accent">
                                              <Skeleton width={60} />
                                          </td>
                                          <td className="px-6 py-4 border-t border-accent">
                                              <Skeleton width={80} />
                                          </td>
                                          <td className="px-6 py-4 border-t border-accent">
                                              <Skeleton width={100} />
                                          </td>
                                          <td className="px-6 py-4 border-t border-accent">
                                              <Skeleton width={60} />
                                          </td>
                                      </tr>
                                  ))
                                : propertyData.map((item, idx) => (
                                      <tr key={item.sellId}>
                                          <td className="px-6 py-4 border-t border-accent text-sm font-normal text-accent bg-contrast tracking-wider">
                                              {idx + 1}
                                          </td>
                                          <td className="px-6 py-4 border-t border-accent text-sm font-normal text-accent bg-contrast tracking-wider">
                                              {item.propertyName}
                                          </td>
                                          <td className="px-6 py-4 border-t border-accent text-sm font-normal text-accent bg-contrast tracking-wider">
                                              {item.share}
                                          </td>
                                          <td className="px-6 py-4 border-t border-accent text-sm font-normal text-accent bg-contrast tracking-wider">
                                              {item.sellShare}
                                          </td>
                                          <td className="px-6 py-4 border-t border-accent text-sm font-normal text-accent bg-contrast tracking-wider">
                                              {item.remainingShare}
                                          </td>
                                          <td className="px-6 py-4 border-t border-accent text-sm font-normal text-accent bg-contrast tracking-wider">
                                              {item.amountPerShare}
                                          </td>
                                          <td className="px-6 py-4 border-t border-accent text-sm font-normal text-accent bg-contrast tracking-wider">
                                              <button
                                                  className={`border ${
                                                      item.status === 0
                                                          ? "text-yellow-500 border-yellow-500"
                                                          : item.status === 1
                                                          ? "text-green-500 border-green-500"
                                                          : "text-red-500 border-red-500"
                                                  }  rounded-full px-3 text-center text-sm mx-auto`}
                                              >
                                                  {item.status === 0
                                                      ? "Awaiting Buyer"
                                                      : item.status === 1
                                                      ? "Sold Out"
                                                      : "Cancelled"}
                                              </button>
                                          </td>
                                          <td className="px-6 py-4 border-t border-accent text-sm font-normal text-accent bg-contrast tracking-wider">
                                              {item.status === 0 ? (
                                                  <button
                                                      onClick={() => handleCancel(item.sellId)}
                                                      className="underline text-default rounded-full px-3 py-1 text-center text-xs mx-auto"
                                                  >
                                                      Cancel
                                                  </button>
                                              ) : (
                                                  "--"
                                              )}
                                          </td>
                                      </tr>
                                  ))}
                            {!loading && propertyData.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="border p-2 text-center">
                                        No Data Found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DetailsPopup;
