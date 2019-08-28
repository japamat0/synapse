import { put, takeLatest, call } from 'redux-saga/effects';

import { setSessionToken, removeSessionToken } from '../../lib/sessionStorage';
import { LOGIN_APP_USER, LOGOUT_APP_USER } from './constants';

import history from '../../lib/history';
import Api from '../../lib/apiHandler';
import { loginAppUserSuccess, getSynapseUserSuccess, loginAppUserError, logoutUser } from './actions';

/**
 * WORKER SAGAS
 * manage side effects from dispatched actions
 */


/**
 * Log user into app, then get user info from synapse Api from backend
 */

export function* loginUserWorker(action) {
  try {
    const appUserResult = yield call(
      [Api, Api.loginAppUser],
      action.payload,
      );
      
    setSessionToken(appUserResult._token)
    
    // Remove token, no need for token in store
    const { _token, ...user } = appUserResult;
    const synapseUserResult = yield call(
      [Api, Api.getSynapseUser],
      user.synapseId,
    );

    if (synapseUserResult.oauth_key) {
      history.push("/accounts");
      yield put(getSynapseUserSuccess(synapseUserResult));
    } else {
      const authKeys = yield call(
        [Api, Api.synapseOAuthUser],
        user.synapseId,
      );
    }
    yield put(loginAppUserSuccess(user));
  } catch (error) {
    yield put(loginAppUserError(error));
  }
}

export function* logoutUserWorker(action) {
  removeSessionToken();
  history.push('/welcome')
}

/**
 * DEFAULT SAGA EXPORT
 */

export const loginSagas = [
    takeLatest(LOGIN_APP_USER, loginUserWorker),
    takeLatest(LOGOUT_APP_USER, logoutUserWorker),
  ]