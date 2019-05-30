import { combineReducers } from "redux";

import movieReducer from "./Components/Movie/reducers";
import cinemaReducer from "./Components/Cinemas/reducers";
import { user, auth } from "./Components/Login/reducers";
import seatReducer from "./Components/Seat/reducers";

const rootReducer = combineReducers({
  movies: movieReducer,
  cinemas: cinemaReducer,
  user,
  auth,
  seats: seatReducer
});

export default rootReducer;
