import { LOGIN_APP_USER } from "./constants";

/**
 * LOGIN PAGE actions
 */

export const loginUser = payload => ({
  type: LOGIN_APP_USER,
  payload,
})