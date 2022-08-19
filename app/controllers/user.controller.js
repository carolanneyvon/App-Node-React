const ENUM = require("../config/enum.config.js");
const db = require("../models/Db.class.js");
const User = db.models.user;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.firstname || !req.body.lastname) {
    res.status(400).send({
      message: "Fields firstname et lastname can not be empty! (" + err.message + ")",
    });
    return;
  }

  // Create a User
  const user = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    role: req.body.role ? req.body.role : ENUM.user.role.dealer, // enum role : { admin: "Administrateur", dealer: "Commercial", boss: "Patron" }
    active: req.body.active,
  };

  // Save User in the database
  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User. (" + err.message + ")",
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const query_firstname = req.query.firstname;

  const condition = query_firstname
    ? { firstname: { [Op.like]: `%${query_firstname}%` } } // ie: field table firstname like '%firstname query value%'
    : null;

  User.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users. (" + err.message + ")",
      });
    });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id + " (" + err.message + ")",
      });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!` + " (" + err.message + ")",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id + " (" + err.message + ")",
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id + " (" + err.message + ")",
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all users. (" + err.message + ")",
      });
    });
};

// find all User by role
exports.findAllByRole = (req, res) => {
  User.findAll({ where: { role: req.query.role } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users. (" + err.message + ")",
      });
    });
};
