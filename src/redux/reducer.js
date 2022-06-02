import { createReducer } from "@reduxjs/toolkit";
import { RECEIVE_USERS, ADD_USER, EDIT_USER, DELETE_USER } from "./actions/users";
import { RECEIVE_POSTS, ADD_POST, EDIT_POST, DELETE_POST } from "./actions/posts";
import { RECEIVE_CATEGORIES } from "./actions/categories";

const usersReducer = createReducer([], (builder) => {
  builder
    .addCase(RECEIVE_USERS, (state, action) => {
      return action.payload;
    })
    .addCase(ADD_USER, (state, action) => {
      return [...state, action.payload];
    })
    .addCase(EDIT_USER, (state, action) => {
      return state.map((user) => (user.id === action.payload.id ? action.payload : user));
    })
    .addCase(DELETE_USER, (state, action) => {
      return state.filter((user) => user.id !== action.payload.id);
    });
});

const postsReducer = createReducer([], (builder) => {
  builder
    .addCase(RECEIVE_POSTS, (state, action) => {
      return action.payload;
    })
    .addCase(ADD_POST, (state, action) => {
      return [...state, action.payload];
    })
    .addCase(EDIT_POST, (state, action) => {
      return state.map((post) => (post.id === action.payload.id ? action.payload : post));
    })
    .addCase(DELETE_POST, (state, action) => {
      return state.filter((post) => post.id !== action.payload.id);
    });
});

const categoriesReducer = createReducer([], (builder) => {
  builder.addCase(RECEIVE_CATEGORIES, (state, action) => {
    return action.payload;
  });
});

const reducer = {
  users: usersReducer,
  posts: postsReducer,
  categories: categoriesReducer,
};

export default reducer;
