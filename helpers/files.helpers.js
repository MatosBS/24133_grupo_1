import fs from 'fs';
const supportedTypes = ['image/jpeg', 'image/bmp', 'image/gif', 'image/jpg'];

const checkSupportedTypes = (filetype) => {
  return supportedTypes.includes(filetype);
};

const removeFile = async (fileName) => {
  await fs.unlinkSync('public/assets/products/' + fileName);
};

export const helpers = {
  checkSupportedTypes,
  removeFile
};