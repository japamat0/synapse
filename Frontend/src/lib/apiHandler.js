/**
 * This class is used to send requests to api backend
 * general request method defaults to get requests, can take other verbs.
 * data or params key added to request depending on verb
 * 
 * These function calls will be made in sagas 
 */

import axios from 'axios';

import { getSessionToken } from '../lib/sessionStorage';

class Api {
  static async request(endpoint, paramsOrData = {}, verb = "get") {
    // send token with every request
    const _token = getSessionToken();
    paramsOrData._token = _token;
    

    try {
      return (await axios({
        method: verb,
        url: `http://localhost:3001/${endpoint}`,
        [verb === "get" ? "params" : "data"]: paramsOrData
      })).data;
      // axios sends query string data via the "params" key,
      // and request body data via the "data" key,
      // so the key we need depends on the HTTP verb
    } catch (err) {
      console.error('apiHandlerError');
      
      const message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async loginAppUser(payload) {
    const user = await this.request(`login`, { ...payload }, 'POST');
    return user;
  }

  static async registerUser(payload) {
    const user = await this.request(`users`, { ...payload }, 'POST');
    return user;
  }

  static async getSynapseUser(userId) {
    const userDetails = await this.request(`synapseUser`);
    return userDetails;
  }

  static async synapseOAuthUser(refreshToken) {
    const oAuthKeys = await this.request('synapseOAuth');
    return oAuthKeys;
  }

  static async checkUsername(username) {
    const available = await this.request('users/availability', { username });
    return available;
  }

  static async getAccounts() {
    const accounts = await this.request('accounts');
    return accounts;
  }
}

export default Api;