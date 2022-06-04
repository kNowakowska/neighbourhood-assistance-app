import { createReducer } from "@reduxjs/toolkit";
import { RECEIVE_USERS, ADD_USER, EDIT_USER, DELETE_USER, ADD_COMMENT } from "./actions/users";
import { RECEIVE_POSTS, ADD_POST, EDIT_POST, DELETE_POST, REPORT_POST } from "./actions/posts";
import { RECEIVE_CATEGORIES } from "./actions/categories";
import { LOGIN_USER, LOGOUT_USER } from "./actions/system";

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
    })
    .addCase(ADD_COMMENT, (state, action) => {
      return state.map((user) => (user.id !== action.payload.userId ? user : { ...action.payload }));
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
    })
    .addCase(REPORT_POST, (state, action) => {
      return state.map((post) => (post.id === action.payload.id ? action.payload : post));
    });
});

const categoriesReducer = createReducer([], (builder) => {
  builder.addCase(RECEIVE_CATEGORIES, (state, action) => {
    return action.payload;
  });
});

const systemReducer = createReducer([], (builder) => {
  builder
    .addCase(LOGIN_USER, (state, action) => {
      return action.payload;
    })
    .addCase(LOGOUT_USER, (state, action) => {
      return null;
    });
});

const reducer = {
  users: usersReducer,
  posts: postsReducer,
  categories: categoriesReducer,
  system: systemReducer,
};

export default reducer;
