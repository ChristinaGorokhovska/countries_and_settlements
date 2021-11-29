const db = require("../settings/db");

exports.getDefaultSettlements = (req, res) => {
    db.query("SELECT * FROM `default_settlements`", (error, rows, field) => {
        if (error) {
            res.status(400).json({ errors: error });
        } else {
            res.status(200).send(rows);
        }
    });
};
