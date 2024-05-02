require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  networks: {
    taraxa: {
      url: `https://rpc.testnet.taraxa.io/`,
      chainId: 842,
      accounts: [process.env.TARAXA_MNEMONIC],
    },
  },
};
