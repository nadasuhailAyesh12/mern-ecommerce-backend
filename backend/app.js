const express = require('express');

const errorHandler = require("./middlewars/errors")
const router = require("./routes")

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router)
app.use(errorHandler);

module.exports = app;