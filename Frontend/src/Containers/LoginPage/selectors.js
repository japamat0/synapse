/**
 * LOGIN PAGE selectors, used to grab pieces of app state for login page
 * mainly used here for user feedback, i.e. loading, login errors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';


const selectLogin = state => state.login || initialState;

const makeSelectLoginLoading = () =>
  createSelector(
    selectLogin,
    loginState => loginState.loading,
  );

const makeSelectLoginError = () =>
  createSelector(
    selectLogin,
    loginState => loginState.error,
  );

const makeSelectLoginFormView = () =>
  createSelector(
    selectLogin,
    loginState => loginState.formView,
  );

export {
  makeSelectLoginLoading,
  makeSelectLoginError,
  makeSelectLoginFormView,
};
