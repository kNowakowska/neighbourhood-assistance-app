import { createAction } from "@reduxjs/toolkit";
import { waxios } from "../../axios";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_USER = "ADD_USER";
export const EDIT_USER = "EDIT_USER";
export const DELETE_USER = "DELETE_USER";

const receiveUsers = createAction(RECEIVE_USERS);
const addUser = createAction(ADD_USER);
const editUser = createAction(EDIT_USER);
const removeUser = createAction(DELETE_USER);

export const getUsers = () => (dispatch) => {
  return waxios.get(RECEIVE_USERS, "user/", (responseData) => {
    dispatch(receiveUsers(responseData));
  });
};

export const createUser = (data) => (dispatch) => {
  return waxios.post(ADD_USER, "user/", data, (responseData) => {
    dispatch(addUser(responseData));
  });
};

export const updateUser = (data) => (dispatch) => {
  return waxios.put(EDIT_USER, `user/${data.id}/`, data, (responseData) => {
    dispatch(editUser(responseData));
  });
};

export const deleteUser = (dataId) => (dispatch) => {
  return waxios.delete(DELETE_USER, `user/${dataId}/`, (responseData) => {
    dispatch(removeUser(responseData));
  });
};
