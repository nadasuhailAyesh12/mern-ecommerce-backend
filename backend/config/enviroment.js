const dotenv = require('dotenv');

dotenv.config({ path: 'backend/.env' });

const { DATABASE_URL, PORT, NODE_ENV, CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_SECRET_KEY, JSONWEBTOKEN_SECRET_KEY, COOKIE_EXPIRES_TIME } = process.env;

const config = {
    database: {
        uri: DATABASE_URL
    },
    port: PORT || 5000,
    node_env: NODE_ENV,
    cloudinaryConfig: {
        cloud_name: CLOUDINARY_CLOUD_NAME,
        api_key: CLOUDINARY_API_KEY,
        api_secret: CLOUDINARY_SECRET_KEY
    },
    JsonWebTokenConfig: {
        secret_key: JSONWEBTOKEN_SECRET_KEY || ''
    },
    cookieConfig: {
        expiresTime: COOKIE_EXPIRES_TIME
    }
};

module.exports = config;