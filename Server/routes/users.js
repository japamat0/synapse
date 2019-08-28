/** Routes for users. */

const express = require("express");
const router = express.Router();
const User = require('../models/users');


router.get("/availability", async function(req, res, next) {
  try {
    const available = await User.checkAvailability(req.query.username);
    return res.json({ isAvailable: available });
  } catch (err) {
    return next(err);
  }
});

router.post("/", async function(req, res, next) {
  try {
    delete req.body._token;
    const user = await User.registerSynapse(JSON.stringify(req.body.synapseBody));
    await User.registerApp({
      ...req.body.appBody,
      synapseId: user.id
    })
    return res.status(201).json(user.body);
  } catch (err) {
    console.log('user model err', err);
    
    return next(err);
  }
});

module.exports = router;
