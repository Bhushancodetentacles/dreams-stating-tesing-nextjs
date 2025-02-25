import React from "react";
import Tooltip from "@mui/material/Tooltip";
import { polygon, polygonAmoy } from "viem/chains";
import { Link } from "lucide-react";

const ENV = process.env.NEXT_PUBLIC_ENV;

const TransactionHash = ({ txHash }) => {
    // Display the first 6 and last 6 characters of the txHash
    const displayTxHash = `${txHash.slice(0, 6)}...${txHash.slice(-6)}`;

    // Click handler to open transaction details in the blockchain explorer
    const handleClick = () => {
        window.open(
            ENV === "dev"
                ? polygonAmoy.blockExplorers.default.url + "/tx/" + txHash
                : polygon.blockExplorers.default.url + "/tx/" + txHash,
            "_blank"
        );
    };
    // const handleClick = () => {
    //     window.open(polygonAmoy.blockExplorers.default.url + "/tx/" + txHash, "_blank");
    // };

    return (
        <Tooltip title={txHash} arrow>
            {" "}
            <div className="cursor-pointer flex gap-1" onClick={handleClick}>
                {displayTxHash} <Link />
            </div>
        </Tooltip>
    );
};

export default TransactionHash;
