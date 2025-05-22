const express = require("express");
const router = express.Router();
const {Restaurant, Item, Menu} = require("../models/index");
const { check, validationResult } = require("express-validator");

const db = require("../db/connection");

router.use(express.json());
router.use(express.urlencoded());

//TODO: Create your GET Request Route Below:

router.get("/", async (request, response) => {
    const restaurants = await Restaurant.findAll();
    response.json(restaurants);
});

router.get("/all", async (request, response) => {
    const restaurants = await Restaurant.findAll({
        include: [{
            model: Menu,
            include: [{
                model: Item
            }]
        }]
    });

    response.json(restaurants);
});

router.get("/:id", async (request, response) => {
    const id = request.params.id;

    const restaurant = await Restaurant.findByPk(id);

    response.json(restaurant);
})


router.post("/",
  [
    check("name").not().isEmpty().trim(),
    check("location").not().isEmpty().trim(),
    check("cuisine").not().isEmpty().trim(),
    check("name").isLength({ min: 10, max: 30 }),
  ],
  async (request, response) => {
    errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.json({ errors: errors.array() });
    }
    const restaurant = await Restaurant.create(request.body);

    response.json(restaurant);
});

router.put("/:id", async (request, response) => {
    const restaurantId = request.params.id;

    const restaurant = await Restaurant.update(request.body, {
        where: { id: restaurantId }
    });

    console.log(request.body);
    
    response.json(restaurant);
})

router.delete("/:id", async (request, response) => {
    const restaurantId = request.params.id;

    const restaurant = await Restaurant.destroy({
        where: { id: restaurantId }
    });

    response.json(restaurant);
})


module.exports = router;
