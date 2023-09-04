const { api_secret, api_key } = require("../config/enviroment").stripeConfig;
const stripe = require("stripe")(api_secret);

const processPayment = async (req, res, next) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: req.body.amount,
            currency: "usd",
            metadata: { integration_check: "accept_a_payment" },
        });
        res.status(200).json({
            success: true,
            client_secret: paymentIntent.client_secret,
        });
    } catch (error) {
        return next(error);
    }
};

const sendStripeAPIKey = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            stripeAPIKey: api_key,
        });
    } catch (error) {
        return next(error);
    }
};

const paymentController = { processPayment, sendStripeAPIKey };
module.exports = { paymentController };
