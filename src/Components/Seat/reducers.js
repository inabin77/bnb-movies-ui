import {
  ADD_USER_TICKET,
  ADD_USER_TICKET_SUCCESS,
  ADD_USER_TICKET_FAILURE,
  FETCH_USER_TICKETS,
  FETCH_USER_TICKETS_SUCCESS,
  FETCH_USER_TICKETS_FAILURE
} from "./constants";

const initialState = {
  data: [],
  loading: false,
};

const seatReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_TICKET:
      return { ...state, loading: true };
    case FETCH_USER_TICKETS:
      return { ...state, loading: true };
    case FETCH_USER_TICKETS_SUCCESS:
      return { ...state, data: action.data, loading: false };
    default:
      return state;
  }
};

export default seatReducer;
