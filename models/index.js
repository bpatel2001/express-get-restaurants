const Restaurant = require("./Restaurant");
const Item = require("./Item");
const Menu = require("./Menu");

Restaurant.hasMany(Menu);
Menu.belongsTo(Restaurant);

Item.belongsToMany(Menu , { through: "menu_items" });
Menu.belongsToMany(Item, { through: "menu_items" });

module.exports = { Restaurant, Item, Menu };
