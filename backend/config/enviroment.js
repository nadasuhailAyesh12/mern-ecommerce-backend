const dotenv = require('dotenv');

dotenv.config();

const { DATABASE_URL, PORT } = process.env;

const config = {
    database: {
        uri: DATABASE_URL
    },
    port: PORT || 5000
};

module.exports = config;