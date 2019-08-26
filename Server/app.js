/** Express app for Synapsefi takehom. */


const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const router = express.Router();

app.use(express.json());
app.use(cors());

// add logging system

app.use(morgan("tiny"));

const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

app.use("/users", userRoutes);
app.use("/", authRoutes);

/** 404 handler */

app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;

  // pass the error to the next piece of middleware
  return next(err);
});

/** general error handler */

app.use(function (err, req, res, next) {
  // if (err.stack) console.log(err.stack);

  res.status(err.status || 500);
  return res.json({
    message: err.message
  });
});


module.exports = app;
