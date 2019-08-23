/**
 * Initialize Synapse API
 */

require('dotenv').config();

const Synapse = require('synapsenode');

const Client = Synapse.Client;
const client = new Client({
  "client_id": process.env.CLIENT_ID,
  "client_secret": process.env.CLIENT_SECRET,
  "fingerprint": process.env.FINGERPRINT,
  "ip_address": '127.0.0.1',
  "isProduction": false,
});

module.exports = client;
