module.exports = (app) => {
  const stocks = require("../controllers/stock.controller.js");

  var router = require("express").Router();

  // Create a new Quote
  router.post("/", stocks.create);

  // Retrieve all Quotes
  router.get("/", stocks.findAll);

  // Retrieve a single Quote with id
  router.get("/:id", stocks.findOne);

  // Update a Quote with id
  router.put("/:id", stocks.update);

  // Delete a Quote with id
  router.delete("/:id", stocks.delete);

  // Delete all Quotes
  router.delete("/", stocks.deleteAll);

  app.use("/api/stocks", router);
};
  