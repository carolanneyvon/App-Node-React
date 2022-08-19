const ENUM = require("../config/enum.config.js");
const db = require("../models/Db.class.js");
const Order = db.models.order;
const Op = db.Sequelize.Op;
const orderid = require("order-id");

// Create and Save a new Order
exports.create = (req, res) => {
  // Validate request
  if (!req.body.quoteId) {
    res.status(400).send({
      message: "Field quoteId required",
    });
    return;
  }

  // Create a Order
  const order = {
    quoteId: req.body.quoteId,
    number: "O" + orderid.generate(),
    // enum status : {new: "Nouvelle", validated: "Validée", delivred: "Livrée"}
    status: req.body.status ? req.body.status : ENUM.order.status.new,
    // enum priority : {critical: "Très Urgent", urgent: "Urgent", normal: "Normal", low: "Non prioritaire"}
    priority: req.body.priority
      ? req.body.priority
      : ENUM.order.priority.normal,
  };

  // Save Order in the database
  Order.create(order)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the order. (" + err.message + ")",
      });
    });
};

// Retrieve all Orders from the database.
exports.findAll = (req, res) => {
  const priority = req.body.priority;
  var condition = priority
    ? { priority: { [Op.like]: `%${priority}%` } }
    : null;

  // Eager Loading : fetch data from all assiociated tables too
  Order.findAll({ where: condition, include: [{ all: true, nested: true }] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving order. (" + err.message + ")",
      });
    });
};

// Find a single Order with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Order.findByPk(id, { include: [{ all: true, nested: true }] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Error retrieving order with id=" + id + " (" + err.message + ")",
      });
    });
};

// Update a Order by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Order.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Order was updated successfully.",
        });
      } else {
        res.send({
          message:
            `Cannot update order with id=${id}. Maybe order was not found or req.body is empty!` +
            " (" +
            err.message +
            ")",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Error updating order with id=" + id + " (" + err.message + ")",
      });
    });
};

// Delete a Order with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Order.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Order was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete order with id=${id}. Maybe Order was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Could not delete order with id=" + id + " (" + err.message + ")",
      });
    });
};

// Delete all Orders from the database.
exports.deleteAll = (req, res) => {
  Order.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Orders were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all orders. (" +
            err.message +
            ")",
      });
    });
};
