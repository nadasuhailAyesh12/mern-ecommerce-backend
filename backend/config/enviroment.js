const dotenv = require('dotenv');

dotenv.config({ path: 'backend/.env' });

const { DATABASE_URL, PORT } = process.env;

const config = {
    database: {
        uri: DATABASE_URL
    },
    port: PORT || 5000
};

module.exports = config;