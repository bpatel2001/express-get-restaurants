const request = require("supertest")
const app = require("./src/app")
const db = require("./db/connection")
const {Restaurant} = require("./models/index");

const { execSync } = require('child_process');
execSync('npm run seed');

describe("Test GET route", () => {
    it("GET /restaurants works correctly", async () => {
        const response = await request(app).get("/restaurants");
        expect(response.statusCode).toEqual(200)
    });
    it("GET /restaurants returns an array of restaurants", async () => {
        const response = await request(app).get("/restaurants");
        expect(Array.isArray(response.body)).toBe(true);
    })
    it("GET /restaurants returns the correct number of restaurants", async () => {
        const response = await request(app).get("/restaurants");
        const restaurants = await Restaurant.findAll();
        expect(response.body.length).toBe(restaurants.length)
    });
    it("GET /restaurants returns the correct restaurant data", async () => {
        const response = await request(app).get("/restaurants");
        const restaurant = await Restaurant.findAll();
        expect(response.body[0].name).toBe(restaurant[0].name);
        expect(response.body[0].location).toBe(restaurant[0].location);
        expect(response.body[0].cuisine).toBe(restaurant[0].cuisine);
    });
    it("GET /restaurants/:id returns the correct data", async () => {
        const response = await request(app).get("/restaurants/1");
        const restaurant = await Restaurant.findByPk(1);
        expect(response.body.name).toBe(restaurant.name);
        expect(response.body.location).toBe(restaurant.location);
        expect(response.body.cuisine).toBe(restaurant.cuisine);
    });
    it("POST /restaurants returns restaurant array that includes new restaurant", async () => {
        const newRestaurant = {
            name: "Test Restaurant",
            location: "Test Location",
            cuisine: "Test Cuisine"
        }
        const response = await request(app).post("/restaurants").send(newRestaurant);
        // const restaurant = await Restaurant.findAll();
        expect(response.body.name).toBe(newRestaurant.name);
        expect(response.body.location).toBe(newRestaurant.location);
        expect(response.body.cuisine).toBe(newRestaurant.cuisine);
    })
    it("POST /restaurants returns error key with array if name, location, or cuisine fields are empty", async () => {
        const response = await request(app).post("/restaurants").send({name: "", location: "Houston", cuisine: "Mexican"});
        expect(response.statusCode).toBe(200);
        const responseData = JSON.parse(response.text);
        expect(responseData).toEqual({"errors": [{"location": "body", "msg": "Invalid value", "path": "name", "type": "field", "value": ""}]}  );
    });
    it("PUT /restaurants/:id updates the restaurant with provided value", async () => {
        const updatedRestaurant = {
            id: 2,
            name: "Updated Restaurant",
            location: "Updated Location",
            cuisine: "Updated Cuisine"
        }
        await request(app).put("/restaurants/2").send(updatedRestaurant);
        const restaurant = await Restaurant.findByPk(2);
        expect(restaurant.name).toBe(updatedRestaurant.name);
        expect(restaurant.location).toBe(updatedRestaurant.location);
        expect(restaurant.cuisine).toBe(updatedRestaurant.cuisine);
    })
    it("DELETE /restaurants/:id deletes the restaurant with provided id", async () => {
        const response = await request(app).delete("/restaurants/1");
        expect(response.body).toBe(1);
    })

})