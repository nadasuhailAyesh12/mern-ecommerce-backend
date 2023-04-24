const { Seeder } = require('mongo-seeding');
const products = require('../data/products')
const users = require('../data/users')
const { uri } = require("../../config/enviroment").database

const seedData = () => {
    const seeder = new Seeder({
        database: uri,
        dropDatabase: true
    });

    const collections = [

        {
            name: 'products',
            documents: products
        },
        {
            name: 'users',
            documents: users
        }
    ]
    return seeder.import(collections)
}

module.exports = seedData;


