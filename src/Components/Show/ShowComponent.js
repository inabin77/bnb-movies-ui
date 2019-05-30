import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import moment from "moment";

import "./Show.css";

// IDEA: Possible implementations -@mac at 10/21/2018, 11:21:15 PM
// Add a new component to select the movies for today, tommorrow and upcoming days
class ShowDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cinema: "",
      movie: {}
    };
  }
  componentDidMount() {
    const movieID = this.props.match.params.movieID;
    let movie = this.props.movies.find(mov => mov._id === movieID);
    this.setState(
      {
        movie
      },
      () => {
        console.log(this.state);
      }
    );
  }

  render() {
    if (this.state.movie) {
      let movieID = this.props.match.params.movieID;
      if (this.state.movie) {
        let {
          trailer_link,
          poster_link,
          cast,
          description,
          name,
          director,
          release_date,
          run_time,
          genre
        } = this.state.movie;
        return (
          <div>
            <div
              class="content"
              style={{
                padding: "70px"
              }}
            >
              <div class="content-box book-details">
                <div class="clearfix">
                  <div>
                    <div>
                      <h1>{name}</h1>
                    </div>
                    <div class="pad-t-15 mar-t-15">
                      <p class="movie-type" />
                      <p>Runtime: {run_time}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div class="col-4">
                      <img
                        class="img-responsive"
                        src={poster_link}
                        height="350px"
                        width="260px"
                      />
                    </div>
                    <div class="col-8 show-movies" id="showDateTimeDivId">
                      {this.state.movie &&
                        this.state.movie.cinemas &&
                        this.state.movie.cinemas.map((cine, index) => {
                          return Object.keys(cine).map(cineID => {
                            return (
                              <div class="show-movies">
                                <div class="show-movie clearfix">
                                  <div className="row">
                                    <div class="">
                                      <h2 class="show-hall-name">
                                        {
                                          this.props.cinemas.find(
                                            cine => cine._id == cineID
                                          ).name
                                        }
                                      </h2>
                                    </div>
                                    {cine[cineID].map(sh => {
                                      return (
                                        <div class="">
                                          <div class="show-times pad-sm-l-15">
                                            <Link
                                              className="time-mark time-mark-available"
                                              to={{
                                                pathname: `/getMovieDetails/${movieID}/${cineID}`,
                                                state: {
                                                  show_time: sh
                                                }
                                              }}
                                            >
                                              <span class=" time">{sh}</span>
                                              <span class="hour">Hrs</span>
                                            </Link>
                                          </div>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            );
                          });
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return "Loading...";
      }
    }
  }
}

const mapStateToProps = state => {
  return {
    movies: state.movies.data,
    cinemas: state.cinemas.data
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowDetails);
