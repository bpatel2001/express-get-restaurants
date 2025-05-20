const express = require("express");
const app = express();
const Restaurant = require("../models/index");
const db = require("../db/connection");

//TODO: Create your GET Request Route Below:

app.get("/restaurants", async (request, response) => {
    const restaurants = await Restaurant.findAll();
    response.json(restaurants);
});

app.get("/restaurants/:id", async (request, response) => {
    const id = request.params.id;

    const restaurant = await Restaurant.findByPk(id);

    response.json(restaurant);
})


module.exports = app;
