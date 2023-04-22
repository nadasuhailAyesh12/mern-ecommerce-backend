const mongoose = require("mongoose");
const Filter = require("bad-words");

const productSchema = new mongoose.Schema({
    name: {
        type: "string",
        required: [true, "please enter a product name"],
        trim: true,
        maxlength: [100, "product name can’t exceed 100 characters"],
    },
    description: {
        type: "string",
        required: [true, "please enter a product description"],
        validate: {
            validator:
                (val) => {
                    return !(new Filter().isProfane(val));
                },
            message: "can’t use profane words"
        }
    },
    price: {
        type: Number,
        required: [true, "please enter a product price"],
        maxlength: [5, "product  price can’t exceed 5 characters"],
        default: 0.0,
    },
    ratings: {
        type: Number,
        required: [true, "please enter a rating"],
    },
    category: {
        type: "string",
        required: [true, "please enter your selected category "],
        validate: {
            validator:
                (val) => {
                    let values = [
                        "electronics",
                        "cameras",
                        "laptops",
                        "accessories",
                        "headphones",
                        "food",
                        "books",
                        "clothes/shoes",
                        "beauty/health",
                        "sports",
                        "outdoor",
                        "home",
                    ];
                    return (values.includes(val.toLowerCase()))
                },
            message: "please select  category of the existing ones"
        }
    },
    seller: {
        type: 'string',
        required: [true, 'please enter  product seller'],
    },
    stock: {
        type: Number,
        required: [true, 'please enter  product stock'],
        default: 0,

    },
    numOfReviews: {
        type: Number,
        default: 0
    },

    reviews: [{
        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        name: {
            type: String,
            required: true,
            validate: {
                validator: (val) => {
                    return !(new Filter().isProfane(val))
                },
                messages: 'can’t use profane words'
            }
        }
        ,
        rating: {
            type: Number,
            required: true,
            default: 0
        }
        ,
        comment: {
            type: String,
            required: true,
            validate: {
                validator: (val) => {
                    return !(new Filter().isProfane(val))
                },
                message: 'can’t use profane words'
            },

        }
    }],
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    image:
    {
        public_id: {
            type: String,
            required: true,
            default: '0'
        },
        url: {
            type: String,
            required: true,
            default: 'https://media.istockphoto.com/id/1253169835/photo/abstract-geometric-shape-cylinder-and-torus-design-for-cosmetic-or-product-display-podium-3d.jpg?s=2048x2048&w=is&k=20&c=YsgoVKlqVWlUgIez4L8EW95SEX6w-8va9BIwJUg0eCM='

        },
    }

},
    {
        timestamps: true
    }
)


module.exports = mongoose.model("Product", productSchema);
