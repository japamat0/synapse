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
    }

    catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async loginAppUser(payload) {
    let user = await this.request(`login`, { ...payload }, 'POST');
    return user;
  }

  static async getSynapseUser(userId) {
    let userDetails = await this.request(`synapseUser`);
    return userDetails;
  }

  static async synapseOAuthUser(refreshToken) {
    let oAuthKeys = await this.request('synapseOAuth');
    return oAuthKeys;
  }

  static async loadUser(username, offset) {
    let res = await this.request(`users/${username}`, { offset });
    return res.user;
  }

}

export default Api;