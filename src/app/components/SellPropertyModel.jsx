import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { blockConfig } from "@/config/BlockChainConfig";
import toast from "react-hot-toast";
import Popup from "./Popup";
import TransactionConfirmation from "./TransactionConfirmation";
import useContract from "../hooks/useContract";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useApi } from "../hooks/useApi";

function SellPropertyModel({ data, apiCall, onClose }) {
    const { primaryWallet } = useDynamicContext();
    const { propertyContract, chainId, getSingnature } = useContract();
    const [transactionMessage, setTransactionMessage] = useState("Please wait...");
    const [isTransaction, setIsTransaction] = useState(false);
    const { post } = useApi();

    // Formik setup
    const formik = useFormik({
        initialValues: {
            shares: "",
            pricePerShare: "",
        },
        validationSchema: Yup.object({
            shares: Yup.number()
                .required("Number of shares is required")
                .min(1, "Shares must be at least 1")
                .max(
                    data?.currentHolding,
                    `Shares cannot exceed the available shares (${data?.currentHolding})`
                ),
            //price per share allow decimals
            pricePerShare: Yup.number().required("Price per share is required"),
        }),
        onSubmit: (values) => {
            console.log("Form Submitted:", values);
            // Handle property purchase logic here
            handleSellProperty();
        },
    });


    const handleSellProperty = async () => {
        try {
            setIsTransaction(true);
            setTransactionMessage("Checking Approval");
            const allowance = await checkAllowance();

            if (!allowance) {
                const approvalMeta = await post("get-property-approval-meta", {
                    userAddress: primaryWallet.address,
                });

                const signatureApproval = await getSingnature(approvalMeta);

                await post("execute-trx", {
                    userAddress: primaryWallet.address,
                    signature: signatureApproval,
                    trxData: approvalMeta.trxData,
                    functionName: "setApprovalForAll",
                });
            }

            setTransactionMessage("Selling Property Shares");
            const sellSharesMeta = await post("get-put-on-sale-meta", {
                userAddress: primaryWallet.address,
                propertyId: data?.propertyId,
                shares: formik.values.shares,
                pricePerShare: formik.values.pricePerShare,
            });

            const sellSignature = await getSingnature(sellSharesMeta);

            const receiptSell = await post("execute-trx", {
                userAddress: primaryWallet.address,
                signature: sellSignature,
                trxData: sellSharesMeta.trxData,
                functionName: "sellProperty",
            });
            console.log(receiptSell);

            toast.success("Property Tokens Added to Sell Successfully");
            setIsTransaction(false);
            setTransactionMessage("Please wait...");
            apiCall && apiCall();
            onClose && onClose();
        } catch (error) {
            setIsTransaction(false);
            onClose();
            setTransactionMessage("Please wait...");
            console.log(error);
        }
    };

    const checkAllowance = async () => {
        try {
            const allowance = await propertyContract.isApprovedForAll(
                primaryWallet.address,
                blockConfig[chainId].PROPERTY_LAUNCHPAD_CONTRACT_ADDRESS
            );

            return allowance;
        } catch (error) {
            return false;
        }
    };

    return (
        <>
            {isTransaction && (
                <Popup open={true} onDialogClose={() => setIsTransaction(false)}>
                    <TransactionConfirmation message={transactionMessage} isLoading={true} />
                </Popup>
            )}
            <div className="w-full lg:min-w-[40rem] mx-auto">
                <h2 className="text-xl font-bold mb-4  text-accent">Sell Property Tokens</h2>
                <div className="">
                    <p className="text-default font-semibold text-base mb-2">
                        Shares Tokens: {data?.currentHolding}
                    </p>
                    <form onSubmit={formik.handleSubmit} className="space-y-4">
                        <div>
                            <label
                                htmlFor="shares"
                                className="block text-sm font-normal text-accent "
                            ></label>
                            <input
                                id="shares"
                                name="shares"
                                type="number"
                                placeholder={`Enter number of shares.`}
                                value={formik.values.shares}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-accent ${
                                    formik.touched.shares && formik.errors.shares
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                            />
                            {formik.touched.shares && formik.errors.shares ? (
                                <p className="mt-1 text-sm text-red-500">{formik.errors.shares}</p>
                            ) : null}
                        </div>
                        <div>
                            <label
                                htmlFor="pricePerShare"
                                className="block text-sm font-normal text-accent "
                            ></label>
                            <input
                                id="pricePerShare"
                                name="pricePerShare"
                                type="number"
                                placeholder={`Enter Price Per Share.`}
                                value={formik.values.pricePerShare}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-accent ${
                                    formik.touched.pricePerShare && formik.errors.pricePerShare
                                        ? "border-red-500"
                                        : "border-gray-300"
                                }`}
                            />
                            {formik.touched.pricePerShare && formik.errors.pricePerShare ? (
                                <p className="mt-1 text-sm text-red-500">
                                    {formik.errors.pricePerShare}
                                </p>
                            ) : null}
                        </div>
                        {/* {isConnected ? ( */}
                        {true ? (
                            <button
                                type="submit"
                                className="w-full bg-accent text-white px-6 py-3 rounded-lg shadow-md hover:bg-contrast border hover:text-accent hover:border-accent hover:border hover:font-bold border-transparent transition duration-300"
                                >
                                Sell
                            </button>
                        ) : (
                            <div className="border border-accent py-2 px-6 rounded-full w-max">
                                {/* <ConnectButton className="text-white"/> */}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </>
    );
}

export default SellPropertyModel;
