const db = require("../models/Db.class.js");
const Vehicle = db.models.vehicle;
const Op = db.Sequelize.Op;

// Create and Save a new Vehicle
exports.create = (req, res) => {
  // Validate request
  if (!req.body.model) {
    res.status(400).send({
      message: "field model can not be empty!",
    });
    return;
  }

  // Create a Vehicle
  const vehicle = {
    model: req.body.model,
    manufacturer: req.body.manufacturer,
    type: req.body.type,
    description: req.body.description,
    price: req.body.price,
    quantity: req.body.quantity,
  };

  // Save Vehicle in the database
  Vehicle.create(vehicle)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Vehicle. (" + err.message + ")",
      });
    });
};

// Retrieve all Vehicles from the database.
exports.findAll = (req, res) => {
  const query_name = req.query.name;

  const condition = query_name
    ? { name: { [Op.like]: `%${query_name}%` } } // ie: field table name like '%name query value%'
    : null;

  Vehicle.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving vehicles. (" + err.message + ")",
      });
    });
};

// Find a single Vehicle with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Vehicle.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Vehicle with id=" + id + " (" + err.message + ")",
      });
    });
};

// Update a Vehicle by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Vehicle.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Vehicle was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Vehicle with id=${id}. Maybe Vehicle was not found or req.body is empty!` + " (" + err.message + ")",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Vehicle with id=" + id + " (" + err.message + ")",
      });
    });
};

// Delete a Vehicle with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Vehicle.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Vehicle was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Vehicle with id=${id}. Maybe Vehicle was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Vehicle with id=" + id + " (" + err.message + ")",
      });
    });
};

// Delete all Vehicles from the database.
exports.deleteAll = (req, res) => {
  Vehicle.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Vehicles were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all vehicles. (" + err.message + ")",
      });
    });
};
