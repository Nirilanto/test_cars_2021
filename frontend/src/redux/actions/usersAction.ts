import axios from "axios";

import { post, get, del } from "src/services/Api";
import AuthService from "../../services/AuthService";
import { GET_ALL_CARS } from "./carsAction";

export const GET_ALL_USER = "GET_ALL_USER";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const SIGNUP = "SIGNUP";
export const CURRENT_USER = "CURRENT_USER";
export const GET_ALL_COMMENT = "GET_ALL_COMMENT";

export const getAllUser = () => async (dispatch: any) => {
  try {
    const { data } = await axios.get("/users");
    return dispatch({
      type: GET_ALL_USER,
      payload: data || [],
    });
  } catch (e) {
    return console.error(e);
  }
};

export const getAllComment = () => async (dispatch: any) => {
  try {
    const { data } = await axios.get("/comment");
    return dispatch({
      type: GET_ALL_COMMENT,
      payload: data || [],
    });
  } catch (e) {
    return console.error(e);
  }
};

export const login = (user: any) => async (dispatch: any) => {
  try {
    const result = await post("users/login", user);

    const { error } = result?.data;

    if (error) {
      return { succes: false, label: error.message };
    }
    result.data && AuthService.setAccessToken(result.data);
    dispatch({
      type: LOGIN,
      payload: result ? result.data : null,
    });
    return { succes: true, label: "" };
  } catch (e) {
    return console.error(e);
  }
};

export const addComment = (data: any) => async (dispatch: any) => {
  try {
    const result = await post("comment", data);

    const { error } = result?.data;

    if (error) {
      return { succes: false, label: error.message };
    }
    return { succes: true, label: "" };
  } catch (e) {
    return console.error(e);
  }
};

export const deleteComment = (id: any) => async (dispatch: any) => {
  try {
    const result = await del("comment", id);

    const { error } = result?.data;

    if (error) {
      return { succes: false, label: error.message };
    }
    return { succes: true, label: "" };
  } catch (e) {
    return console.error(e);
  }
};

export const signup = (user: any) => async (dispatch: any) => {
  const result = await post("users", user);
  const { error } = result?.data;
  if (error) {
    return { succes: false, label: error.message };
  }
  return { succes: true, label: "" };
};

export const logout = () => async (dispatch: any) => {
  await post("users/logout", {});
  await AuthService.setAccessToken("");
  return dispatch({
    type: LOGOUT,
  });
};

export const currentUser = () => async (dispatch: any) => {
  const dataRes = await get("users/me", null);
  console.log(dataRes);

  const { data, statusText, status, statusCode } = dataRes || {};
  if (status == 401 || statusCode == 401 || !data) {
    await AuthService.clearToken();
    return dispatch({
      type: LOGOUT,
    });
  }
  return dispatch({
    type: CURRENT_USER,
    payload:
      (data && statusText === "OK") ||
      (statusCode && statusCode == 200) ||
      (status && status == 200)
        ? data
        : null,
  });
};
