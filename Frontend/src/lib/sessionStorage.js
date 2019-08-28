/**
 * helper functions for working with sessionStorage
 */

export const removeSessionToken = () =>
  sessionStorage.removeItem('banklyToken');

export const setSessionToken = token =>
  sessionStorage.setItem('banklyToken', JSON.stringify(token));

export const getSessionToken = () =>
  JSON.parse(sessionStorage.getItem('banklyToken'));
