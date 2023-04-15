const cloudinary = require('cloudinary');
const { cloudinaryConfig } = require('../config/enviroment');

const UploadPhotoHelper = async (file, folder) => {
    cloudinary.v2.config(cloudinaryConfig);
    const image = await cloudinary.v2.uploader.upload(file, {
        folder
    })
    return image;
}

module.exports = UploadPhotoHelper;