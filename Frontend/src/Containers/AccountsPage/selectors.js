/**
 * ACCOUNTS PAGE selectors, used to grab pieces of accounts page state
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';


const selectAccounts = state => state.accounts || initialState;

const makeSelectAccounts = () =>
  createSelector(
    selectAccounts,
    accountsState => accountsState.accounts,
  );

const makeSelectAccountsLoading = () =>
  createSelector(
    selectAccounts,
    accountsState => accountsState.loading,
  );

const makeSelectAccountsError = () =>
  createSelector(
    selectAccounts,
    accountsState => accountsState.error,
  );


export {
  makeSelectAccounts,
  makeSelectAccountsLoading,
  makeSelectAccountsError,
};
