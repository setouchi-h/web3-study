import { ethers } from "hardhat";

async function main() {
  const contractFactory = await ethers.getContractFactory("Factory");
  const contract = await contractFactory.deploy();
  await contract.deployTransaction.wait(1);
  console.log(`Contract Address: ${contract.address}`);

  console.log("Factory Deploying...");
  const product = await contract.deploy(1984);
  const productAddress = await contract.getAddress(0);
  console.log(productAddress);

  const product_0 = await ethers.getContractAt(
    "Product",
    "0xa16e02e87b7454126e5e10d957a927a7f5b5d2be"
  );
  console.log(product_0);
  const data = await product_0.getData();
  console.log(data);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
