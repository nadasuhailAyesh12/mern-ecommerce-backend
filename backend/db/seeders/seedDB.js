const Product = require("../../models/Product");
const dbConnection = require("../connection");
const products = require("../data/products.json")

dbConnection();

const seedProducts = async () => {
    try {
        await Product.deleteMany()
        console.log("Products deleted");
        await Product.insertMany(products)
        console.log("Products inserted");
        process.exit()
    }
    catch (error) {
        console.log(error.message);
        process.exit();
    }
}

module.exports = seedProducts

