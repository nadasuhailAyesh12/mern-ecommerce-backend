const mongoose = require('mongoose');
const { uri } = require("../config/enviroment").database;

const dbConnection = () => mongoose.connect(uri)

module.exports = dbConnection;
