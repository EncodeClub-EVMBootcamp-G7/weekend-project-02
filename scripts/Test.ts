import * as dotenv from "dotenv";
import { viem } from "hardhat";
import {formatEther} from "viem"
dotenv.config();

console.log("Hello World");
const providerApiKey = process.env.ALCHEMY_API_KEY || "";
const deployerPrivateKey = process.env.PRIVATE_KEY || "";

async function main() {
  const publicClient = await viem.getPublicClient();
  const blockNumber = await publicClient.getBlockNumber();
  console.log("Last block number:", blockNumber);
  const [deployer] = await viem.getWalletClients();
  console.log("Deployer address:", deployer.account.address);
  const balance = await publicClient.getBalance({
    address: deployer.account.address,
  });
  console.log(
    "Deployer balance:",
    formatEther(balance),
    deployer.chain.nativeCurrency.symbol
  );
}
main();
