/** Express app for Synapsefi takehome. */


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
const accountsRoutes = require("./routes/accounts");

app.use("/users", userRoutes);
app.use("/accounts", accountsRoutes);
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
  res.status(err.status || 500);
  console.log(err.response.data.error);
  
  return res.json({
    message: err.message
  });
});


module.exports = app;
