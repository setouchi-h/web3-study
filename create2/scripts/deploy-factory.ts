import { ethers } from "hardhat";

async function main() {
  console.log("Deploying contracts...");
  const Factory = await ethers.getContractFactory("Factory");
  const FactoryContract = await Factory.deploy();
  await FactoryContract.deployTransaction.wait(1);
  console.log("Deployed!");

  console.log("factory deploying...");
  const testContract = await FactoryContract.deploy(
    "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
    1,
    ethers.utils.formatBytes32String("yukichi")
  );
  console.log(testContract);
  console.log("success!");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
