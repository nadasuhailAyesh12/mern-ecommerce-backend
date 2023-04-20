const mongoose = require('mongoose');

const { devUri } = require('../config/enviroment').database

const dbConnection = async () => {
    try {
        await mongoose.connect(devUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('connected to  MongoDB');
    }
    catch (error) {
        console.log(`error ${error.message}`);
    }
}

module.exports = dbConnection;
