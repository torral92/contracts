// scripts/check-network.js
const hre = require("hardhat");

async function main() {
  const ethers = hre.ethers;
  const isV6 = !!ethers.formatEther;
  const formatEther = isV6 ? ethers.formatEther : ethers.utils.formatEther;
  const formatUnits = isV6 ? ethers.formatUnits : ethers.utils.formatUnits;

  const [signer] = await ethers.getSigners();
  const network = await ethers.provider.getNetwork();
  const balance = await ethers.provider.getBalance(signer.address);
  const block = await ethers.provider.getBlock("latest");
  const fee = await ethers.provider.getFeeData();

  console.log("Network:", network.name, "chainId:", network.chainId);
  console.log("Signer:", signer.address);
  console.log("Balance (ETH):", formatEther(balance));
  console.log("Latest block:", block.number);
  if (fee.maxFeePerGas || fee.maxPriorityFeePerGas || block.baseFeePerGas) {
    console.log("Base fee (gwei):", block.baseFeePerGas ? Number(formatUnits(block.baseFeePerGas, "gwei")).toFixed(2) : "n/a");
    console.log("Max fee (gwei):", fee.maxFeePerGas ? Number(formatUnits(fee.maxFeePerGas, "gwei")).toFixed(2) : "n/a");
    console.log("Priority fee (gwei):", fee.maxPriorityFeePerGas ? Number(formatUnits(fee.maxPriorityFeePerGas, "gwei")).toFixed(2) : "n/a");
  } else {
    const gasPrice = await ethers.provider.getGasPrice();
    console.log("Legacy gas price (gwei):", Number(formatUnits(gasPrice, "gwei")).toFixed(2));
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
