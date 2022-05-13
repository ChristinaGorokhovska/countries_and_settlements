const db = require("../settings/db");

//Create
exports.createSettlement = (req, res) => {
  console.log(req.body);
  const sql =
    "INSERT INTO settlements (name_settlement, is_capital, country_id, settlement_type_id, population_type_id, relief_type_id, population, year_of_foundation, descriptions, material, image_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [
      req.body.nameSettlement,
      req.body.isCapitalSettlement || false,
      req.body.countrySettlement || null,
      req.body.typeSettlement || null,
      req.body.populationTypeSettlement || null,
      req.body.reliefSettlement || null,
      req.body.populationSettlement,
      req.body.yearSettlement || null,
      req.body.descriptionsSettlement || null,
      req.body.materialSettlement || null,
      req.body.pathSettlement || null,
    ],
    (error, rows, fields) => {
      if (error) {
        res.status(400).json({ errors: error });
      } else {
        res.status(200).json({ message: "Settlement is created!" });
      }
    }
  );
};

exports.createCountry = (req, res) => {
  db.query(
    "SELECT id, country_code, name_country FROM countries WHERE country_code = ?",
    [req.body.codeCountry],
    (error, rows, field) => {
      if (error) {
        res.status(400).json({ errors: error });
      } else if (typeof rows !== undefined && rows.length > 0) {
        const row = JSON.parse(JSON.stringify(rows));
        row.map((rw) => {
          res.status(302).json({ message: `Such country code (${rw.country_code}) is existed` });
        });
      } else {
        db.query(
          "SELECT id, country_code, name_country FROM countries WHERE name_country = ?",
          [req.body.nameCountry],
          (error, rows, field) => {
            if (error) {
              res.status(400).json({ errors: error });
            } else if (typeof rows !== undefined && rows.length > 0) {
              const row = JSON.parse(JSON.stringify(rows));
              row.map((rw) => {
                res.status(302).json({ message: `Such country (${rw.name_country}) is existed` });
              });
            } else {
              const sql =
                "INSERT INTO countries (country_code, name_country, square, climate_type_id, population, currency, descriptions, material, flag_image_path, country_history) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
              db.query(
                sql,
                [
                  req.body.codeCountry.toUpperCase(),
                  req.body.nameCountry,
                  req.body.squareCountry || null,
                  req.body.climateCountry || null,
                  req.body.populationCountry || null,
                  req.body.currencyCountry || null,
                  req.body.descriptionsCountry || null,
                  req.body.materialCountry || null,
                  req.body.pathCountry || null,
                  req.body.historyCountry || null,
                ],

                (error, rows, fields) => {
                  if (error) {
                    res.status(400).json({ errors: error, message: "Such country or code are existed" });
                  } else {
                    res.status(200).json({ message: "Country is created!" });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
  // const sql =
  //   "INSERT INTO countries (country_code, name_country, square, climate_type_id, population, currency, descriptions, material, flag_image_path, country_history) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  // db.query(
  //   sql,
  //   [
  //     req.body.codeCountry,
  //     req.body.nameCountry,
  //     req.body.squareCountry || null,
  //     req.body.climateCountry || null,
  //     req.body.populationCountry || null,
  //     req.body.currencyCountry || null,
  //     req.body.descriptionsCountry || null,
  //     req.body.materialCountry || null,
  //     req.body.pathCountry || null,
  //     req.body.historyCountry || null,
  //   ],

  //   (error, rows, fields) => {
  //     if (error) {
  //       res.status(400).json({ errors: error, message: "Such country or code are existed" });
  //     } else {
  //       res.status(200).json({ message: "Country is created!" });
  //     }
  //   }
  // );
};
