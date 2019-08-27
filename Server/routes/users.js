/** Routes for users. */

const express = require("express");
const router = express.Router();
const User = require('../models/users');

/** GET / => {users: [user, ...]} */

router.get("/", async function(req, res, next) {
  try {
    console.log('landed in the routes');
    
    let user = await User.getUser('5d5de6dda63ec2309c7aa2e0');
    return res.json({ user, });
  } catch (err) {
    return next(err);
  }
});

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
    let user = await User.appRegisterUser(req.body.user);
    return res.status(201).json(user);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
