/**
 * APP level selectors, used to grab pieces of global app state
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';


const selectGlobal = state => state.global || initialState;

const makeSelectUsername = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.user.username,
  );

const makeSelectUserSynapseId = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.user.synapseId,
  );

const makeSelectUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.user,
  );

const makeSelectAppTheme = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.theme,
  );


export {
  makeSelectUsername,
  makeSelectUserSynapseId,
  makeSelectUser,
  makeSelectAppTheme,
};
