const db = require("../settings/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/config");
const { validationResult } = require("express-validator");

exports.signup = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Incorrect email or password" });
    }

    db.query(
        "SELECT `id`, `user_email` FROM `users` WHERE `user_email` = '" + req.body.user_email + "'",
        (error, rows, field) => {
            if (error) {
                res.status(400).json({ errors: error });
            } else if (typeof rows !== undefined && rows.length > 0) {
                const row = JSON.parse(JSON.stringify(rows));
                row.map((rw) => {
                    res.status(302).json({ message: `Such user (${rw.user_email}) is existed` });
                });
            } else {
                const email = req.body.user_email;

                const salt = bcrypt.genSaltSync(10);
                const password = bcrypt.hashSync(req.body.user_password, salt);

                const sql =
                    "INSERT INTO `users` (`user_email`, `user_password`) VALUES ('" + email + "', '" + password + "')";

                db.query(sql, (error, results) => {
                    if (error) {
                        res.status(400).json({ errors: error, message: "Error" });
                    } else {
                        res.status(200).json({ message: "User is registered!" });
                    }
                });
            }
        }
    );
};

exports.signin = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Incorrect email or password" });
    }

    const sql =
        "SELECT `id`, `user_email`, `user_password` FROM `users` WHERE `user_email` = '" + req.body.user_email + "'";

    db.query(sql, (error, rows, fields) => {
        if (error) {
            res.status(400).json({ errors: error });
        } else if (rows.length <= 0) {
            res.status(401).json({
                message: `User with email ${req.body.user_email} not found. Please, register for the first!`,
            });
        } else {
            const row = JSON.parse(JSON.stringify(rows));
            row.map((rw) => {
                const password = bcrypt.compareSync(req.body.user_password, rw.user_password);

                if (password) {
                    const token = jwt.sign(
                        {
                            userId: rw.id,
                            email: rw.user_email,
                        },
                        config.jwt,
                        { expiresIn: "1h" }
                    );

                    res.status(200).json({ token: `Bearer ${token}`, userId: rw.id });
                } else {
                    res.status(401).json({ message: "Incorrect password or email" });
                }
                return true;
            });
        }
    });
};
