import {
  createPublicClient,
  http,
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

  const winner = (await publicClient.readContract({
    address: `0x${contractAddress}`,
    abi,
    functionName: "winnerName",
  })) as `0x${string}`;

  console.log(hexToString(winner));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
