const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/enviroment')

const generateToken = (id) => {
    const tokenCookieOptions = {
        expires: new Date(Date.now() + config.cookieConfig.expiresTime * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    return new Promise((resolve, reject) => {
        jwt.sign({ id }, config.JsonWebTokenConfig.secret_key, (error, token) => {
            if (error) {
                reject(error);
            }
            else {
                resolve([token, tokenCookieOptions])
            }
        })
    })
}

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, config.JsonWebTokenConfig.secret_key, (error, decoded) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(decoded);
            }
        })
    })
}

const hashPassword = async password => await bcrypt.hash(password, 12)

const comparePassword = (password, userPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, userPassword, (error, result) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(result);
            }
        })
    })
}

const AuthHelper = { hashPassword, generateToken, comparePassword, verifyToken }
module.exports = AuthHelper

