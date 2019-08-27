import {
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  CYCLE_FORM,
  CYCLE_FORM_SUCCESS,
  CYCLE_FORM_ERROR,
  CHECK_USERNAME,
  EDIT_FORM,
} from "./constants";

/**
 * REGISTER PAGE actions
 */

// form state will be dispatched, logic to handle form in saga
export const cycleForm = (state, formView) => ({
  type: CYCLE_FORM,
  state,
  formView,
});

export const cycleFormSuccess = idx => ({
  type: CYCLE_FORM_SUCCESS,
  idx,
});

export const editForm = idx => ({
  type: EDIT_FORM,
  idx,
});

export const checkUsername = username => ({
  type: CHECK_USERNAME,
  username,
})

export const registerUser = body => ({
  type: REGISTER_USER,
  body,
});

export const registerUserSuccess = user => ({
  type: REGISTER_USER_SUCCESS,
  user,
});

export const registerUserError = error => ({
  type: REGISTER_USER_ERROR,
  error,
});
