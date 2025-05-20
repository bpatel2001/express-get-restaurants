const app = require("./src/app");
const db = require("./db/connection");

// TODO: Create your GET Request Route Below:

const port = 3000;

app.listen(port, async () => {
  await db.sync();
  console.log(`Listening at http://localhost:${port}/restaurants`);
});
