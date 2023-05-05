import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
// @ts-ignore
import { developmentChains } from "../helper-hardhat-config.ts"
// @ts-ignore
import { verify } from "../utils/verify"

const deployFactory: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    // @ts-ignore
    const { deployments, getNamedAccounts, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const args: any[] = [
        /* uri */
    ]
    log("Deploying factory...")
    const factory = await deploy("Factory", {
        from: deployer,
        args,
        log: true,
    })

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(factory.address, args)
    }

    log("-------------------------------------------------")
}

export default deployFactory
