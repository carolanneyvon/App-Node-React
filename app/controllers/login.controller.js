const db = require("../models/Db.class.js");
const Login = db.models.login;
const Op = db.Sequelize.Op;

// Retrieve all Logins from the database.
exports.auth = (req, res) => {
  // Validate request
  console.log("req.body", req.query);
  if (!req.query.identifier || !req.query.password) {
    res.status(400).send({
      message: "Fields identifier et password can not be empty",
    });
    return;
  }

  const identifier = req.query.identifier.trim();
  const password = req.query.password.trim();
  var condition = {
    identifier: { [Op.eq]: `${identifier}` },
    password: { [Op.eq]: `${password}` },
  };

  Login.findAll({ where: condition, include: [{ all: true, nested: true }] })
    .then((data) => {
      if (data.length > 0) {
        res.send(data[0].user);
      } else {
        res.status(401).send({
          message: "Unauthorized credentials",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving customers." +
            " (" +
            err.message +
            ")",
      });
    });
};

// Create and Save a new Login
exports.create = (req, res) => {
  // Validate request
  if (!req.body.identifier || !req.body.password) {
    res.status(400).send({
      message: "Fields identifier et password can not be empty",
    });
    return;
  }

  // Create a Login
  const login = {
    identifier: req.body.identifier.trim(),
    password: req.body.password.trim(),
    userId: req.body.userId,
  };

  // Save Login in the database
  Login.create(login)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Some error occurred while creating the Login." +
          " (" +
          err.message +
          ")", // todo : err.message only for dev environement
      });
    });
};

// Retrieve all Logins from the database.
exports.findAll = (req, res) => {
  const identifier = req.query.identifier;
  var condition = identifier
    ? { identifier: { [Op.like]: `%${identifier}%` } }
    : null;

  Login.findAll({ where: condition, include: [{ all: true, nested: true }] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving customers." +
            " (" +
            err.message +
            ")",
      });
    });
};

// Find a single Login with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Login.findByPk(id, { include: [{ all: true, nested: true }] })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Error retrieving Login with id=" + id + " (" + err.message + ")",
      });
    });
};

// Update a Login by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Login.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Login was updated successfully.",
        });
      } else {
        res.send({
          message:
            `Cannot update Login with id=${id}. Maybe Login was not found or req.body is empty!` +
            " (" +
            err.message +
            ")",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Error updating Login with id=" + id + " (" + err.message + ")",
      });
    });
};

// Delete a Login with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Login.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Login was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Login with id=${id}. Maybe Login was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          "Could not delete Login with id=" + id + " (" + err.message + ")",
      });
    });
};

// Delete all Logins from the database.
exports.deleteAll = (req, res) => {
  Login.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Logins were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all customers." +
            " (" +
            err.message +
            ")",
      });
    });
};
