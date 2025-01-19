import React from "react";
 
import { sepolia } from "@starknet-react/chains";
import {
  StarknetConfig,
  argent,
  braavos,
  useInjectedConnectors,
  voyager,
  jsonRpcProvider
} from "@starknet-react/core";

 
export function StarknetProvider({ children }: { children: React.ReactNode }) {

  const { connectors } = useInjectedConnectors({
    recommended: [
      argent(),
      braavos(),
    ],
    includeRecommended: "onlyIfNoConnectors",
    order: "random"
  });
 
 
  return (
    <StarknetConfig
      chains={[sepolia]}
      provider={jsonRpcProvider({rpc: () => ({nodeUrl: process.env.VITE_RPC_URL }) })}
      connectors={connectors}
      explorer={voyager}
    >
      {children}
    </StarknetConfig>
  );
}