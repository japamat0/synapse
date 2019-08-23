/** Routes for logging in. */

const express = require("express");
const router = express.Router();
const User = require('../models/users');


router.post("/", async function(req, res, next) {
  try {
    console.log('login route payload: ', req.body);
    
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
