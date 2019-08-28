/*
 * APP reducer
 * Using immer.js for structural sharing
 * because versions of state are shared, no need to return default state
 * 
 */

import produce from 'immer';
import {
  TOGGLE_THEME
} from '../Footer/constants';

import { light, dark } from '../../lib/themes';
import { LOGIN_APP_USER_SUCCESS, LOGOUT_APP_USER } from '../LoginPage/constants';

export const initialState = {
  theme: light,
  user: false,
  synapseUser: false,
};


const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case TOGGLE_THEME:
        draft.theme = state.theme === light
          ? dark
          : light;
        break;

      case LOGIN_APP_USER_SUCCESS:
        draft.user = action.user;
        break;
      
      case LOGOUT_APP_USER:
        draft.user = false;
        break;
    }
  })

export default appReducer;