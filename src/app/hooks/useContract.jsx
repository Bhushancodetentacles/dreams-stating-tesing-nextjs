"use client";

import { blockConfig } from "@/config/BlockChainConfig";
import { getWeb3Provider } from "@dynamic-labs/ethers-v6";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { Contract } from "ethers";
import { useEffect, useState } from "react";
import { getSigner } from "@dynamic-labs/ethers-v6";

function useContract() {
  const [tokenContract, setTokenContract] = useState(null);
  const [propertyContract, setPropertyContract] = useState(null);
  const [launchPadContract, setLaunchPadContract] = useState(null);
  const [marketPlaceContract, setMarketPlaceContract] = useState(null);
  const {primaryWallet} = useDynamicContext()
  const [chainId,setChainId] = useState(null)
  
    const getSingnature = async (metaData) => {
      try {
        const singer = await getSigner(primaryWallet);
        const signature = await singer.signTypedData(
          metaData.domain,
          metaData.types,
          metaData.message
        );
        return signature;
      } catch (error) {
        throw error;
      }
    };
  
    const contractSetupCall = async () => {
      try {
        if(!primaryWallet) return
        const network = await primaryWallet.getNetwork()
        setChainId(network)
        const provider = await getWeb3Provider(primaryWallet)
        const tokenInstance = new Contract(blockConfig[network].USDT_TOKEN_ADDRESS,blockConfig[network].ERC20_ABI,provider)
        const erc1155Instance = new Contract(blockConfig[network].ERC1155_CONTRACT_ADDRESS,blockConfig[network].ERC1155_ABI,provider)
        const marketPlaceInstance = new Contract(blockConfig[network].PROPERTY_MARKET_PLACE_CONTRACT_ADDRESS,blockConfig[network].PROPERTY_MARKET_PLACE_ABI,provider)
        const launchPadInstance = new Contract(blockConfig[network].PROPERTY_LAUNCHPAD_CONTRACT_ADDRESS,blockConfig[network].PROPERTY_LAUNCHPAD_ABI,provider)
        setLaunchPadContract(launchPadInstance)
        setMarketPlaceContract(marketPlaceInstance)
        setPropertyContract(erc1155Instance)
        setTokenContract(tokenInstance)
      } catch (error) {
        console.log(error);
      }
    }
    
  useEffect(() => {
    contractSetupCall ()
  }, [primaryWallet]);

  return {
    tokenContract,
    propertyContract,
    marketPlaceContract,
    launchPadContract,
    chainId,
    getSingnature
  };
}

export default useContract;
