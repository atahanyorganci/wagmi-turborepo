import { http, cookieStorage, createConfig, createStorage } from "wagmi";
import { bsc, mainnet, sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";

export function getConfig() {
  return createConfig({
    chains: [mainnet, sepolia, bsc],
    connectors: [injected()],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
      [bsc.id]: http(),
    },
  });
}
