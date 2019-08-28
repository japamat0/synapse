import { GET_ACCOUNTS, GET_ACCOUNTS_SUCCESS, GET_ACCOUNTS_ERROR } from "./constants";

/**
 * ACCOUNTS PAGE actions
 */

export const getAccounts = () => ({
  type: GET_ACCOUNTS,
});

export const getAccountsSuccess = payload => ({
  type: GET_ACCOUNTS_SUCCESS,
  payload,
});

export const getAccountsError = error => ({
  type: GET_ACCOUNTS_ERROR,
  error,
});

