/** Convenience middleware to handle common auth cases in routes. */


const jwt = require("jsonwebtoken");
const { TOKEN_SECRET } = require("../config");


/** Middleware to use when they must provide a valid token.
 *
 * Add username and synapse user id onto req as a convenience for view functions.
 *
 * If not, raises Unauthorized.
 *
 */

function authRequired(req, res, next) {
  try {
    const tokenStr = req.body._token || req.query._token;
    let token = jwt.verify(tokenStr, TOKEN_SECRET);
    req.username = token.username;
    req.synapseId = token.synapseId;
    return next();
  } catch (err) {
    let unauthorized = new Error("You must authenticate first.");
    unauthorized.status = 401;  // 401 Unauthorized
    return next(unauthorized);
  }
}


module.exports = {
  authRequired,
};