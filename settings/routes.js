module.exports = (app) => {
  const userController = require("../controllers/userController");
  const mainPageController = require("../controllers/mainPageController");
  const createController = require("../controllers/createController");
  const updateController = require("../controllers/updateController");
  const { body } = require("express-validator");
  const fileMiddleware = require("../middleware/file");

  //registration
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

  //search
  app.get("/api/main/search/countries/:searchName", mainPageController.getCountry);
  app.get("/api/main/search/settlements/:searchName", mainPageController.getSettlement);

  //delete
  app.delete("/api/main/search/countries/:id", mainPageController.deleteCountry);
  app.delete("/api/main/search/settlements/:id", mainPageController.deleteSettlement);

  //update
  app.put("/api/main/search/settlements/:id", updateController.updateSettlement);
  app.put("/api/main/search/countries/:id", updateController.updateCountry);

  //create
  app.post("/api/main/create/countries", createController.createCountry);
  app.post("/api/main/create/settlements", createController.createSettlement);

  //get all
  app.get("/api/main/search/countries", mainPageController.getAllCountries);
  app.get("/api/main/search/settlementTypes", mainPageController.getAllSettlementsTypes);
  app.get("/api/main/search/populationTypes", mainPageController.getAllPopulationTypes);
  app.get("/api/main/search/climateTypes", mainPageController.getAllClimateTypes);
  app.get("/api/main/search/reliefTypes", mainPageController.getAllReliefTypes);
  app.get("/api/main/topCountries", mainPageController.getTopCountries);

  //images
  app.put(
    "/api/main/search/countries/upload/:id",
    fileMiddleware.single("adminImageCountry"),
    mainPageController.setImageCountry
  );
  app.put(
    "/api/main/search/settlements/upload/:id",
    fileMiddleware.single("adminImageSettlement"),
    mainPageController.setImageSettlement
  );

  app.post(
    "/api/main/search/countries/load",
    fileMiddleware.single("newImageCountry"),
    mainPageController.createImageCountry
  );
  app.post(
    "/api/main/search/settlements/load",
    fileMiddleware.single("newImageSettlement"),
    mainPageController.createImageSettlement
  );

  //logs
  app.get("/api/logTable", mainPageController.getLogs);
  app.delete("/api/logTable", mainPageController.deleteLogs);
};
