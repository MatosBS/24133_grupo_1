import multer from 'multer';
import { helpers } from '../helpers/files.helpers.js';

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    const { name } = req.body
    const filename = `${name}_${file.originalname}`
    cb(null, filename)
  },

  destination: (_, file, cb) => {
    const isSupported = helpers.checkSupportedTypes(file.mimetype)
    isSupported
      ? cb(null, 'public/assets/products/')
      : cb('No soportamos este archivo')
  }
});


const uploadImage = multer({ storage });

export const middlewares = {
  uploadImage
};