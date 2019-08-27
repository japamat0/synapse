/*
 * REGISTER PAGE reducer
 * 
 * Handles loading and error indicators
 * 
 * Using immer.js for structural sharing
 * because versions of state are shared, no need to return default state
 * 
 */

import produce from 'immer';
import {
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  CYCLE_FORM,
  CYCLE_FORM_SUCCESS,
} from './constants';
import { formViews } from './forms';


/**
 * formView is used to change between different parts of form to collect basic info,
 * KYC docs, etc.
 *  **  **
 * basicInfo => username, pw, email, phone (can check for taken username here)
 * personalInfo => first name, last name, DOB, Entity Type/Scope, adress info
 * socialDocs => FB
 * physicalDocs => gov Id
 * virtualDocs => SSN
 * 
 */

export const initialState = {
  formViewIdx: 0,
  formView: formViews[0],
  loading: false,
  error: false,
};


const registerReducer = (state = initialState, action) => 
  produce(state, draft => {
    switch (action.type) {
      case CYCLE_FORM_SUCCESS:
        draft.formViewIdx = action.idx;
        draft.formView = formViews[action.idx];
        draft.error = false;
        break;

      case REGISTER_USER:
        draft.loading = true;
        break;

      case REGISTER_USER_SUCCESS:
        draft.loading = false;
        break;

      case REGISTER_USER_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
    }
  })

export const formCycleHandler = (state, formViews) => {
  switch (state.formView) {
    case 'basicInfo':

  }
}

export default registerReducer;