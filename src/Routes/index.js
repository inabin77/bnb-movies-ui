import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Movie from "../Components/Movie/MovieContainer";
import LoginComponent from "../Components/Login/LoginContainer";
import SignupComponent from "../Components/Signup/SignupContainer";
import Show from "../Components/Show/ShowComponent";
import MovieDetails from "../Components/Movie/MovieDetails";
import MovieForm from "../Components/Movie/MovieFormComponent";
import CinemaComponent from "../Components/Cinemas/CinemaContainer";
import CinemaForm from "../Components/Cinemas/CinemaFormComponent";
import SeatMap from "../Components/Seat/SeatContainer";
import ProfileComponent from "../Components/Profile/ProfileContainer";
import ChangePasswordComponent from "../Components/ChangePassword/ChangePasswordContainer";
import NotFound from "../Components/404/NotFoundComponent";
import BillComponent from "../Components/Bill/BillComponent";
import MovieEditForm from "../Components/Movie/MovieEditForm";
import EditCinemaForm from "../Components/Cinemas/EditCinemaComponent";
import TicketContainer from "../Components/Ticket/TicketContainer";
import Contact from "../Components/ContactUs/ContactUsComponent";
import Help from "../Components/Help/HelpComponent";

const checkAuth = () => {
  const token = localStorage.getItem("jwtToken");
  if (!token) {
    return false;
  }
  return true;
};

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      checkAuth() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/movies" }} />
      )
    }
  />
);

const AdminRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      checkAuth() && localStorage.getItem("role") === "1" ? (
        <Component {...props} />
      ) : (
        // <Redirect to={{ pathname: "/movies" }} />
        <Route component={NotFound} />
      )
    }
  />
);

export default () => (
  <Switch>
    <Route exact path="/" component={Movie} />
    <Route path="/movies" component={Movie} />
    <Route path="/login" component={LoginComponent} />
    <Route path="/cinemas" component={CinemaComponent} />
    <Route path="/register" component={SignupComponent} />
    <AuthRoute path="/profile" component={ProfileComponent} />
    <AdminRoute path={`/add-movie`} component={MovieForm} />
    <AdminRoute path={`/add-cinema`} component={CinemaForm} />
    <AdminRoute path={`/edit-movie/:movieID`} component={MovieEditForm} />
    <Route path={`/getShowDetails/:movieID`} component={Show} />
    <Route exact path={`/getMovieDetails/:movieID`} component={MovieDetails} />
    <AuthRoute
      path={`/getMovieDetails/:movieID/:cinemaID`}
      component={SeatMap}
    />
    <AuthRoute path="/change-password" component={ChangePasswordComponent} />
    <Route path="/bill" component={BillComponent} />
    <AdminRoute path="/edit-cinema/:cineID" component={EditCinemaForm} />
    <AuthRoute path="/my-tickets" component={TicketContainer} />
    <Route path="/contact" component={Contact} />
    <Route path="/help" component={Help}/>
    <Route component={NotFound} />
  </Switch>
);
