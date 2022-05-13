const db = require("../settings/db");

exports.getCountry = (req, res) => {
  console.log("params", req.params.searchName);
  const sql = "SELECT * FROM `AllCountries` WHERE `name_country` ='" + req.params.searchName + "' ";

  db.query(sql, (error, rows, fields) => {
    if (error) {
      res.status(400).json({ errors: error });
    } else if (rows.length <= 0) {
      res.status(401).json({ message: `Such country ${req.params.searchName} not found` });
    } else {
      res.status(200).send(rows);
    }
  });
};

exports.getSettlement = (req, res) => {
  const sql = "SELECT * FROM `AllSettlements` WHERE `name_settlement` = '" + req.params.searchName + "' ";

  db.query(sql, (error, rows, fields) => {
    if (error) {
      res.status(400).json({ errors: error });
    } else if (rows.length <= 0) {
      res.status(401).json({ message: `Such settlement ${req.params.searchName} not found` });
    } else {
      res.status(200).send(rows);
    }
  });
};

//Delete
exports.deleteCountry = (req, res) => {
  const sql = "DELETE FROM countries WHERE id = '" + req.params.id + "'";

  db.query(sql, (error, rows, fields) => {
    if (error) {
      res.status(400).json({ errors: error });
    } else {
      res.status(200).json({ message: "Country is deleted!" });
    }
  });
};

exports.deleteSettlement = (req, res) => {
  const sql = "DELETE FROM settlements WHERE id = '" + req.params.id + "'";

  db.query(sql, (error, rows, fields) => {
    if (error) {
      res.status(400).json({ errors: error });
    } else {
      res.status(200).json({ message: "Settlement is deleted!" });
    }
  });
};

//Get all
exports.getAllCountries = (req, res) => {
  const sql = "SELECT * FROM AllCountries";

  db.query(sql, (error, rows) => {
    if (error) {
      res.status(400).json({ errors: error });
    } else if (rows.length <= 0) {
      res.status(401).json({
        message: "There are not countries",
      });
    } else {
      res.status(200).send(rows);
    }
  });
};

exports.getAllSettlementsTypes = (req, res) => {
  const sql = "SELECT * FROM settlement_type";

  db.query(sql, (error, rows) => {
    if (error) {
      res.status(400).json({ errors: error });
    } else if (rows.length <= 0) {
      res.status(401).json({
        message: "There are not settlement types",
      });
    } else {
      res.status(200).send(rows);
    }
  });
};

exports.getAllPopulationTypes = (req, res) => {
  const sql = "SELECT * FROM population_type";

  db.query(sql, (error, rows) => {
    if (error) {
      res.status(400).json({ errors: error });
    } else if (rows.length <= 0) {
      res.status(401).json({
        message: "There are not population types",
      });
    } else {
      res.status(200).send(rows);
    }
  });
};

exports.getAllClimateTypes = (req, res) => {
  const sql = "SELECT * FROM climate_type";

  db.query(sql, (error, rows) => {
    if (error) {
      res.status(400).json({ errors: error });
    } else if (rows.length <= 0) {
      res.status(401).json({
        message: "There are not climate types",
      });
    } else {
      res.status(200).send(rows);
    }
  });
};

exports.getAllReliefTypes = (req, res) => {
  const sql = "SELECT * FROM relief_type";

  db.query(sql, (error, rows) => {
    if (error) {
      res.status(400).json({ errors: error });
    } else if (rows.length <= 0) {
      res.status(401).json({
        message: "There are not relief types",
      });
    } else {
      res.status(200).send(rows);
    }
  });
};

exports.getTopCountries = (req, res) => {
  const sql = "SELECT * FROM top_countries";

  db.query(sql, (error, rows) => {
    if (error) {
      res.status(400).json({ errors: error });
    } else if (rows.length <= 0) {
      res.status(401).json({
        message: "There are not top countries",
      });
    } else {
      res.status(200).send(rows);
    }
  });
};

//Images
exports.setImageCountry = (req, res) => {
  try {
    if (req.file) {
      req.file.path = "\\" + req.file.path;
      // let str = req.file.path;
      // req.file.path = str.replace(/\\/g, "\\\\");
      res.status(200).send(req.file);
    }
  } catch (error) {
    console.log("Here", error);
  }
};

exports.setImageSettlement = (req, res) => {
  try {
    if (req.file) {
      req.file.path = "\\" + req.file.path;
      res.status(200).send(req.file);
    }
  } catch (error) {
    console.log("Here", error);
  }
};

exports.createImageCountry = (req, res) => {
  try {
    if (req.file) {
      req.file.path = "\\" + req.file.path;
      res.status(200).send(req.file);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.createImageSettlement = (req, res) => {
  try {
    if (req.file) {
      req.file.path = "\\" + req.file.path;

      res.status(200).send(req.file);
    }
  } catch (error) {
    console.log(error);
  }
};

//Logs
exports.getLogs = (req, res) => {
  const sql = "SELECT * FROM log_table";

  db.query(sql, (error, rows) => {
    if (error) {
      res.status(400).json({ errors: error });
    } else if (rows.length <= 0) {
      res.status(401).json({
        message: "There are not logs",
      });
    } else {
      res.status(200).send(rows);
    }
  });
};

exports.deleteLogs = (req, res) => {
  const sql = "CALL logs_clear()";

  db.query(sql, (error, rows) => {
    if (error) {
      res.status(400).json({ errors: error });
    } else {
      res.status(200).json({ message: "Logs deleted!" });
    }
  });
};
