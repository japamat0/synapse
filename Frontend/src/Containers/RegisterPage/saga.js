/**
 * REGISTER PAGE sagas
 */

import { put, takeLatest, call } from 'redux-saga/effects';

import { setSessionToken } from '../../lib/sessionStorage';
import { CYCLE_FORM, EDIT_FORM, REGISTER_USER } from './constants';

import history from '../../lib/history';
import Api from '../../lib/apiHandler';
import { cycleForm, cycleFormSuccess, registerUserError, registerUserSuccess } from './actions';
import { formViews } from './forms';
import { loginAppUserSuccess } from '../LoginPage/actions';

/**
 * WORKER SAGAS
 * manage side effects from dispatched actions
 */


export function* cycleFormWorker(action) {
  try {
    // filter through required fields for this from, if any empty
    // tell user to fill in those fields
    if (action.formView === formViews[0]) {
      const isFilled = [
        'username',
        'password',
        'email',
        'phone'
      ].filter(field => action.state[field].length === 0);

      if (!isFilled.length) {
        const available = yield call(
          [Api, Api.checkUsername],
          action.state.username,
        );
        console.log(`got to saga, all fields filled: `, available.isAvailable);
        
        if (available.isAvailable) yield put(cycleFormSuccess(1))
        else throw new Error(`Username ${action.state.username} is already taken`);
      }
      else throw new Error(`Please fill in ${isFilled.join(', ')} fields`);

    } else if (action.formView === formViews[1]) {
      const isFilled = [
        'firstName',
        'lastName',
        'alias',
        'birthdate',
        'entity_type',
        'entity_scope',
      ].filter(field => action.state[field].length === 0);

      if (!isFilled.length) yield put(cycleFormSuccess(2))
      else throw new Error(`Please fill in ${isFilled.join(', ')} fields`);

    } else if (action.formView === formViews[2]) {
      const isFilled = [
        'address_street',
        'address_city',
        'address_subdivision',
        'address_postal_code',
      ].filter(field => action.state[field].length === 0);

      if (!isFilled.length) yield put(cycleFormSuccess(3))
      else throw new Error(`Please fill in ${isFilled.join(', ')} fields`);

    } else if (action.formView === formViews[3]) {
      const isFilled = [
        'facebook',
        'govtId',
        'SSN',
      ].filter(field => action.state[field].length === 0);
      if (!isFilled.length) yield put(cycleFormSuccess(4))
      else throw new Error(`Please fill in ${isFilled.join(', ')} fields`);
    } 
  } catch (error) {
    yield put(registerUserError(error));
  }
}

/**
 * Sends request to backend to register a new user
 */
export function* registerUserWorker(action) {
  try {
    const user = yield call(
      [Api, Api.registerUser],
      action.body,
    );
    setSessionToken(user._token)
    yield put(registerUserSuccess());
    yield put(loginAppUserSuccess(user));
    history.push('/accounts');
  } catch (error) {
    yield put(registerUserError(error))
  }
}

export function* editFormWorker(action) {
  yield put(cycleFormSuccess(action.idx));
}


/**
 * DEFAULT SAGA EXPORT
 */

export const registerSagas = [
    takeLatest(CYCLE_FORM, cycleFormWorker),
    takeLatest(EDIT_FORM, editFormWorker),
    takeLatest(REGISTER_USER, registerUserWorker),
  ]