import {
  createPublicClient,
  http,
  createWalletClient,
  formatEther,
  hexToString,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";
import * as dotenv from "dotenv";
import { abi, bytecode } from "../artifacts/contracts/Ballot.sol/Ballot.json";
import { toHex } from "viem";
dotenv.config();

const providerApiKey = process.env.ALCHEMY_API_KEY || "";
const deployerPrivateKey = process.env.PRIVATE_KEY || "";
const contractAddress = process.env.CONTRACT_ADDRESS || "" ;
async function main() {
  const address = process.argv.slice(2)[0];
  console.log(address);
  const account = privateKeyToAccount(`0x${deployerPrivateKey}`);
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`),
  });
  const deployer = createWalletClient({
    account,
    chain: sepolia,
    transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`),
  });

  
  const voteTxHash = await deployer.writeContract({
    address: `0x${contractAddress}`,
    abi,
    functionName: "delegate",
    args: [address],
  });

  console.log("Vote transaction hash:", voteTxHash);

  // Wait for transaction confirmation
  const voteReceipt = await publicClient.waitForTransactionReceipt({
    hash: voteTxHash,
  });
  console.log("Vote confirmed in block:", voteReceipt.blockNumber);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
