import { polygon, polygonAmoy } from "viem/chains";

export const networkRpc = (chainId) => {
  return chainId == 80002
    ? polygonAmoy.rpcUrls.default.http[0]
    : polygon.rpcUrls.default.http[0];
};
