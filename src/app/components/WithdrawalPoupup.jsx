// import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useState } from "react";

import Popup from "./Popup";
import TransactionConfirmation from "./TransactionConfirmation";
import toast from "react-hot-toast";
import { useApi } from "../hooks/useApi";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import useContract from "../hooks/useContract";

function WithdrawalPoupup({ amount, onClose, callFn, propertyIdForWithdrawl }) {
    const { primaryWallet } = useDynamicContext();
    const {  post } = useApi();
    const { getSingnature } = useContract();
    const [transactionMessage, setTransactionMessage] = useState("Please wait...");
    const [isTransaction, setIsTransaction] = useState(false);

    //  Calculate the amount based on isAllWithdrawal
    const amountToShow = amount.reduce((acc, value) => acc + value, 0);

    const handleSubmit = async () => {
        const amountInArray = amount;
        const propertyIdInArray = propertyIdForWithdrawl;

        try {
            setIsTransaction(true);
            setTransactionMessage("Transaction in progress...");

            const claimSharesMeta = await post("get-claim-dividend-meta", {
                userAddress: primaryWallet.address,
                propertyIds: propertyIdInArray,
                amount: amountInArray,
            });

            const claimSignature = await getSingnature(claimSharesMeta);

             await post("execute-trx", {
                userAddress: primaryWallet.address,
                signature: claimSignature,
                trxData: claimSharesMeta.trxData,
                functionName: "claimDividends",
            });

            toast.success("Claimed successfully.");
            setIsTransaction(false);
            onClose && onClose();
            callFn && callFn();
        } catch (error) {
            setIsTransaction(false);
            onClose();
        }
    };

    return (
        <>
            {isTransaction && (
                <Popup open={true} onDialogClose={() => setIsTransaction(false)}>
                    <TransactionConfirmation message={transactionMessage} isLoading={true} />
                </Popup>
            )}
            <div className="w-full lg:min-w-[40rem] mx-auto ">
                <div className="rounded-lg overflow-hidden">
                    <p className="text-accent font-semibold text-lg mb-1 p-1">Amount:</p>
                    <form className="space-y-4">
                        <div>
                            <input
                                id="shares"
                                name="shares"
                                type="number"
                                value={Number(amountToShow)?.toFixed(4)}
                                disabled
                                placeholder={`Enter Amount For Claim.`}
                                className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-accent"
                            />
                        </div>

                        <button
                            type="submit"
                            onClick={handleSubmit}
                            disabled={isTransaction}
                            className="w-full bg-accent text-white px-6 py-3 rounded-lg shadow-md hover:bg-contrast border hover:text-accent hover:border-accent hover:border hover:font-bold border-transparent transition duration-300"
                        >
                            Claim
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default WithdrawalPoupup;
