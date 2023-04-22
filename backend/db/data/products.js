const mongoose = require('mongoose');
const products = [
    {
        _id: new mongoose.Types.ObjectId("64413bf76315b96ac11848f3"),
        name: "SanDisk Ultra 128GB SDXC UHS-I Memory Card up to 80MB/s",
        description: "Ultra-fast cards (2) to take better pictures and Full HD videos (1) with your compact to mid-range point-and-shoot cameras and camcorders. With SanDisk Ultra SDXC UHS-I cards you’ll benefit from faster downloads, high capacity, and better performance to capture and store 128GB (5) of high quality pictures and Full HD video (1). Take advantage of ultra-fast read speeds of up to 80MB/s (3) to save time moving photos and videos from the card to your computer. From a leader in flash memory storage, SanDisk Ultra SDXC UHS-I cards are compatible with SDHC and SDXC digital devices, and come with a 10-year limited warranty (6).",
        price: 45.89,
        ratings: 4.5,
        category: "Electronics",
        seller: "Ebay",
        stock: 50,
        numOfReview: 32,
        reviews: [],
        user: {
            _id: new mongoose.Types.ObjectId('64440b692ee3eb5ff056b800'),
            name: "Nada",
            email: "nada@gmail.com",
            password: "$2b$12$PjAn/.WYPIH/4kEHsEgUtu30kxlwdQdDvK7bRDaCP18L/r1oDQ2/e",
            avatar: {
                public_id: "nada_gl8z2i",
                url: "https://res.cloudinary.com/dgelwljtb/image/upload/v1679645193/nada_gl8z2i.jpg"
            },
            role: "Admin"
        },

        image: {
            public_id: "0",
            url: "https://media.istockphoto.com/id/1253169835/photo/abstract-geometric-shape-cylinder-and-torus-design-for-cosmetic-or-product-display-podium-3d.jpg?s=2048x2048&w=is&k=20&c=YsgoVKlqVWlUgIez4L8EW95SEX6w-8va9BIwJUg0eCM="
        }
    }]

module.exports = products