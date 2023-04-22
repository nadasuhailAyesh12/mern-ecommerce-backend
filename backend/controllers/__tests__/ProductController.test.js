const request = require("supertest");
const app = require("../../app");
const { testUri } = require("../../config/enviroment").database;
const dbConnection = require("../../db/connection");
const seedData = require("../../db/seeders/seedDB");

beforeAll(() => {
    dbConnection(testUri).then(() => seedData(testUri));
});

afterAll(() => {
    dbConnection(testUri).then((db) => db.connection.close());
});

describe("GET /api/products", () => {
    test("should return all products", async () => {
        const res = await request(app).get("/api/v1/product");
        expect(res.statusCode).toBe(200);
        expect(res.body.productsCount).toBeGreaterThan(0);
    });
});

describe("GET /api/product/:id", () => {
    test("should return specific product", async () => {
        const res = await request(app).get("/api/v1/product/64413bf76315b96ac11848f3");
        expect(res.statusCode).toBe(200);
        expect(typeof res.body.product).toBe('object')
        expect(res.body.product.price).toBe(45.89)
    });

    test("should return not found", async () => {
        const res = await request(app).get("/api/v1/product/64413bf76315b96ac11848f2");
        expect(res.statusCode).toBe(404)
        expect(res.body.message).toEqual("product not found")
        expect(res.body.success).toBe(false)
    });
});

