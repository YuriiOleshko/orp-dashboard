const contractName = process.env.REACT_APP_CONTRACT_NAME || 'dev_orp_2.testnet';
const nftContractName = process.env.REACT_APP_CONTRACT_NAME || 'nft.dev_orp_1.testnet';
const IPFS_URL = process.env.REACT_APP_IPFS_URL || 'https://gateway.ipfs.io';

export default function getConfig() {
  let config = {
    ipfsURL: IPFS_URL,
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
    nftContractName,
    nftContractMethods: {
      changeMethods: [
        'new', 'nft_mint', 'nft_update_token_metadata', 'nft_transfer', 'add_guest', 'remove_guest', 'nft_approve_account_id',
        'nft_mint_guest', 'nft_add_sale_guest', 'nft_remove_sale_guest', 'upgrade_guest',
      ],
      viewMethods: ['get_guest', 'get_token_ids', 'nft_token', 'get_sale', 'get_account', 'nft_tokens_for_owner'],
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
}
