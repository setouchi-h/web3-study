import { ethers, getNamedAccounts } from "hardhat"

async function main() {
    const { deployer } = await getNamedAccounts()

    console.log("-----Deploying contracts...-----")
    const FactoryFactory = await ethers.getContractFactory("Factory")
    const Factory = await FactoryFactory.deploy()
    await Factory.deployTransaction.wait(1)
    console.log(`Factory address: ${Factory.address}`)
    console.log("-----Deployed!-----")

    console.log("-----Let's deploy Box!-----")
    Factory.deploy(1, ethers.utils.formatBytes32String("yukichi"))
    console.log("-----Deployed Box by Factory!-----")
    const box = await ethers.getContractAt("Box", await Factory.getBoxAddress(0))

    console.log("-----Let's transfer owner of Box!-----")
    console.log("before")
    console.log(await box.owner())
    console.log(deployer)
    await Factory.transferOwnership()
    console.log("after")
    console.log(await box.owner())
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
