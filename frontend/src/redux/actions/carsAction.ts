import axios from "axios";

export const GET_ALL_CARS = "GET_ALL_CARS";

export const getAllCars = () => async (dispatch: any) => {
  try {
    const { data } = await axios.get("/cars");
    return dispatch({
      type: GET_ALL_CARS,
      payload: data || [],
    });
  } catch (e) {
    return console.error(e);
  }
};

