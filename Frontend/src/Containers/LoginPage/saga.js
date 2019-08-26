import { put, takeLatest, call } from 'redux-saga/effects';

import { setSessionToken } from '../../lib/sessionStorage';
import { LOGIN_APP_USER } from './constants';

import history from '../../lib/history';
import Api from '../../lib/apiHandler';
import { loginAppUserSuccess, getSynapseUserSuccess, loginAppUserError } from './actions';

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
    yield put(loginAppUserSuccess(user));
    
    /**
     * thinking about doing this on accounts loading
     */
    const synapseUserResult = yield call(
      [Api, Api.getSynapseUser],
      user.synapseId,
    );
    console.log(synapseUserResult);

    if (synapseUserResult.oauth_key) {
      history.push("/accounts");
      yield put(getSynapseUserSuccess(synapseUserResult));
    } else {
      const authKeys = yield call(
        [Api, Api.synapseOAuthUser],
        user.synapseId,
      );
      console.log(authKeys);
      
    }
  } catch (error) {
    yield put(loginAppUserError(error));
  }
}


/**
 * DEFAULT SAGA EXPORT
 */

export const loginSagas = [
    takeLatest(LOGIN_APP_USER, loginUserWorker),
  ]