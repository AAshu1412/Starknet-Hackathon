import { PrismaClient } from "@prisma/client";
import { Provider, Contract, Account, RpcProvider } from "starknet";

const prisma = new PrismaClient();

const CONTRACT_ADDRESS = '0x0589e7208b481b31450a7dddab59416c1b0805bfd0d2e4dc5ea047bd3b78c10d';
const ABI = './abis/contract-abi.json';
const providerSepoliaTestnetNethermindPublic = new RpcProvider({
  nodeUrl: 'https://free-rpc.nethermind.io/sepolia-juno/v0_7',
});
