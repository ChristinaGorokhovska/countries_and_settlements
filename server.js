const express = require("express");
const path = require("path");
const app = express();
const port = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const routes = require("./settings/routes");
routes(app);

app.use("/images", express.static(path.join(__dirname, "images")));

app.listen(port, () => {
  console.log(`The app is on port ${port}`);
});

module.exports.app = app;
