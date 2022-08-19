// Get environement variables
// process.env.<ENV_VAR> available into whole server.js project
const dotenv = require("dotenv");
dotenv.config();

// db management by ORM Sequelize
const db = require("./app/models/Db.class.js");
// Call fixtures function to load db
const cmdArgs = process.argv.slice(2);
if (cmdArgs.indexOf("reload-db") != -1) {
  db.sequelize.sync({ force: true }).then(() => {
    console.log("ORM: Drop and re-sync db.");
    // Import fixtures (test data) into db
    if (cmdArgs.indexOf("with-fixtures") != -1) {
      require("./app/fixtures/");
    }
  });
} else {
  db.sequelize.sync().then(() => {
    console.log("ORM: Sync only missing fields.");
  });
}

// Framework Express
const express = require("express");
// API body-parser
const bodyParser = require("body-parser");
// CORS
const cors = require("cors");
// App devient la fonctionnalité express
const app = express();

const corsOptions = {
  origin: "*", //http://localhost:3000/
};
app.use(cors(corsOptions));

// parse requests of content-type: application/json
app.use(bodyParser.json());
// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Add response header for middleware autorisations
app.all("", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// middleware
app.use(express.static("react/build"));

// server root route for react app built
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/react/build/index.html", (err) => {
    // file ./react/build/index.html not found => maybe forgot to build react app
    if (err.code === "ENOENT" && err.syscall === "stat") {
      res
        .status(404)
        .sendFile(__dirname + "/app/views/errors/404-react-not-built");
    }
  });
});

// require all routes controller
db.models_name.map((model_name) => {
  require(`./app/routes/${model_name}.routes.js`)(app);
});

// root route for react app built
app.get("*", (req, res) => {
  let ext = 'json';
  const acceptIndex = req.rawHeaders.indexOf("Accept");
  if(acceptIndex != -1) {
    const contentType = req.rawHeaders[acceptIndex + 1];
    if(contentType.indexOf('/html,') != -1) {
      ext = 'html';
    }
  }
  res.status(404).sendFile(__dirname + `/app/views/errors/404.${ext}`);
});

// set port, listen for requests
const API_PORT = process.env.API_PORT || 3001;
app.listen(API_PORT, () => {
  console.log(`Server is running on port ${API_PORT}.`);
});
