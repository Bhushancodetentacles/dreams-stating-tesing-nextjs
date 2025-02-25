import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { blockConfig } from "@/config/BlockChainConfig";
import Popup from "./Popup";
import TransactionConfirmation from "./TransactionConfirmation";
import { useApi } from "../hooks/useApi";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import toast from "react-hot-toast";
import useContract from "../hooks/useContract";
import { parseUnits } from "ethers";

const fakeDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Usage example:
async function someFunction() {
    console.log("Start");
    await fakeDelay(5000); // 2 seconds delay
    console.log("End after 2 seconds");
}


function BuyPropertyModel({ data, apiCall, onClose }) {
  const [valueInUSDT, setValueInUSDT] = useState(0);
  const { primaryWallet } = useDynamicContext();
  const [transactionMessage, setTransactionMessage] = useState("Please wait...");
  const [isTransaction, setIsTransaction] = useState(false);
  const { post } = useApi();
  const { tokenContract,chainId, getSingnature } = useContract();
  // Formik setup
  const formik = useFormik({
    initialValues: {
      shares: "",
    },
    validationSchema: Yup.object({
      shares: Yup.number()
        .required("Number of shares is required")
        .min(1, "Shares must be at least 1")
        .max(
          data?.availableToken,
          `Shares cannot exceed the available shares (${data?.availableToken})`
        )
        .integer("Decimals are not allowed. Please enter a whole number."), // Ensures the value is an integer
    }),
    onSubmit: (values) => {
      console.log("Form Submitted:", values);
      // Handle property purchase logic here
      handleBuyProperty();
    },
  });

  const checkTokenBalance = async () => {
    try {
      const tokenBalance = await tokenContract.balanceOf(primaryWallet.address);
      return tokenBalance
    } catch (error) {
      console.log(error);
      return 0
    }
  };

  const checkAllowance = async () => {
    try {
      const tokenBalance = await tokenContract.allowance(primaryWallet.address, blockConfig[chainId].PROPERTY_LAUNCHPAD_CONTRACT_ADDRESS);
      return tokenBalance
    } catch (error) {
      console.log(error);
      return 0
    }
  };

  const handleBuyProperty = async () => {
    try {
      
      setIsTransaction(true);
      const tokenBalance = await checkTokenBalance();
      const allowance = await checkAllowance();
      const pricePerShare = formik.values.shares * data?.pricePerToken;
      if (tokenBalance < parseUnits(pricePerShare.toString(), 6)) {
        setIsTransaction(false);
        return toast.error("Insufficient balance");
      }
      if (allowance < parseUnits(pricePerShare.toString(), 6)) {
        setTransactionMessage("Approving USDT Token for Purchase");

        const approvalMeta = await post("get-transaction-meta", {
          userAddress: primaryWallet.address,
          pricePerShare: pricePerShare,
        });

        const signatureApproval = await getSingnature(approvalMeta);
        
        const receipt = await post("execute-trx", {
          userAddress: primaryWallet.address,
          signature: signatureApproval,
          trxData: approvalMeta.trxData,
          functionName: "approve",
        });
        console.log(receipt);
      }

      
      setTransactionMessage("Purchasing Property Shares");
     
      const buySharesMeta = await post("get-buy-shares-meta", {
        userAddress: primaryWallet.address,
        propertyId: data?.propertyId,
        shares: formik.values.shares,
      });

      const buySignature = await getSingnature(buySharesMeta);

      const receiptBuy = await post("execute-trx", {
        userAddress: primaryWallet.address,
        signature: buySignature,
        trxData: buySharesMeta.trxData,
        functionName: "buyPropertyShares",
      });
      
      await someFunction();


      console.log(receiptBuy);
      setIsTransaction(false);
      toast.success("Property Purchased Successfully");
      setTransactionMessage("Please wait...");
      apiCall && apiCall();
      onClose && onClose();
    } catch (error) {
      setIsTransaction(false);
      onClose();
      setTransactionMessage("Please wait...");
      console.log(error);
      //   toast.error(error.message);
    }
  };



  const handleSharesChange = (e) => {
    const shares = parseInt(e.target.value, 10) || 0; // Fallback to 0 if input is invalid
    formik.handleChange(e); // Update Formik values
    setValueInUSDT(shares * data?.pricePerToken); // Calculate value in USDT
  };

  return (
    <>
      {isTransaction && (
        <Popup open={true} onDialogClose={() => setIsTransaction(false)}>
          <TransactionConfirmation
            message={transactionMessage}
            isLoading={true}
          />
        </Popup>
      )}
      <div className="w-full lg:min-w-[40rem] mx-auto">
        <h2 className="text-xl font-bold mb-4  text-accent">Buy Property</h2>
        <div className="">
          <p className="text-accent font-semibold text-lg mb-4">
            Available Shares: {data?.availableToken}
          </p>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="flex gap-5">
              <div className="w-1/2">
                <label
                  htmlFor="shares"
                  className="block text-sm font-normal text-accent "
                >
                  Enter Shares to Buy
                </label>
                <input
                  id="shares"
                  name="shares"
                  type="number"
                  placeholder={`Enter number of shares.`}
                  value={formik.values.shares}
                  onChange={handleSharesChange}
                  onBlur={formik.handleBlur}
                  className={`mt-1 block w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-accent ${
                    formik.touched.shares && formik.errors.shares
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {formik.touched.shares && formik.errors.shares ? (
                  <p className="mt-1 text-sm text-red-500">
                    {formik.errors.shares}
                  </p>
                ) : null}
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="usdtValue"
                  className="block text-sm font-normal text-accent "
                >
                  Value In USDT
                </label>
                <input
                  id="usdtValue"
                  disabled
                  type="number"
                  placeholder={`Value in USDT`}
                  value={valueInUSDT}
                  className={`mt-1 block bg-slate-200 w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-accent ${
                    formik.touched.shares && formik.errors.shares
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
              </div>
            </div>
            {primaryWallet && (
              <button
                type="submit"
                className="w-full bg-accent text-white px-6 py-3 rounded-lg shadow-md hover:bg-contrast border hover:text-accent hover:border-accent hover:border hover:font-bold border-transparent transition duration-300"
              >
                Buy
              </button>
            )}
            {/* <div className="bg-accent connect-btn text-white px-6 py-3 flex items-center justify-center rounded-lg shadow-md hover:bg-contrast border hover:text-accent hover:border-accent hover:border hover:font-bold border-transparent transition duration-300">
             </div> */}
          </form>
        </div>
      </div>
    </>
  );
}

export default BuyPropertyModel;
