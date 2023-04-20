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

describe("POST /api/v1/auth/signup", () => {
    it("should create user", async () => {
        const res = await request(app).post("/api/v1/auth/signup").send(
            {
                name: "Lara",
                email: "karminla@gmail.com",
                password: "11nA@45e66",
                avatar: {
                    public_id: "nada_gl8z2i",
                    url: "https://res.cloudinary.com/dgelwljtb/image/upload/v1679645193/nada_gl8z2i.jpg"
                },
                role: "Admin"
            }
        )
        expect(res.statusCode).toBe(201);

    })
})

describe("POST /api/v1/auth/login", () => {
    it("should login user succefuly", async () => {
        const res = await request(app).post("/api/v1/auth/login").send(
            {
                email: "karminla@gmail.com",
                password: "11nA@45e66"
            }
        )
        expect(res.statusCode).toBe(200);
    })
})
