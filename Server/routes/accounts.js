/** Routes for accounts. */

const express = require("express");
const router = express.Router();
const User = require('../models/users');
const { authRequired } = require('../middleware/auth');


router.get("/", authRequired, async function(req, res, next) {
  try {
    const accounts = await User.getAccounts(req.synapseId);
    console.log(accounts);
    
    return res.json(accounts);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
