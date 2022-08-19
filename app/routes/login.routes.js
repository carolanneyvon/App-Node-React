module.exports = (app) => {
  const logins = require("../controllers/login.controller.js");

  var router = require("express").Router();

  // Auth with login / pass
  router.get("/auth", logins.auth);

  // Create a new Login
  router.post("/", logins.create);

  // Retrieve all Logins
  router.get("/", logins.findAll);

  // Retrieve a single Login with id
  router.get("/:id", logins.findOne);

  // Update a Login with id
  router.put("/:id", logins.update);

  // Delete a Login with id
  router.delete("/:id", logins.delete);

  // Delete all Logins
  router.delete("/", logins.deleteAll);

  app.use("/api/logins", router);
};
