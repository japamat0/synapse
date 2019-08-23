/*
 * APP reducer
 * Using immer.js for structural sharing
 * because versions of state are shared, no need to return default state
 * 
 */

import produce from 'immer';
import {
  TOGGLE_THEME
} from './constants';

import { light, dark } from '../../lib/themes';

export const initialState = {
  loading: false,
  theme: light,
};


const appReducer = (state = initialState, action) => 
  produce(state, draft => {
    switch (action.type) {
      case TOGGLE_THEME:
        draft.theme = state.theme === light
          ? dark
          : light;
        break;
    }
  })

export default appReducer;