const ENUM = require("../config/enum.config.js");
const db = require("../models/Db.class.js");
const Quote = db.models.quote;
const Op = db.Sequelize.Op;
const orderid = require("order-id");

// Create and Save a new Quote
exports.create = (req, res) => {
  // Validate request
  if (!req.body.customerId || !req.body.vehicleId || !req.body.creatorId) {
    res.status(400).send({
      message:
        "A quote need at least a customerId, a vehicleId and a creatorId",
    });
    return;
  }

  // Create a Quote
  const quote = {
    number: "Q" + orderid.generate(),
    quantity: req.body.quantity,
    // unit_price: req.body.unit_price,
    // enum status: { pending: "En attente", accepted: "Accepté", rejected: "Rejeté" }
    status: req.body.status ? req.body.status : ENUM.quote.status.pending,
    customerId: req.body.customerId,
    vehicleId: req.body.vehicleId,
    creatorId: req.body.creatorId,
  };

  // Save Quote in the database
  Quote.create(quote)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the quote. (" + err.message + ")",
      });
    });
};

// Retrieve all Quotes from the database.
exports.findAll = (req, res) => {
  const status = req.body.status;
  var condition = status ? { status: { [Op.like]: `%${status}%` } } : null;

  Quote.findAll({ where: condition, include:[{ all: true, nested: true }] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving quotes. (" + err.message + ")",
      });
    });
};

// Find a single Quote with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Quote.findByPk(id, { include:[{ all: true, nested: true }] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Quote with id=" + id + " (" + err.message + ")",
      });
    });
};

// Update a Quote by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Quote.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Quote was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update quote with id=${id}. Maybe quote was not found or req.body is empty!` + " (" + err.message + ")",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating quote with id=" + id + " (" + err.message + ")",
      });
    });
};

// Delete a Quote with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Quote.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Quote was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete quote with id=${id}. Maybe quote was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete quote with id=" + id + " (" + err.message + ")",
      });
    });
};

// Delete all Quotes from the database.
exports.deleteAll = (req, res) => {
  Quote.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Quotes were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all quote. (" + err.message + ")",
      });
    });
};
