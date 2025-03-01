import PROPERTY_LAUNCHPAD_ABI from "@/interface/propertyLaunchpad.abi.json";
import PROPERTY_MARKET_PLACE_ABI from "@/interface/propertyMarketPlace.abi.json";
import ERC1155_ABI from "@/interface/ERC1155.abi.json";
import ERC20_ABI from "@/interface/ERC20.abi.json";
// This is the configuration for the Blockchain network.
const config = {
    prod: {

        137: {
            PROPERTY_LAUNCHPAD_CONTRACT_ADDRESS: "0xfF665E9919De31288b11AdA205278F9c96140c73",
            PROPERTY_LAUNCHPAD_ABI: PROPERTY_LAUNCHPAD_ABI,
            PROPERTY_MARKET_PLACE_CONTRACT_ADDRESS: "0x9cE73Fa34445505386A4abAA89bF9d8c5c9B437C",
            PROPERTY_MARKET_PLACE_ABI: PROPERTY_MARKET_PLACE_ABI,
            USDT_TOKEN_ADDRESS: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
            ERC1155_ABI: ERC1155_ABI,
            ERC1155_CONTRACT_ADDRESS: "0xB75ee47a4f0e6eaC66d9701C83c1B8073c9EF89A",
            ERC20_ABI: ERC20_ABI,
        },
    },
    dev: {
        80002: {
            PROPERTY_LAUNCHPAD_CONTRACT_ADDRESS: "0x82b0c9711b358E946604ACf3Ae2733B751bf66a8",
            PROPERTY_LAUNCHPAD_ABI: PROPERTY_LAUNCHPAD_ABI,
            PROPERTY_MARKET_PLACE_CONTRACT_ADDRESS: "0x7Ade44231C0116545F42d4C2c26F8caa0674dac6",
            PROPERTY_MARKET_PLACE_ABI: PROPERTY_MARKET_PLACE_ABI,
            USDT_TOKEN_ADDRESS: "0xc93Ab356CA769Dd9f97412c13fB4982CDE551F36",
            ERC1155_ABI: ERC1155_ABI,
            ERC1155_CONTRACT_ADDRESS: "0x8e96Fc0d79A450FF178A1050C2c80eF599c194D6",
            ERC20_ABI: ERC20_ABI,
        },
    },
    
};

export const blockConfig = config[process.env.NEXT_PUBLIC_ENV];