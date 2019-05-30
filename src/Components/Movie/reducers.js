import { ADD_MOVIE, FETCH_MOVIES, FETCH_MOVIES_SUCCESS } from "./constants";

const initialState = {
  data: [],
  loading: false
};

const cinemaReducer = (state = initialState, action) => {

  switch (action.type) {
    case ADD_MOVIE:
      return { ...state, loading: true };
    case FETCH_MOVIES:
      return { ...state, data: action.data, loading: true };
    case FETCH_MOVIES_SUCCESS:
      return { ...state, data: action.data, loading: false };
    default:
      return state;
  }
};

export default cinemaReducer;
