module.exports = (app) => {
  const quotes = require("../controllers/quote.controller.js");

  var router = require("express").Router();

  // Create a new Stock
  router.post("/", quotes.create);

  // Retrieve all Stocks
  router.get("/", quotes.findAll);

  // Retrieve a single Stock with id
  router.get("/:id", quotes.findOne);

  // Update a Stock with id
  router.put("/:id", quotes.update);

  // Delete a Stock with id
  router.delete("/:id", quotes.delete);

  // Delete all Stocks
  router.delete("/", quotes.deleteAll);

  app.use("/api/quotes", router);
};
  