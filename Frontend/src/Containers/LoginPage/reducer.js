/*
 * LOGIN reducer
 * 
 * Handles loading and error indicators
 * 
 * Using immer.js for structural sharing
 * because versions of state are shared, no need to return default state
 * 
 */

import produce from 'immer';
import {
  TOGGLE_THEME, LOGIN_APP_USER_ERROR
} from './constants';

import { light, dark } from '../../lib/themes';
import { LOGIN_APP_USER_SUCCESS, GET_SYNAPSE_USER_SUCCESS, LOGIN_APP_USER } from '../LoginPage/constants';

export const initialState = {
  form: 'appLogin',
  loading: false,
  error: false,
};


const loginReducer = (state = initialState, action) => 
  produce(state, draft => {
    switch (action.type) {
      case LOGIN_APP_USER:
        draft.loading = true;
        break;

      case LOGIN_APP_USER_SUCCESS:
        draft.loading = false;
        break;

      case LOGIN_APP_USER_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
    }
  })

export default loginReducer;