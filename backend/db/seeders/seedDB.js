const { Seeder } = require('mongo-seeding');
const products = require('../data/products')
const users = require('../data/users')

const seedData = (url) => {
    const seeder = new Seeder({
        database: url,
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


