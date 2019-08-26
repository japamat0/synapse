/** Routes for logging in. */

const express = require("express");
const router = express.Router();

const User = require('../models/users');
const { createToken } = require('../lib/token');
const { authRequired } = require('../middleware/auth');

/**
 * Log user into our app
 */

router.post("/login", async function(req, res, next) {
  try {
    let user = await User.appLogin(req.body);
    user._token = createToken(user);
    console.log(user);
    return res.status(200).json(user);
    
  } catch (err) {
    return next(err);
  }
});

/**
 * get user details from synapse api
 */

router.get("/synapseUser", authRequired, async function(req, res, next) {
  try {
    let synapseUser = await User.getSynapseUser(req.synapseId);
    console.log(synapseUser);
    
    return res.status(200).json(synapseUser);
  } catch (err) {
    return next(err);
  }
});

/**
 * Begin synapse oauth process
 */

router.get("/synapseOAuth", authRequired, async function(req, res, next) {
  try {
    let synapseUser = await User.oAuth(req.synapseId);
    console.log(synapseUser);
    
    return res.status(200).json(synapseUser);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
