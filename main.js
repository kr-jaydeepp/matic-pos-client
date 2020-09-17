const MaticPOSClient = require("@maticnetwork/maticjs").MaticPOSClient;
const config = require("./config");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const getMaticPOSClient = () => {
  return new MaticPOSClient({
    network: "testnet", // optional, default is testnet
    version: "mumbai", // optional, default is mumbai
    parentProvider: new HDWalletProvider(
      config.user.privateKey,
      config.root.RPC
    ),
    maticProvider: new HDWalletProvider(
      config.user.privateKey,
      config.child.RPC
    ),
    posRootChainManager: config.root.POSRootChainManager,
    posERC20Predicate: config.root.posERC20Predicate, // optional, required only if working with ERC20 tokens
    parentDefaultOptions: { from: config.user.address }, // optional, can also be sent as last param while sending tx
    maticDefaultOptions: { from: config.user.address }, // optional, can also be sent as last param while sending tx
  });
};

const maticPOSClient = getMaticPOSClient()
const burnHash = '0xc86cfe5f5524e3ed451b4b4f861845c2a4bc857840a370048bdc29871ae07df5'

/*
maticPOSClient.approveERC20ForDeposit(rootToken, amount, { from });
*/
const execute = async () => {
  try {
    //const tx = await maticPOSClient.approveERC20ForDeposit(config.root.DERC20, config.user.amount)
    //const tx = await maticPOSClient.depositERC20ForUser(config.root.DERC20, config.user.address, config.user.amount)
    //const tx = await maticPOSClient.burnERC20(config.child.DERC20, config.user.amount)
    const tx = await maticPOSClient.exitERC20(burnHash)
    console.log(tx.transactionHash) // eslint-disable-line
  } catch (e) {
    console.error(e) // eslint-disable-line
  }
}

execute().then(() => process.exit(0))