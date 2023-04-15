const path = require('path');

const express = require('express');
const upload = require("express-fileupload")
const errorHandler = require("./middlewars/errors");
const router = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, '..', './assets'),
    limits: { fileSize: 50 * 1024 * 1024 }
}))

app.use("/api/v1", router)
app.use(errorHandler);

module.exports = app;