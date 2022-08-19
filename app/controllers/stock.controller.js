const db = require("../models/Db.class.js");
const Stock = db.models.stock;
const Op = db.Sequelize.Op;

// Create and Save a new Stock
exports.create = (req, res) => {
  // Validate request
  if (!req.body.quantity || !req.body.vehicleId) {
    res.status(400).send({
      message: "fields quantity and vehicleId can not be empty!",
    });
    return;
  }

  // Create a Stock
  const stock = {
    vehicleId: req.body.vehicleId,
    quantity: req.body.quantity,
  };

  // Save Stock in the database
  Stock.create(stock)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the Stock. (" + err.message + ")",
      });
    });
};

// Retrieve all Stocks from the database.
exports.findAll = (req, res) => {
  const query_name = req.query.name;

  const condition = query_name
    ? { name: { [Op.like]: `%${query_name}%` } } // ie: field table name like '%name query value%'
    : null;

  Stock.findAll({ where: condition, include: [{ all: true, nested: true }] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving stocks. (" + err.message + ")",
      });
    });
};

// Find a single Stock with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Stock.findByPk(id, { include: [{ all: true, nested: true }] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Error retrieving Stock with id=" + id + " (" + err.message + ")",
      });
    });
};

// Update a Stock by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Stock.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Stock was updated successfully.",
        });
      } else {
        res.send({
          message:
            `Cannot update Stock with id=${id}. Maybe Stock was not found or req.body is empty!` +
            " (" +
            err.message +
            ")",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Error updating Stock with id=" + id + " (" + err.message + ")",
      });
    });
};

// Delete a Stock with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Stock.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Stock was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Stock with id=${id}. Maybe Stock was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Could not delete Stock with id=" + id + " (" + err.message + ")",
      });
    });
};

// Delete all Stocks from the database.
exports.deleteAll = (req, res) => {
  Stock.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Stocks were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all stocks. (" +
            err.message +
            ")",
      });
    });
};
