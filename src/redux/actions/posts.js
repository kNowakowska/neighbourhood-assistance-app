import { createAction } from "@reduxjs/toolkit";
import { waxios } from "../../axios";

export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const ADD_POST = "ADD_POST";
export const EDIT_POST = "EDIT_POST";
export const DELETE_POST = "DELETE_POST";

const receivePosts = createAction(RECEIVE_POSTS);
const addPost = createAction(ADD_POST);
const editPost = createAction(EDIT_POST);
const removePost = createAction(DELETE_POST);

export const getPosts = () => (dispatch) => {
  return waxios.get(RECEIVE_POSTS, "post/", (responseData) => {
    dispatch(receivePosts(responseData));
  });
};

export const createPost = (data) => (dispatch) => {
  return waxios.post(ADD_POST, "post/", data, (responseData) => {
    dispatch(addPost(responseData));
  });
};

export const updatePost = (data) => (dispatch) => {
  return waxios.put(EDIT_POST, `post/${data.id}/`, data, (responseData) => {
    dispatch(editPost(responseData));
  });
};

export const deletePost = (dataId) => (dispatch) => {
  return waxios.delete(DELETE_POST, `post/${dataId}/`, (responseData) => {
    dispatch(removePost(responseData));
  });
};
