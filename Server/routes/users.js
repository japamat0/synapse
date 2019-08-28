/** Routes for users. */

const express = require("express");
const router = express.Router();
const User = require('../models/users');
const { createToken } = require('../lib/token');

/**
 * endpoint for checking username availability - username is sent in querystring
 */
router.get("/availability", async function(req, res, next) {
  try {
    const available = await User.checkAvailability(req.query.username);
    return res.json({ isAvailable: available });
  } catch (err) {
    return next(err);
  }
});


/**
 * Handles post requests for user creation
 */
router.post("/", async function(req, res, next) {
  try {
    delete req.body._token;
    const user = await User.registerSynapse(JSON.stringify(req.body.synapseBody));
    await User.registerApp({
      ...req.body.appBody,
      synapseId: user.id
    });
    user.body._token = createToken({
      username: req.body.appBody.username,
      synapseId: user.id
    });
    return res.status(201).json(user.body);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
