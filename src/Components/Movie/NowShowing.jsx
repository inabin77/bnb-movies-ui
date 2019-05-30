import React, { Component, Fragment } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";
import { Link, Route } from "react-router-dom";
import shortID from "shortid";
import "./Movie.css";

const NowShowing = props => {
  const { movies, cinemas } = props;
  return (
    <div
      className="row"
      style={{
        textAlign: "center"
      }}
    >
      {movies.length
        ? movies.map(movie => (
            <Link
              className="col-4"
              style={{
                padding: "10px",
                margin: "0px"
              }}
              to={`/getMovieDetails/${movie._id}`}
            >
              <Card style={{ "min-height": "300px", "min-width": "200px" }}>
                <CardImg src={movie.poster_link} height="250px" width="200px" />
                <CardTitle>{movie.name}</CardTitle>
                <Link to={`/getShowDetails/${movie._id}`}>
                  <img
                    src="https://png.icons8.com/ios/1600/two-tickets.png"
                    className="ticket-icon"
                  />
                </Link>
              </Card>
            </Link>
          ))
        : null}
    </div>
  );
};

export default NowShowing;
