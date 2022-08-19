module.exports = (app) => {
  const invoices = require('../controllers/invoice.controller.js')

  const router = require('express').Router();

  // Create a new Invoice
  router.post("/", invoices.create);

  // Retrieve all Invoices
  router.get("/", invoices.findAll);

  // Retrieve all published Invoices
  router.get("/order/:order", invoices.findAllByOrder);

  // Retrieve a single Invoice with id
  router.get("/:id", invoices.findOne);

  // Update an Invoice with id
  router.put("/:id", invoices.update);

  // Delete an Invoice with id
  router.delete("/:id", invoices.delete);

  // Delete all Invoices
  router.delete("/", invoices.deleteAll);

  app.use("/api/invoices", router);
}