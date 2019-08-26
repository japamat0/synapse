/** Shared config for application; can be req'd many places. */


require("dotenv").config();

const SECRET = process.env.SECRET_KEY || 'test';
const TOKEN_SECRET = process.env.TOKEN_SECRET || 'token_secret';
const PORT = +process.env.PORT || 3001;


module.exports = {
  SECRET,
  TOKEN_SECRET,
  PORT,
};
