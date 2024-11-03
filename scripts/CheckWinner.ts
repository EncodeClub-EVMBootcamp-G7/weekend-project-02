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
const contractAddress = "0xcb883c97860e0b367bb1b3c6c4bc5cedfd1c35d6";
async function main() {
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`),
  });

  const winner = (await publicClient.readContract({
    address: contractAddress,
    abi,
    functionName: "winnerName",
  })) as `0x${string}`;

  console.log(hexToString(winner));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
