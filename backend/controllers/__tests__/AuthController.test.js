const request = require("supertest");
const app = require("../../app");
const { testUri } = require("../../config/enviroment").database;
const dbConnection = require("../../db/connection");

beforeAll(() => {
    dbConnection(testUri);
});

afterAll(() => {
    dbConnection(testUri).then((db) => db.connection.close());
});

describe("POST /api/v1/auth/signup", () => {
    test("invalid user registration signature", async () => {
        const res = await request(app).post("/api/v1/auth/signup").send({});
        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
    });

    test("valid  user registration  signature", async () => {
        const res = await request(app)
            .post("/api/v1/auth/signup")
            .send({
                name: "Nada",
                email: "nada10@gmail.com",
                password: "11nA@4566",
                avatar: {
                    public_id: "nada_gl8z2i",
                    url: "https://res.cloudinary.com/dgelwljtb/image/upload/v1679645193/nada_gl8z2i.jpg",
                },
                role: "Admin",
            });
        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
    });

    test("duplicate key error", async () => {
        const res = await request(app)
            .post("/api/v1/auth/signup")
            .send({
                name: "Nada",
                email: "nada10@gmail.com",
                password: "11nA@4566",
                avatar: {
                    public_id: "nada_gl8z2i",
                    url: "https://res.cloudinary.com/dgelwljtb/image/upload/v1679645193/nada_gl8z2i.jpg",
                },
                role: "Admin",
            });

        expect(res.statusCode).toBe(409);
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe("duplicate email entered");
    });
});
