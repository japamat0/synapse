/**
 * ACCOUNTS PAGE sagas
 */

import { put, takeLatest, call } from 'redux-saga/effects';


import history from '../../lib/history';
import Api from '../../lib/apiHandler';
import { GET_ACCOUNTS } from './constants';
import { getAccountsError, getAccountsSuccess } from './actions';

/**
 * WORKER SAGAS
 * manage side effects from dispatched actions
 */


/**
 * Log user into app, then get user info from synapse Api from backend
 */

export function* getAccountsWorker(action) {
  try {
    const accounts = yield call(
      [Api, Api.getAccounts],
      action.userId,
    );
    console.log(accounts);
    
    yield put(getAccountsSuccess(accounts));
  } catch (error) {
    yield put(getAccountsError(error));
  }
}


/**
 * DEFAULT SAGA EXPORT
 */

export const accountsSagas = [
    takeLatest(GET_ACCOUNTS, getAccountsWorker),
  ]