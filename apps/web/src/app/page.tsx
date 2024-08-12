"use client";

import { useReadErc20BalanceOf } from "@repo/contracts";
import { bsc } from "viem/chains";
import {
  useAccount,
  useConfig,
  useConnect,
  useDisconnect,
  serialize,
} from "wagmi";

/**
 * Uncomment `useConfig` to fix `WagmiProviderNotFoundError` error.
 */
function useBalance() {
  const { isConnected, address } = useAccount();
  // const config = useConfig();
  return useReadErc20BalanceOf({
    chainId: bsc.id,
    address: "0xA856098dCBc1b2B3a9C96C35c32bC4f71E49AEd2",
    args: isConnected ? [address] : [],
    account: isConnected ? address : undefined,
    // config,
  });
}

function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const balance = useBalance();

  return (
    <>
      <div>
        <h2>Account</h2>
        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>
        {account.status === "connected" && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>
      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type="button"
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{error?.message}</div>
      </div>
      <div>
        <h2>Balance</h2>
        <pre>
          <code>{serialize(balance, null, 2)}</code>
        </pre>
      </div>
    </>
  );
}

export default App;
