const { seedRestaurant, seedItem, seedMenu } = require("./seedData");
const db = require("./db/connection");
const { Item, Menu, Restaurant } = require("./models/index");

const syncSeed = async () => {
  await db.sync({ force: true });
  await Restaurant.bulkCreate(seedRestaurant);
  // BONUS: Update with Item and Menu bulkCreate
  const menus = await Menu.bulkCreate(seedMenu);
  const items = await Item.bulkCreate(seedItem);

  for (const menu of menus) {
    await menu.addItems(items);
  }
};

syncSeed();
