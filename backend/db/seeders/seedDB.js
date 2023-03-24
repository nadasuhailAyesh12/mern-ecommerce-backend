const dbConnection = require("../connection");

dbConnection();

const seedData = async (model, data) => {
    try {
        await model.deleteMany();
        console.log("data deleted");
        await model.insertMany(data);
        console.log("data inserted");
        process.exit();
    } catch (error) {
        console.log(error.message);
        process.exit();
    }
};

module.exports = seedData;
