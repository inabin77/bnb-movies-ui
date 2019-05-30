import {
  ADD_CINEMA,
  FETCH_CINEMAS,
  ADD_CINEMA_FAILURE,
  ADD_CINEMA_SUCCESS,
  FETCH_CINEMAS_FAILURE,
  FETCH_CINEMAS_SUCCESS,
  DELETE_CINEMA_SUCCESS
} from "./constants";

const initialState = {
  data: [],
  loading: false
};

const cinemaReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CINEMA:
      return { ...state, loading: true };
    case ADD_CINEMA_SUCCESS:
      return { ...state, data: action.data, loading: false };
    case ADD_CINEMA_FAILURE:
      return { ...state, loading: false };
    case FETCH_CINEMAS:
      return { ...state, loading: true };
    case FETCH_CINEMAS_SUCCESS:
      return { ...state, data: action.data, loading: false };
    case FETCH_CINEMAS_FAILURE:
      return { ...state, data: action.data, loading: false };
    case DELETE_CINEMA_SUCCESS:
      return {
        ...state,
        data: state.data.filter((da) => da._id !== action.cinemaID)
      };
    default:
      return state;
  }
};

export default cinemaReducer;
