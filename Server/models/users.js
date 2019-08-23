/**
 * USER model for backend, used to login users to app
 * from db (no db here, just JSON file), get synapse user_id,
 * and perform user actions (view accoutn, open account, etc)
 */

const client = require('../lib/synapseClient');
const fs = require('fs');
const usersJSON = require('../data/users.json');

class User {
  static async getUser(userId) {
    let user = await client.getUser(userId);
    return user;
  }

  static async getAuthKey(userId) {
    let user = await client.getUser(userId);
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
        "document_id": ""
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