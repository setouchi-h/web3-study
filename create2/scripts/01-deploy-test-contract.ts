const { ethers } = require("hardhat")

async function main() {
    console.log("Deploying contracts...")
    const TestContractFactory = await ethers.getContractFactory("TestContract")
    const TestContract = await TestContractFactory.deploy(
        "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
        12
    )
    await TestContract.deployTransaction.wait(1)
    console.log("Deployed!")
    console.log(await TestContract.owner())
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
