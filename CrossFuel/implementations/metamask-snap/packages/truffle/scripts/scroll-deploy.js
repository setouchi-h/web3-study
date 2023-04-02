const {
  EntryPoint__factory,
  SimpleAccountFactory__factory,
} = require('@account-abstraction/contracts');
const { DeterministicDeployer } = require('@account-abstraction/sdk');
const { ethers } = require('ethers');
const networksJson = require('../networks.json');
const CrossFuelPaymasterJson = require('../build/CrossFuelPaymaster.json');
const MockERC20Json = require('../build/MockERC20.json');
const MockSBTClaimJson = require('../build/MockSBTClaim.json');

const fs = require('fs');
const path = require('path');

require('dotenv').config({});

const mnemonicPhrase = process.env.MNEMONIC_PHRASE;

// @dev
// This is a custom multichain deployer that utilizes a create2 factory.
// We have added custom logic to enable deployment to multiple chains simultaneously,
// while ensuring that the deployed address remains consistent across all chains.

const truffle = require('../truffle-config');

const { verifyingPaymasterSigner } = require('../config.json');
const intervalTime = 1000;

const main = async () => {
  let entryPointAddress;
  let factoryAddress;
  let paymasterAddress;
  let mockERC20Address;
  let mockSBTClaim;

  try {
    // for (const { key: network } of Object.values(networksJson)) {
    //   console.log(`====== ${network} ======`);

    // @dev
    // This requires deploying with creat2 to Multichain, so Truffle migrate cannot be used directly.
    // However, we attempt to create the same environment as Truffle.
    const provider = new ethers.providers.JsonRpcProvider(
      'https://alpha-rpc.scroll.io/l2',
    );

    const signer = ethers.Wallet.fromMnemonic(mnemonicPhrase).connect(provider);
    // const dep = new DeterministicDeployer(provider);

    // const deployIfNeeded = async (deploymentCode) => {
    //   return new Promise(async (resolve, reject) => {
    //     const addr = DeterministicDeployer.getAddress(deploymentCode);
    //     if (await dep.isContractDeployed(addr)) {
    //       console.log('already deployed at', addr);
    //       resolve(addr);
    //     } else {
    //       console.log('deploy now...');
    //       await dep.deterministicDeploy(deploymentCode);

    //       // Added custom wait function to ensure complete contract deployment before continuing.
    //       const interval = setInterval(async () => {
    //         try {
    //           isDeployed = await dep.isContractDeployed(addr);
    //           if (isDeployed) {
    //             clearInterval(interval);
    //             console.log('deployed at', addr);
    //             resolve(addr);
    //           }
    //         } catch (error) {
    //           reject(error);
    //         }
    //       }, intervalTime);
    //     }
    //   });
    // };

    console.log('====== EntryPoint ======');
    const EntryPointFactory = new ethers.ContractFactory(
      EntryPoint__factory.abi,
      EntryPoint__factory.bytecode,
      signer,
    );
    const eContract = await EntryPointFactory.deploy();
    await eContract.deployed();
    entryPointAddress = eContract.address;
    // const entryPointDeploymentCode = EntryPoint__factory();
    // entryPointAddress = await deployIfNeeded(entryPointDeploymentCode);

    console.log('====== Factory ======');
    const FactoryFactory = new ethers.ContractFactory(
      SimpleAccountFactory__factory.abi,
      SimpleAccountFactory__factory.bytecode,
      signer,
    );
    const fContract = await FactoryFactory.deploy(entryPointAddress);
    await fContract.deployed();
    factoryAddress = fContract.address;
    // const factoryDeploymentArgument = ethers.utils.defaultAbiCoder.encode(
    //   ['address'],
    //   [entryPointAddress],
    // );
    // console.log('factoryDeploymentArgument', factoryDeploymentArgument);
    // const factoryDeploymentCode = ethers.utils.solidityPack(
    //   ['bytes', 'bytes'],
    //   [SimpleAccountFactory__factory.bytecode, factoryDeploymentArgument],
    // );
    // factoryAddress = await deployIfNeeded(factoryDeploymentCode);

    console.log('====== Paymaster ======');
    const PaymasterFactory = new ethers.ContractFactory(
      CrossFuelPaymasterJson.abi,
      CrossFuelPaymasterJson.bytecode,
      signer,
    );
    const pContract = await PaymasterFactory.deploy(
      entryPointAddress,
      verifyingPaymasterSigner,
      verifyingPaymasterSigner,
    );
    await pContract.deployed();
    paymasterAddress = pContract.address;
    // const paymasterDeploymentArgument = ethers.utils.defaultAbiCoder.encode(
    //   ['address', 'address', 'address'],
    //   [entryPointAddress, verifyingPaymasterSigner, verifyingPaymasterSigner],
    // );
    // console.log('paymasterDeploymentArgument', paymasterDeploymentArgument);
    // const paymasterDeploymentCode = ethers.utils.solidityPack(
    //   ['bytes', 'bytes'],
    //   [CrossFuelPaymasterJson.bytecode, paymasterDeploymentArgument],
    // );
    // paymasterAddress = await deployIfNeeded(paymasterDeploymentCode);

    // const paymasterContract = new ethers.Contract(
    //   paymasterAddress,
    //   CrossFuelPaymasterJson.abi,
    //   signer,
    // );

    // const encoded =
    //   paymasterContract.interface.encodeFunctionData('getDeposit');
    // console.log('encoded', encoded);

    // const deposit = await paymasterContract.getDeposit();
    // if (deposit.lt(ethers.utils.parseEther('0.2'))) {
    //   console.log('paymaster deposit is too low');
    //   const tx = await paymasterContract.deposit({
    //     value: ethers.utils.parseEther('0.3'),
    //   });
    //   await tx.wait();
    //   console.log('depositted');
    // }

    // console.log('====== Mock ERC20 ======');
    // const mockERC20DeploymentArgument = ethers.utils.defaultAbiCoder.encode(
    //   ['string', 'string'],
    //   ['MockPaymentToken', 'MPT'],
    // );

    // console.log('mockERC20DeploymentArgument', mockERC20DeploymentArgument);
    // const mockERC20DeploymentCode = ethers.utils.solidityPack(
    //   ['bytes', 'bytes'],
    //   [MockERC20Json.bytecode, mockERC20DeploymentArgument],
    // );
    // mockERC20Address = await deployIfNeeded(mockERC20DeploymentCode);

    // console.log('====== Mock SBT Claim ======');
    // const mockSBTClaimDeploymentCode = MockSBTClaimJson.bytecode;
    // mockSBTClaim = await deployIfNeeded(mockSBTClaimDeploymentCode);
    // }

    fs.writeFileSync(
      path.join(__dirname, `../scroll.json`),
      JSON.stringify({
        entryPointAddress,
        factoryAddress,
        paymasterAddress,
        mockERC20Address,
        mockSBTClaim,
      }),
    );

    return;
  } catch (e) {
    console.log(e);
  } finally {
    process.exit();
  }
};

main();
