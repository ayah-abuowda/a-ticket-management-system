var express = require("express");
var mongoose = require("mongoose"); //defining data modeling and connecting to the databasen
var morgan = require("morgan");
var path = require("path");
var cors = require("cors");
var history = require("connect-history-api-fallback");
var bodyParser = require("body-parser"); //parsing the incoming request bodies in a middleware before you handle it.

//require('dotenv').config(); //to use env variables
//require ("./dropdb/connectDB");

const customersController = require("./controllers/customers");
const ticketsController = require("./controllers/tickets");

// Variables
var mongoURI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/animalDevelopmentDB"; //create own database on mongodb
var port = process.env.PORT || 3000;
// var RESET_PASSWORD_KEY = process.env.RESET_PASSWORD_KEY

// Connect to MongoDB
mongoose.connect(
  mongoURI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err) {
    if (err) {
      console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
      console.error(err.stack);
      process.exit(1);
    }
    console.log(`Connected to MongoDB with URI: ${mongoURI}`);
  }
);

mongoose.set("useFindAndModify", false);

// Create Express app
var app = express();

// const router = require('express').Router();

// Parse requests of content-type 'application/json'
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HTTP request logger
app.use(morgan("dev"));
// Enable cross-origin resource sharing for frontend must be registered before api
app.options("*", cors());
app.use(cors());
app.use(bodyParser.json());

//import routes
app.get("/api", (req, res) => {
  res.json({ message: "this route is used by test" });
});

app.get("/api", function (req, res) {
  res.json({ "message ": "Welcome to your DIT341 Backend ExpressJS Project" });
});

// make the app using our controllers
app.use("/api/customers", customersController);
app.use("/api/tickets", ticketsController);

// Catch all non-error handler for api (i.e., 404 Not Found)
app.use("/api/customers", function (req, res) {
  console.log("Run catch -all 404 handler");
  res.status(404).json({ message: "Not Found" });
});

// Configuration for serving frontend in production mode
// Support Vuejs HTML 5 history mode

app.use(history());
// Serve static assets
var root = path.normalize(__dirname + "/..");
var client = path.join(root, "client", "dist");
app.use(express.static(client));

// Error handler (i.e., when exception is thrown) must be registered last
var env = app.get("env");
// eslint-disable-next-line no-unused-vars
app.use(function (err, req, res, next) {
  console.error(err.stack); // in which the line the application crashed
  var err_res = {
    message: err.message,
    error: {},
  };
  if (env === "development") {
    // Return sensitive stack trace only in dev mode
    err_res["error"] = err.stack;
  }
  res.status(err.status || 500);
  res.json(err_res);
});

app.listen(port, function (err) {
  if (err) throw err;
  console.log(`Express server listening on port ${port}, in ${env} mode`);
  console.log(`Backend: http://localhost:${port}/api/`);
  console.log(`Frontend (production): http://localhost:${port}/`);
});

module.exports = app;
