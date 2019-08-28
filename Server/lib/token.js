/**
 * JSON web token helper functions
 */

const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config");


/** return signed JWT from user data. */

function createToken(user) {
  const payload = {
    username: user.username,
    synapseId: user.synapseId,
  };
  return jwt.sign(payload, TOKEN_SECRET);
}


module.exports = { createToken };