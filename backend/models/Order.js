const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            required: [true, 'please enter a shipping address']
        },
        city: {
            type: String,
            required: [true, 'please enter a  shipping city']
        },
        phoneNumber: {
            type: String,
            required: [true, 'please enter a phone number']
        },
        postalCode: {
            type: String,
            required: [true, 'please enter a postal code']
        },
        country: {
            type: String,
            required: true
        }
    }
    ,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    orderItems: [
        {
            name: {
                type: String,
                required: [true, "please enter order item name"]
            },
            quantity: {
                type: Number,
                required: [true, "please enter order item quantity"]
            },
            image: {
                type: String,
                required: [true, "please enter order item image"]
            },
            price: {
                type: Number,
                required: [true, "please enter order item price"]
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: [true, "please enter order item product"],
                ref: 'Product'
            }
        }
    ],
    paymentInfo: {
        id: {
            type: String
        },
        status: {
            type: String
        }
    },
    paidAt: {
        type: Date
    },

    itemsPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    shippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    orderStatus: {
        type: String,
        required: true,
        default: 'Processing'
    },
    deliveredAt: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Order', orderSchema)


