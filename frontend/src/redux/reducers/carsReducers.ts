import { GET_ALL_CARS } from "../actions/carsAction";

const initialState = {
  cars: [],
};

export function carsReducers(state = initialState, action: any) {
  switch (action.type) {
    case GET_ALL_CARS:
      return { ...state, cars: action.payload };
    default:
      return { ...state };
  }
}
