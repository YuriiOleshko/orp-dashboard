import ipfsClient from 'ipfs-http-client';
import uint8arrays from 'uint8arrays';
import axios from 'axios';

export const initIPFS = async () => {
  const ipfs = ipfsClient({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
      Authorization: 'Basic MXpqSUVXZm5mZEdLSmRmWlppb1RlNlRBak1KOmY2YjU0N2I3NzQxMzEwOGE3MWY0M2Q2YzkzMjZhNGI2',
    },

  });
  return ipfs;
};
// export const testAuthentication = () => {
//   const url = 'https://api.pinata.cloud/data/testAuthentication';
//   return axios
//     .get(url, {
//       headers: {
//         pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
//         pinata_secret_api_key: process.env.REACT_APP_PINATA_API_SECRET_KEY,
//       },
//     })
//     .then((response) => {
//       // handle your response here
//       console.log(response, 'response');
//     })
//     .catch((error) => {
//       // handle error here
//       console.log(error, 'error');
//     });
// };

export const getJSONFileFromIpfsNew = async (cid) => {
  const config = {
    method: 'post',
    url: `https://1x589Wf0bGYEc1dhSmPCbTlumFQ:cacb603095351699082f9e83396ea0bb@ipfs.infura.io:5001/api/v0/cat?arg=${cid}`,
    headers: { },
  };

  return axios(config)
    .then((response) => JSON.stringify(response.data))
    .catch((error) => {
      console.log(error);
      return undefined;
    });
};

export const getJSONFileFromIpfs = async (client, cid) => {
  let file = '';
  try {
    for await (const chunk of client.cat(cid)) {
      file += uint8arrays.toString(chunk);
    }
    file = JSON.parse(file);
    return file;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getFilesFromDirectory = async (client, cid) => {
  const updateArray = [];
  for await (const file of client.get(cid)) {
    // eslint-disable-next-line no-continue
    if (!file.content) continue;
    updateArray.push({ path: file.path.split('/')[1] });
    const content = [];
    for await (const chunk of file.content) {
      content.push(chunk);
    }
  }
  return updateArray;
};

export const getFilesFromDirWithContent = async (client, cid) => {
  const updateArray = [];
  for await (const file of client.get(cid)) {
    // eslint-disable-next-line no-continue
    if (!file.content) continue;
    const content = [];
    for await (const chunk of file.content) {
      content.push(chunk);
    }
    updateArray.push({ path: file.path.split('/')[1], content });
  }
  return updateArray;
};

export const addAllFiles = async (client, files) => {
  const options = {
    pin: true,
    wrapWithDirectory: true,
    timeout: 10000,
  };

  for await (const result of client.addAll(files, options)) {
    console.log(result);
  }
};
