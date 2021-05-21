import {
  GET_ALL_USER,
  CURRENT_USER,
  LOGOUT,
  GET_ALL_COMMENT,
} from "../actions/usersAction";

const initialState = {
  users: [],
  comments: [],
  me: {},
};

export function usersReducers(state = initialState, action: any) {
  switch (action.type) {
    case GET_ALL_USER:
      return { ...state, users: action.payload };
    case CURRENT_USER:
      return { ...state, me: action.payload };
    case GET_ALL_COMMENT:
      return { ...state, comments: action.payload };
    case LOGOUT:
      return {};
    default:
      return { ...state };
  }
}
