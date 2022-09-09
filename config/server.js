const express = require("express");
const routes = require("../src/routes/v1");

const app = express();
app.use(express.json());
app.use("/patient/v1.1", routes);

module.exports = app;
