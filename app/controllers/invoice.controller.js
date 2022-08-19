const db = require("../models/Db.class.js");
const Invoice = db.models.invoice;
const orderid = require("order-id");

// Create and Save a new Order
exports.create = (req, res) => {
  //Validate request
  if (!req.body.orderId) {
    res.status(400).send({
      message: "Field orderId can not be empty!",
    });
    return;
  }

  // Create a Invoice
  const invoice = {
    orderId: req.body.orderId,
    number: "I" + orderid.generate(),
    sellingPrice: req.body.sellingPrice,
  };

  // Save order in the database
  Invoice.create(invoice)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the invoice (" +
            err.message +
            ")",
      });
    });
};

// Retrieve all Invoices from the database
exports.findAll = (req, res) => {
  const query_order = req.query.order;
  Invoice.findAll({ include:[{ all: true, nested: true }] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving invoices (" + err.message + ")",
      });
    });
};

// Find a single Invoice with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Invoice.findByPk(id, { include:[{ all: true, nested: true }] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Invoice with id=" + id + " (" + err.message + ")",
      });
    });
};

// Update an Invoice by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Invoice.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Invoice was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Invoice with id=${id}. Maybe Invoice was not found or req.body is empty!` + " (" + err.message + ")",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Invoice with id=" + id + " (" + err.message + ")",
      });
    });
};

// Delete an Invoice with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Invoice.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Invoice was deleted successfully",
        });
      } else {
        res.send({
          message: `Cannot delete Invoice with id=${id}. Maybe Invoice was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Invoice with id=" + id + " (" + err.message + ")",
      });
    });
};

// Delete all Invoices from the database.
exports.deleteAll = (req, res) => {
  Invoice.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} Invoices were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all invoices (" + err.message + ")",
      });
    });
};

// Find all Invoices by order
exports.findAllByOrder = (req, res) => {
  Invoice.findAll({ where: { order: req.query.order } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving invoices (" + err.message + ")",
      });
    });
};
