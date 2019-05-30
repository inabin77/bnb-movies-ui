import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import MovieComponent from "./MovieListComponent";
import { fetchMovies } from "./actions";

class MovieContainer extends Component {
  componentDidMount() {
    this.props.fetchMovies();
  }

  render() {
    return (
      <Fragment>
        {this.props.loading ? "Loading" : <MovieComponent {...this.props} />}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    movies: state.movies.data,
    loading: state.movies.loading,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchMovies: () => {
      dispatch(fetchMovies());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieContainer);
