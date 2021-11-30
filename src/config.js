const contractName = process.env.REACT_APP_CONTRACT_NAME || [
  'c2.ofp.testnet',
  'dt1.ofp.testnet',
  'ot1.ofp.testnet',
];
// const IPFS_URL = process.env.REACT_APP_IPFS_URL || 'https://gateway.ipfs.io';
const IPFS_URL = process.env.REACT_APP_IPFS_URL || 'https://ipfs.infura.io';

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
    // contractMethods: {
    //   changeMethods: ['add_profile', 'update_profile', 'add_project', 'update_project'],
    //   viewMethods: ['get_profile', 'get_project', 'get_projects_per_account',
    //     'get_current_project_stage', 'get_stages_per_project', 'calculate_project_stages'],
    // },
    contractMethods: {
      changeMethods: [
        'add_profile',
        'update_profile',

        'add_project',
        'update_project_info',

        'add_stage_voting',
        'ft_transfer_call',
      ],
      viewMethods: [
        'get_profile',

        'get_project',
        'get_account_projects',
        'calculate_sample_zones',

        'get_stage_voting',

        'get_project_stages',
        'get_current_project_stage',
        'calculate_stages',
      ],
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
