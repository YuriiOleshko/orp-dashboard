const contractName = process.env.REACT_APP_CONTRACT_NAME || 'dev-1615976860844-4430258';

module.exports = function getConfig() {
  let config = {
    networkId: 'default',
    nodeUrl: 'https://rpc.testnet.near.org',
    walletUrl: 'https://wallet.testnet.near.org',
    helperUrl: 'https://helper.testnet.near.org',
    contractName,
    GAS: '200000000000000',
    DEFAULT_NEW_ACCOUNT_AMOUNT: '5',
    contractMethods: {
      changeMethods: ['insert_data'],
      viewMethods: ['get_data'],
    },
  };

  if (process.env.REACT_APP_ENV === 'prod') {
    config = {
      ...config,
      networkId: 'mainnet',
      nodeUrl: 'https://rpc.mainnet.near.org',
      walletUrl: 'https://wallet.near.org',
      helperUrl: 'https://helper.mainnet.near.org',
      contractName: 'near',
    };
  }

  return config;
};
