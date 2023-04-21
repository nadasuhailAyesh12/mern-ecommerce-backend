const mongoose = require('mongoose');

const dbConnection = (url) => mongoose.connect(url)

module.exports = dbConnection;
