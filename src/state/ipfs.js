import ipfsClient from 'ipfs-http-client';

export const initIPFS = async () => {
  const ipfs = ipfsClient({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
  });
  console.log('ipfs connect', ipfs);
  return ipfs;
};
