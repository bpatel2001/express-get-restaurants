const express = require("express");
const app = express();
const Restaurant = require("../models/index");
const db = require("../db/connection");

app.use(express.json());
app.use(express.urlencoded());

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

app.post("/restaurants", async (request, response) => {
    const restaurant = await Restaurant.create(request.body);

    response.json(restaurant);
})

app.put("/restaurants/:id", async (request, response) => {
    const restaurantId = request.params.id;

    const restaurant = await Restaurant.update(request.body, {
        where: { id: restaurantId }
    });
    
    response.json(restaurant);
})

app.delete("/restaurants/:id", async (request, response) => {
    const restaurantId = request.params.id;

    const restaurant = await Restaurant.destroy({
        where: { id: restaurantId }
    });

    response.json(restaurant);
})


module.exports = app;
