const express = require("express");
const app = express();
const port = 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const routes = require("./settings/routes");
routes(app);

app.listen(port, () => {
    console.log(`The app is on port ${port}`);
});

module.exports.app = app;
