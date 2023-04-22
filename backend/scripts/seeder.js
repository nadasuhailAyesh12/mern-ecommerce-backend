const { devUri } = require("../config/enviroment").database;
const seedData = require("../db/seeders/seedDB");

seedData(devUri)