/**
 * REGISTER PAGE selectors, used to grab pieces of app state for register page
 * mainly used here for user feedback, i.e. loading, register errors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';


const selectRegister = state => state.register || initialState;

const makeSelectRegisterLoading = () =>
  createSelector(
    selectRegister,
    registerState => registerState.loading,
  );

const makeSelectRegisterError = () =>
  createSelector(
    selectRegister,
    registerState => registerState.error,
  );

const makeSelectRegisterFormView = () =>
  createSelector(
    selectRegister,
    registerState => registerState.formView,
  );

export {
  makeSelectRegisterLoading,
  makeSelectRegisterError,
  makeSelectRegisterFormView,
};
