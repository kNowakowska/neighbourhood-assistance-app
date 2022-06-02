import { createAction } from "@reduxjs/toolkit";
import { waxios } from "../../axios";
export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";

const receiveCategories = createAction(RECEIVE_CATEGORIES);

export const getCategories = () => (dispatch) => {
  return waxios.get(RECEIVE_CATEGORIES, "category/", (responseData) => {
    dispatch(receiveCategories(responseData));
  });
};
