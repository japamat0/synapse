import {
  LOGIN_APP_USER,
  LOGIN_APP_USER_SUCCESS,
  GET_SYNAPSE_USER,
  GET_SYNAPSE_USER_SUCCESS,
  LOGIN_APP_USER_ERROR,
  GET_SYNAPSE_USER_ERROR
} from "./constants";

/**
 * LOGIN PAGE actions
 */

export const loginUser = payload => ({
  type: LOGIN_APP_USER,
  payload,
});

export const loginAppUserSuccess = user => ({
  type: LOGIN_APP_USER_SUCCESS,
  user,
});

export const loginAppUserError = error => ({
  type: LOGIN_APP_USER_ERROR,
  error,
});

export const getSynapseUser = userId => ({
  type: GET_SYNAPSE_USER,
  userId,
});

export const getSynapseUserSuccess = synapseUser => ({
  type: GET_SYNAPSE_USER_SUCCESS,
  synapseUser,
});

export const getSynapseUserError = error => ({
  type: GET_SYNAPSE_USER_ERROR,
  error,
});
