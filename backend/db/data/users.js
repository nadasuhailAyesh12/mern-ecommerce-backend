const mongoose = require('mongoose')

const users = [{
    _id: new mongoose.Types.ObjectId('64440b692ee3eb5ff056b800'),
    name: "Nada",
    email: "nada@gmail.com",
    password: "$2b$12$PjAn/.WYPIH/4kEHsEgUtu30kxlwdQdDvK7bRDaCP18L/r1oDQ2/e",
    avatar: {
        public_id: "nada_gl8z2i",
        url: "https://res.cloudinary.com/dgelwljtb/image/upload/v1679645193/nada_gl8z2i.jpg"
    },
    role: "Admin"
}]

module.exports = users;