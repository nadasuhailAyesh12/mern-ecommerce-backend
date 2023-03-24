const seedData = require("../db/seeders/seedDB");
const Product = require("../models/Product");
const User = require("../models/User");
const users = require("../db/data/users")
const products = require("../db/data/products")

seedData(User, users);
seedData(Product, products);
