import React, { Fragment } from "react";
import { withRouter, Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

import NowShowing from "./NowShowing";

const MovieComponent = props => {
  let { movies, cinemas } = props;
  return (
    <div className="p-5 width-50-center">
      {props.user.role === 1 && (
        <Link to="/add-movie">
          <Button variant="contained" color="primary" type="button">
            Add a movie
          </Button>
        </Link>
      )}
      <NowShowing movies={movies} cinemas={cinemas} />
    </div>
  );
};

export default withRouter(MovieComponent);
