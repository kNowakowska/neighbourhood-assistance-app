import { createAction } from "@reduxjs/toolkit";
import { waxios } from "../../axios";
import { loginUser, logoutUser } from "../actions/system";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_USER = "ADD_USER";
export const EDIT_USER = "EDIT_USER";
export const DELETE_USER = "DELETE_USER";
export const ADD_COMMENT = "ADD_COMMENT";

const receiveUsers = createAction(RECEIVE_USERS);
const addUser = createAction(ADD_USER);
const editUser = createAction(EDIT_USER);
const removeUser = createAction(DELETE_USER);
const addComment = createAction(ADD_COMMENT);

export const getUsers = () => (dispatch) => {
  return waxios.get(RECEIVE_USERS, "user/", (responseData) => {
    dispatch(receiveUsers(responseData));
  });
};

export const createUser =
  (data, successCallback = () => null, failureCallback = () => null) =>
  (dispatch) => {
    return waxios.post(
      ADD_USER,
      "user/",
      data,
      (responseData) => {
        dispatch(addUser(responseData));
        dispatch(loginUser(responseData));
        successCallback(responseData);
      },
      () => {
        failureCallback();
      },
      true
    );
  };

export const updateUser =
  (data, successCallback = () => null) =>
  (dispatch) => {
    return waxios.put(EDIT_USER, `user/${data.id}/`, data, (responseData) => {
      dispatch(editUser(responseData));
      successCallback(responseData);
    });
  };

export const deleteUser =
  (dataId, successCallback = () => null) =>
  (dispatch) => {
    return waxios.delete(DELETE_USER, `user/${dataId}/`, (responseData) => {
      successCallback();
      dispatch(logoutUser());
      dispatch(removeUser(responseData));
    });
  };

export const createComment =
  (comment, userId, successCallback = () => null) =>
  (dispatch) => {
    return waxios.post(ADD_COMMENT, `user/${userId}/comment/`, comment, (responseData) => {
      dispatch(addComment(responseData));
      successCallback(responseData);
    });
  };
