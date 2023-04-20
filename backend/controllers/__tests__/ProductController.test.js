const mongoose = require('mongoose');

const request = require('supertest');
const app = require("../../app");
const { testUri } = require("../../config/enviroment").database

beforeEach(async () => {
    await mongoose.connect(testUri);
});

afterEach(async () => {
    await mongoose.connection.close();
});

describe("GET /api/products", () => {
    it("should return all products", async () => {
        const res = await request(app).get("/api/v1/product");
        expect(res.statusCode).toBe(200);
        expect(res.body.productsCount).toBeGreaterThan(0);
    });
});