const request = require("supertest");
const app = require("../../app");
const { testUri } = require("../../config/enviroment").database;
const dbConnection = require("../../db/connection");
const mongoose = require("mongoose");
const User = require("../../models/User");

beforeAll(() => {
    dbConnection(testUri)
});

afterAll(async () => {
    await User.deleteMany()
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
                _id: new mongoose.Types.ObjectId("64440b692ee3eb5ff056b990"),
                name: "sheraze",
                email: "sheraze@gmail.com",
                password: "11nA@4566",
                avatar: {
                    public_id: "nada_gl8z2i",
                    url: "https://res.cloudinary.com/dgelwljtb/image/upload/v1679645193/nada_gl8z2i.jpg",
                },
                role: "Admin",
            });
        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
        expect(typeof res.body.user).toBe('object');
        expect(res.body.user.email).toBe('sheraze@gmail.com');
    });

    test("invalid email signature", async () => {
        const res = await request(app)
            .post("/api/v1/auth/signup")
            .send({
                _id: new mongoose.Types.ObjectId("64440b692ee3eb5ff056b839"),
                name: "Nada",
                email: "sheraze.com",
                password: "11nA@4566",
                avatar: {
                    public_id: "nada_gl8z2i",
                    url: "https://res.cloudinary.com/dgelwljtb/image/upload/v1679645193/nada_gl8z2i.jpg",
                },
                role: "Admin",
            });

        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
    })


    describe("POST /api/v1/auth/login", () => {
        test("vaild login credentials", async () => {
            const res = await request(app).post('/api/v1/auth/login').send({
                email: 'sheraze@gmail.com',
                password: '11nA@4566'
            })
            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);

        })

        test("invalid login credentials", async () => {
            const res = await request(app).post('/api/v1/auth/login').send({
                email: 'hazem@gmail.com',
                password: '11nA@4566'
            })
            expect(res.status).toBe(401);
            expect(res.body.success).toBe(false);
        })

        test("invaild login user signature", async () => {
            const res = await request(app).post('/api/v1/auth/login').send({

            })
            expect(res.status).toBe(400);
            expect(res.body.success).toBe(false);
        })
    })
})

describe("GET /api/v1/auth/logout", () => {
    test("logout functionality", async () => {
        const res = await request(app).get('/api/v1/auth/logout')

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
    })
})


