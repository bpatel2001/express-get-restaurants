const express = require("express");
const app = express()

//TODO: Create your GET Request Route Below:
const restaurantRouter = require("../routes/restaurants.js")

app.use("/restaurants", restaurantRouter)

module.exports = app;
