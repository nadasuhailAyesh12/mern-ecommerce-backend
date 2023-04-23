const cloudinary = require('cloudinary');
const { cloudinaryConfig } = require('../config/enviroment');

const UploadPhotoHelper = async (file, folder) => {
    cloudinary.v2.config(cloudinaryConfig);
    const image = await cloudinary.v2.uploader.upload(file, {
        folder
    })
    return image;
}

const destroyPhotoHelper = async (id) => {
    cloudinary.v2.config(cloudinaryConfig);
    await cloudinary.v2.uploader.destroy(id);
}

module.exports = { UploadPhotoHelper, destroyPhotoHelper };