const db = require("../settings/db");

// Update
exports.updateSettlement = (req, res) => {
  // Формування запиту
  const sql = "SELECT name_settlement FROM Settlements WHERE id = '" + req.params.id + "'";

  // Відправка запиту до бази даних
  db.query(sql, (error, rows, fields) => {
    if (error) {
      // Помилка
      res.status(400).json({ errors: error });
    } else if (rows.length <= 0) {
      // Такий населений пункт не знайдено
      res.status(401).json({
        message: `Such settlement not found`,
      });
    } else {
      // Формування запиту
      const sql =
        "UPDATE settlements SET name_settlement = ?, population = ?, year_of_foundation = ?, is_capital = ?, country_id = ?, settlement_type_id = ?, population_type_id = ?, relief_type_id = ?, material = ?, descriptions = ?, image_path = ?  WHERE id = ?";
      //відправка запиту до серверу
      db.query(
        sql,
        // Параметри що передаються
        [
          req.body.nameSettlement,
          req.body.populationSettlement,
          req.body.yearSettlement || null,
          req.body.isCapitalSettlement || null,
          req.body.countrySettlement || null,
          req.body.typeSettlement || null,
          req.body.populationTypeSettlement || null,
          req.body.reliefSettlement || null,
          req.body.materialSettlement || null,
          req.body.descriptionsSettlement || null,
          req.body.pathSettlement || null,
          req.params.id,
        ],
        (error, rows, fields) => {
          if (error) {
            // Помилка
            res.status(400).json({ errors: error });
          } else {
            // Успішний статус відправка результату
            res.status(200).json({ message: "Settlement is updated!" });
          }
        }
      );
    }
  });
};

exports.updateCountry = (req, res) => {
  // Відправка запиту до бази даних
  db.query(
    "SELECT id, country_code, name_country FROM countries WHERE country_code = ? AND id <> ?",
    [req.body.codeCountry, req.params.id],
    (error, rows, field) => {
      if (error) {
        // Помилка
        res.status(400).json({ errors: error });
      } else if (typeof rows !== undefined && rows.length > 0) {
        const row = JSON.parse(JSON.stringify(rows));
        row.map((rw) => {
          // Такий код вже існує
          res.status(302).json({ message: `Such code (${rw.country_code}) is existed` });
        });
      } else {
        // Відправка запиту до бази даних
        db.query(
          "SELECT id, country_code, name_country FROM countries WHERE name_country = ? AND id <> ?",
          [req.body.nameCountry, req.params.id],
          (error, rows, field) => {
            if (error) {
              // Помилка
              res.status(400).json({ errors: error });
            } else if (typeof rows !== undefined && rows.length > 0) {
              const row = JSON.parse(JSON.stringify(rows));
              row.map((rw) => {
                // Така країна вже існє
                res.status(302).json({ message: `Such country (${rw.name_country}) is existed` });
              });
            } else {
              // Формування
              const sql = "SELECT name_country FROM countries WHERE id = '" + req.params.id + "'";

              // Відправка запиту до бази даних
              db.query(sql, (error, rows, fields) => {
                if (error) {
                  // Помилка
                  res.status(400).json({ errors: error });
                } else if (rows.length <= 0) {
                  // Країна не знайдена
                  res.status(401).json({
                    message: `Such country not found`,
                  });
                } else {
                  // Формування запиту
                  const sql =
                    "UPDATE countries SET country_code = ?, name_country = ?, square = ?, climate_type_id = ?, population = ?, currency = ?, descriptions = ?, material = ?, flag_image_path = ?, country_history = ? WHERE id = ?";
                  // Відправка запиту до бази даних
                  db.query(
                    sql,
                    // параметри що передаються
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
                      req.params.id,
                    ],
                    (error, rows, fields) => {
                      if (error) {
                        // Помилка
                        res.status(400).json({ errors: error });
                      } else {
                        // Успішний статус відправка результату
                        res.status(200).json({ message: "Country is updated!" });
                      }
                    }
                  );
                }
              });
            }
          }
        );
      }
    }
  );
};
