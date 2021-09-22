/* eslint-disable */
import React, { useEffect, useState } from 'react';
import DropzoneInput from 'src/components/Dropzone';
import { initIPFS, getJSONFileFromIpfs, getFilesFromDirWithContent, addAllFiles } from '../../state/ipfs';

const Mfs = () => {
  const [fileIcon, setFileIcon] = useState({});
  const [myFiles, setMyFiles] = useState([]);
  const [previewImg, setPreviewImg] = useState('');
  const [nft, setNft] = useState();

  const loadNFTData = async () => {
    const ipfs = await initIPFS();
    const item = await getJSONFileFromIpfs(ipfs,'Qmajgt7KLTUN1KKjYub8Z3C6RaSrzLggMXfp4XrZToHJ8p');
    setNft(item);
  }

  const getIpfsFile = async () => {
    const ipfs = await initIPFS();
    if (nft.filesCidDir) {
      const fileArray = await getFilesFromDirWithContent(ipfs, nft.filesCidDir);
      setMyFiles(fileArray);
    }
  };

  const uploadAll = async (files) => {
    const ipfs = await initIPFS();
    await addAllFiles(ipfs, files);
  }

  useEffect(() => {
    loadNFTData();
  }, []);

  useEffect(() => {
    nft && getIpfsFile();
  }, [nft]);

  if (myFiles.length > 0) {
    console.log('send to ipfs');
    uploadAll([myFiles[1], myFiles[2]]);
  }


  return (
    <div>
      {nft && (<DropzoneInput classCutom="" change={setFileIcon} state={nft} myFiles={myFiles} setMyFiles={setMyFiles} previewImg={previewImg} setPreviewImg={setPreviewImg} />)}
    </div>
  );
};

export default Mfs;
