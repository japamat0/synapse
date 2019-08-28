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
  static async getSynapseUser(userId) {
    let user = await client.getUser(userId);
    return user;
  }

  static async getNodes(userId) {
    let user = await client.getUser(userId);
    let res = await user.createNode(body);
    return res;
  }

  static async checkAvailability(username) {
    let user = usersJSON[username];
    return user === undefined;
  }

  static async registerSynapse(body) {
    const user = await client.createUser(body);
    return user;
  }

  static async getAccounts(userId) {
    const user = await client.getUser(userId);
    const response = await user.getAllUserNodes();
    return response.data.nodes;
    
  }

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

  static async oAuth(userId) {
    const user = await this.getSynapseUser(userId);
    const { refresh_token } = user.body;
    const oAuthKeys = await user._oauthUser({ refresh_token });
    console.log(oAuthKeys);
    
    return oAuthKeys;
  }

  static async getAuthKey(userId) {
    let user = await client.getUser(userId); // pulled from app (db/JSON file)
    console.log(user);
    
    const newFingerprint = 'static_pin';
    const device2FA = '901.111.1111';
    let res = await user.registerNewFingerprint(newFingerprint);
    console.log('after registerNewFingerprint', res);

    let res2 = await user.supplyDevice2FA(newFingerprint, device2FA);
    console.log('after supplyDevice2FA', res2);
    let body = {
      "type": "DEPOSIT-US",
      "info": {
        "nickname": "My Deposit Account",
        "document_id": user.body.documents[0].id
      }
    };
    let verified = await user.verifyFingerprint2FA(newFingerprint, '123456');
    console.log('line 38 - verified: ', verified);
    // res = await user._oauthUser({
    //   refresh_token: user.body.refresh_token
    // });
    // console.log('line 40', res);
    
    return verified.data;
  }

  static async synapseRegisterUser(body) {
    try {
      let user = await client.createUser(body)
      return user;
    } catch (error) {
      return error;
    }
  }

  static async appRegisterUser(userInfo) {
    const username = userInfo.username;
    if (usersJSON[username]) {
      return new Error(`username: ${username} already exists`);
    }
    await fs.writeFileSync(
      '../data/users.json',
      JSON.stringify({
        ...usersJSON,
        userInfo
      })
    );
    return userInfo;
  }
}

module.exports = User;