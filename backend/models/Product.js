const mongoose = require('mongoose')
const Filter = require('bad-words')

const productSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: [true, 'please enter a product name'],
        trim: true,
        maxlength: [100, 'product name can’t exceed 100 characters']
    },

    description: {
        type: 'string',
        required: [true, 'please enter a product description'],
    },
    price: {
        type: Number,
        required: [true, 'please enter a product price'],
        maxlength: [5, 'product  price can’t exceed 5 characters'],
        default: 0.00
    },
    ratings: {
        type: Number,
        required: [true, 'please enter a rating'],
    },
    category: {
        type: 'string',
        required: [true, 'please enter your selected category '],
        enum: {
            values: [
                'Electronics',
                'Cameras',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                "Books",
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home'
            ],
            message: 'Please select correct category for product'
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
            required: true
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
        },
        rating: {
            type: Number,
            required: true,
            default: 0
        },
        comment: {
            type: String,
            required: true,
            validate: {
                validator: (val) => {
                    return !(new Filter().isProfane(val))
                },
                message: 'can’t use profane words'
            }
        }
    }
    ],
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        type: String,
        default: 'https://media.istockphoto.com/id/1253169835/photo/abstract-geometric-shape-cylinder-and-torus-design-for-cosmetic-or-product-display-podium-3d.jpg?s=2048x2048&w=is&k=20&c=YsgoVKlqVWlUgIez4L8EW95SEX6w-8va9BIwJUg0eCM='
    },
    timestamps: true
})

module.exports = mongoose.model('Product', productSchema)