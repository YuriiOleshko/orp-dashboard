import ipfsClient from 'ipfs-http-client';
import uint8arrays from 'uint8arrays';

export const initIPFS = async () => {
  const ipfs = ipfsClient({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
  });
  return ipfs;
};

export const getJSONFileFromIpfs = async (client, cid) => {
  let file;
  for await (const chunk of client.cat(cid)) {
    file = JSON.parse(uint8arrays.toString(chunk));
  }
  return file;
};

export const getFilesFromDirectory = async (client, cid) => {
  const updateArray = [];
  for await (const file of client.get(cid)) {
    // eslint-disable-next-line no-continue
    if (!file.content) continue;
    console.log(file, 'file');
    updateArray.push({ path: file.path.split('/')[1] });
    const content = [];
    for await (const chunk of file.content) {
      content.push(chunk);
    }
  }
  return updateArray;
};
