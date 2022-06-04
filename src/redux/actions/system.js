import { createAction } from "@reduxjs/toolkit";
import { waxios } from "../../axios";
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";

export const loginUser = createAction(LOGIN_USER);
export const logoutUser = createAction(LOGOUT_USER);

export const signIn =
  (email, password, successCallback = () => null, failureCallback = () => null) =>
  (dispatch) => {
    return waxios.post(
      LOGIN_USER,
      `user/authenticate?username=${email}&password=${password}`,
      null,
      (responseData) => {
        dispatch(loginUser(responseData));
        successCallback();
      },
      () => {
        failureCallback();
      },
      true
    );
  };

export const logout = () => (dispatch) => {
  dispatch(logoutUser());
};
