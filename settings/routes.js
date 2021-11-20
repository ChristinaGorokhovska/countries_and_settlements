module.exports = (app) => {
    const userController = require("../controllers/userController");
    const { body } = require("express-validator");

    app.post(
        "/api/auth/signup",
        body("user_email").isEmail(),
        body("user_password").isLength({ min: 8 }),
        userController.signup
    );
    app.post(
        "/api/auth/signin",
        body("user_email").isEmail(),
        body("user_password").exists().isLength({ min: 8 }),
        userController.signin
    );
};
