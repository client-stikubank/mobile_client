import {
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  UPDATE_PASSWORD,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  DELETE_ACCOUNT,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAIL,
} from "./actionTypes";

export const resetPassword = (data, transition) => {
  return {
    type: RESET_PASSWORD,
    payload: { data, transition },
  };
};

export const resetPasswordSuccess = () => {
  return {
    type: RESET_PASSWORD_SUCCESS,
  };
};

export const resetPasswordFail = (error) => {
  return {
    type: RESET_PASSWORD_FAIL,
    payload: error,
  };
};

export const updatePassword = (data, transition) => {
  return {
    type: UPDATE_PASSWORD,
    payload: { data, transition },
  };
};

export const updatePasswordSuccess = () => {
  return {
    type: UPDATE_PASSWORD_SUCCESS,
  };
};

export const updatePasswordFail = (error) => {
  return {
    type: UPDATE_PASSWORD_FAIL,
    payload: error,
  };
};

export const deleteAccount = (data, transition) => {
  return {
    type: DELETE_ACCOUNT,
    payload: { data, transition },
  };
};

export const deleteAccountSuccess = () => {
  return {
    type: DELETE_ACCOUNT_SUCCESS,
  };
};

export const deleteAccountFail = (error) => {
  return {
    type: DELETE_ACCOUNT_FAIL,
    payload: error,
  };
};
