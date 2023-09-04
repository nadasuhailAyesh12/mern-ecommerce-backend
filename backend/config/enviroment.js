const dotenv = require("dotenv");

dotenv.config({ path: "backend/.env" });

const {
    DEVELOPMENT_DATABASE_URL,
    TEST_DATABASE_URL,
    PRODUCTION_DATABASE_URL,
    PORT,
    NODE_ENV,
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_SECRET_KEY,
    JSONWEBTOKEN_SECRET_KEY,
    COOKIE_EXPIRES_TIME,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASSWORD,
    SMTP_FROM_EMAIL,
    SMTP_FROM_NAME,
    STRIPE_SECRET_KEY,
    STRIPE_API_KEY,
} = process.env;

const config = {
    database: {
        uri:
            NODE_ENV === "development"
                ? DEVELOPMENT_DATABASE_URL
                : NODE_ENV === "test"
                    ? TEST_DATABASE_URL
                    : PRODUCTION_DATABASE_URL,
    },
    port: PORT || 5000,
    node_env: NODE_ENV,
    cloudinaryConfig: {
        cloud_name: CLOUDINARY_CLOUD_NAME,
        api_key: CLOUDINARY_API_KEY,
        api_secret: CLOUDINARY_SECRET_KEY,
    },
    JsonWebTokenConfig: {
        secret_key: JSONWEBTOKEN_SECRET_KEY || "",
    },
    cookieConfig: {
        expiresTime: COOKIE_EXPIRES_TIME,
    },
    nodemailerConfig: {
        user: SMTP_USER,
        password: SMTP_PASSWORD,
        port: SMTP_PORT,
        from: SMTP_FROM_EMAIL,
        name: SMTP_FROM_NAME,
        host: SMTP_HOST,
    },
    stripeConfig: {
        api_secret: STRIPE_SECRET_KEY,
        api_key: STRIPE_API_KEY,
    },
};

module.exports = config;
