import { takeLatest, call } from 'redux-saga/effects';
import { LOGIN_APP_USER } from './constants';
import Api from '../../lib/apiHandler';

/**
 * WORKER SAGAS
 * manage side effects from dispatched actions
 */

export function* loginUserWorker(action) {
  try {
    let res = yield call(
      [Api, Api.loginUser],
      action.payload
    );
    console.log(`loginSaga got res from backend`);
  } catch (error) {
    console.log(error);
    
  }
}


/**
 * DEFAULT SAGA EXPORT
 */

export const loginSagas = [
    takeLatest(LOGIN_APP_USER, loginUserWorker),
  ]