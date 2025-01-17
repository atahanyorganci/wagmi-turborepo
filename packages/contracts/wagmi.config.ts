import { defineConfig } from "@wagmi/cli";
import { actions, react } from "@wagmi/cli/plugins";
import { erc20Abi } from "viem";

export default defineConfig({
  out: "contracts.ts",
  contracts: [{ name: "erc20", abi: erc20Abi }],
  plugins: [react(), actions()],
});
