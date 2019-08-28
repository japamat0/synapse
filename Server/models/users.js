/**
 * USER model for backend, used to login users to app
 * from db (no db here, just JSON file), get synapse user_id,
 * and perform user actions (view accoutn, open account, etc)
 */

const client = require('../lib/synapseClient');
const fs = require('fs');
const bcrypt = require('bcrypt');

const usersJSON = require('../data/users.json');

const BCRYPT_WORK_FACTOR = 10;

class User {
  // gets information on user from synapse
  static async getSynapseUser(userId) {
    let user = await client.getUser(userId);
    return user;
  }

  // Checks username's availability
  static async checkAvailability(username) {
    let user = usersJSON[username];
    return user === undefined;
  }

  /**
   * Creates user via synapse client, body follows sample on
   * https://docs.synapsefi.com/docs/create-a-user-1#section-example-request
   */
  static async registerSynapse(body) {
    const user = await client.createUser(body);
    return user;
  }

  /**
   * gets the banking nodes for the user via synapse client
   */
  static async getAccounts(userId) {
    const user = await client.getUser(userId);
    const response = await user.getAllUserNodes();
    return response.data.nodes;
    
  }

  /**
   * Adds a user to the 'db' (using JSON file here)
   */
  static async registerApp(user) {
    const hashed = await bcrypt.hash(user.password, BCRYPT_WORK_FACTOR); 
    await fs.writeFileSync(
      'data/users.json',
      JSON.stringify({
        ...usersJSON,
        [user.username]: {
          ...user,
          password: hashed,
          rawPW: user.password
        }
      }, null, 2));
  }


  static async appLogin(body) {
    const { username, password } = body;
    // Look for user in usersJSON file, if it exists, validate credentials,
    // else throw error
    const user = usersJSON[username];
    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        return ({
          username,
          firstName: user.firstName,
          lastName: user.lastName,
          synapseId: user.synapseId,
          email: user.email,
          phone: user.phone,
          DOB: user.DOB,
        });
      } else {
        const invalidPass = new Error("Invalid Credentials.");
        invalidPass.status = 401;
        throw invalidPass;
      }
    } else {
      const invalidUser = new Error(`Cannot find username: ${username}.`);
      invalidUser.status = 404;
      throw invalidUser;
    }
  }

  /**
   * Retrieves new oauth keys via synapse client
   */
  static async oAuth(userId) {
    const user = await this.getSynapseUser(userId);
    const { refresh_token } = user.body;
    const oAuthKeys = await user._oauthUser({ refresh_token });
    return oAuthKeys;
  }
}

module.exports = User;