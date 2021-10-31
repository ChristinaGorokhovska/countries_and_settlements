const express = require("express");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Test Hello!");
});

app.listen(port, () => {
    console.log(`The app is listening on port ${port}`);
});
