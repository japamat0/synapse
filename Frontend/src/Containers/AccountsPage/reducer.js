/**
 * ACCOUNTS PAGE reducer
 */

import produce from 'immer';

import {
  GET_ACCOUNTS,
  GET_ACCOUNTS_SUCCESS,
  GET_ACCOUNTS_ERROR,
} from "./constants";  

export const initialState = {
  accounts: false,
  loading: false,
  error: false,
};


const accountsReducer = (state = initialState, action) => 
  produce(state, draft => {
    switch (action.type) {
      case GET_ACCOUNTS:
        draft.loading = true;
        break;

      case GET_ACCOUNTS_SUCCESS:
        draft.loading = false;
        draft.accounts = action.payload;
        break;

      case GET_ACCOUNTS_ERROR:
        draft.loading = false;
        draft.error = action.error;
        break;
    }
  })

export default accountsReducer;