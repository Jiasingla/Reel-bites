import ImageKit from '@imagekit/nodejs';
import 'dotenv/config'
import fs from 'fs'

const ImageKitClient = new ImageKit({
  privateKey: process.env['IMAGEKIT_PRIVATE_KEY'],
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadfile(filePath, fileName) {
  const result = await ImageKitClient.files.upload({
    file: fs.createReadStream(filePath),  // ← stream instead of loading whole file
    fileName: fileName,
  })
  return result
}

export default uploadfile;