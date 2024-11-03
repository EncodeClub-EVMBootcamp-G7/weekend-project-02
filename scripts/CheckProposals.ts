import {
  createPublicClient,
  http,
  createWalletClient,
  formatEther,
  hexToString,
} from "viem";

import { sepolia } from "viem/chains";
import * as dotenv from "dotenv";
import { abi, bytecode } from "../artifacts/contracts/Ballot.sol/Ballot.json";

dotenv.config();
const providerApiKey = process.env.ALCHEMY_API_KEY || "";
const contractAddress = process.env.CONTRACT_ADDRESS || "" ;
async function main() {
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`),
  });

  for (let index = 0; index < 3; index++) {
    const proposal = (await publicClient.readContract({
      address: `0x${contractAddress}`,
      abi,
      functionName: "proposals",
      args: [BigInt(index)],
    })) as any[];
    const name = hexToString(proposal[0], { size: 32 });
    console.log({ index, name, proposal });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
