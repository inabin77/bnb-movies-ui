import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { withFormik } from "formik";
import { connect } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import TicketComponent from "../Ticket/TicketComponent";
import * as Yup from "yup";
import "./Seat.css";
import { addTicket, fetchTickets } from "./actions";
import _ from 'lodash'
class SeatMap extends Component {
  constructor() {
    super();
    this.state = {
      selectedSeats: [],
      totalAmount: 100,
      showModal: false,
      movie: {},
      cinema: {}
    };
  }

  toggleSeatSelect = seatNumber => {
    if (this.state.selectedSeats.includes(seatNumber)) {
      const selectedSeats = [...this.state.selectedSeats];
      const index = selectedSeats.indexOf(seatNumber);
      selectedSeats.splice(index, 1);
      this.setState({
        selectedSeats
      });
    } else
      this.setState({
        selectedSeats: [...this.state.selectedSeats, seatNumber]
      });
  };

  showModal = () => {
    this.setState({ showModal: true });
  };

  hideModal = () => {
    this.setState({ showModal: false });
  };

  print = () => {
    const movieID = this.props.match.params.movieID;
    const cinemaID = this.props.match.params.cinemaID;
    const userID = this.props.user._id
    let show_time =
      this.props &&
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.show_time;

    let data = {
      price: this.state.totalAmount * this.state.selectedSeats.length,
      userID,
      movieID,
      cinemaID,
      show_time,
      selectedSeats: this.state.selectedSeats
    };

    this.props.addTicket(data);

    var content = document.getElementById("ticket");
    var pri = document.getElementById("ifmcontentstoprint").contentWindow;
    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
  };

  componentDidMount() {
    const movieID = this.props.match.params.movieID;
    const cinemaID = this.props.match.params.cinemaID;
    let show_time =
      this.props &&
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.show_time;

    let movie = this.props.movies.find(mov => mov._id === movieID);
    let cinema = this.props.cinemas.find(cine => cine._id === cinemaID);
    this.props.fetchTickets({
      movieID,
      cinemaID,
      show_time
    });
    this.setState(
      {
        movie,
        cinema
      },
      () => {
        console.log(this.state);
      }
    );
  }

  render() {
    const { selectedSeats, totalAmount, showModal } = this.state;
    const seatNumbers = [
      "A1",
      "A2",
      "A3",
      "A4",
      "A5",
      "A6",
      "A7",
      "A8",
      "A9",
      "B1",
      "B2",
      "B3",
      "B4",
      "B5",
      "B6",
      "B7",
      "B8",
      "B9",
      "C1",
      "C2",
      "C3",
      "C4",
      "C5",
      "C6",
      "C7",
      "C8",
      "C9"
    ];
    const seatPlacement = seatNumbers.map(seatNumber => {
      return (
        <div
          key={seatNumber}
          className={
            selectedSeats.includes(seatNumber)
              ? "seat selected"
              : _.flatten(this.props.seats).includes(seatNumber)
                ? "seat booked"
                : "seat"
          }
          onClick={() => this.toggleSeatSelect(seatNumber)}
        >
          {seatNumber}
        </div>
      );
    });

    let show_time =
      this.props &&
      this.props.location &&
      this.props.location.state &&
      this.props.location.state.show_time;

    const movieID = this.props.match.params.movieID;
    const cinemaID = this.props.match.params.cinemaID;

    let {
      user: { email, name, phone }
    } = this.props;

    const selectedSeatsDetail = (
      <table class="Displaytable">
        <tr>
          <th>Name</th>
          <th>Number of Seats</th>
          <th>Seats</th>
        </tr>
        <tr key={selectedSeats.length}>
          <td>
            <textarea id="nameDisplay" disabled>
              {name}
            </textarea>
          </td>
          <td>
            <textarea id="NumberDisplay" disabled>
              {selectedSeats.length}
            </textarea>
          </td>
          <td>
            <textarea id="seatsDisplay" disabled>
              {selectedSeats.length > 0
                ? selectedSeats.toString()
                : "No seat selected"}
            </textarea>
          </td>
        </tr>
      </table>
    );

    return (
      <div
        style={{
          textAlign: "center"
        }}
      >
        <div class="checkout">
          <div class="sinopsis">
            <button class="back">
              <i class="zmdi zmdi-arrow-left" />
            </button>
            <img
              class="cover"
              src={this.state.movie.poster_link}
              height="300px"
              width="450px"
              alt="movie"
              style={{
                backgroundImage:
                  "url(https://image.tmdb.org/t/p/w300//gfJGlDaHuWimErCr5Ql0I8x9QSy.jpg)"
              }}
            />
            <h3>{this.state.movie.name}</h3>
            <p>{this.state.movie.description}</p>
            <span> <strong>Release Date: </strong> {this.state.movie.release_date}</span>
            <br/>
            <br />
            <small><strong>Run time: </strong>{this.state.movie.run_time}</small>
          </div>
          <section>
            <ul class="legend">
              <li>Available</li>
              <li>Taken</li>
            </ul>
            <span
              style={{
                fontWeight: "bold"
              }}
            >
              Select your seats
            </span>
            <div class="seats">{seatPlacement}</div>
            <div class="screen">screen</div>
            <br />
            Cinema: {this.state.cinema.name} &nbsp; &nbsp; Show: {show_time}
            <br />
            <div class="displayerBoxes">
              <center>{selectedSeatsDetail}</center>
            </div>
            <div
              style={{
                marginTop: "50px"
              }}
            >
              <small>Total Paying Amount: </small>
              <span>
                Rs.
                {totalAmount * selectedSeats.length}
              </span>
              &nbsp;&nbsp;&nbsp;
              <Modal isOpen={showModal} size="lg">
                <ModalHeader toggle={this.hideModal}>CHECKOUT</ModalHeader>
                <iframe
                  title="ticket"
                  id="ifmcontentstoprint"
                  style={{
                    height: "0px",
                    width: "0px",
                    position: "absolute"
                  }}
                />
                <ModalBody id="ticket">
                  <TicketComponent
                    totalAmount={totalAmount * selectedSeats.length}
                    selectedSeats={selectedSeats}
                    data={{
                      name: this.props.user.name,
                      movie_name: this.state.movie.name,
                      cinema_name: this.state.cinema.name,
                      release_date: this.state.movie.release_date,
                      show_time
                    }}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="secondary" onClick={this.hideModal}>
                    Cancel
                  </Button>
                  <Button color="primary" onClick={this.print}>
                    Print
                  </Button>
                </ModalFooter>
              </Modal>
              <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={this.showModal}
                disabled={selectedSeats.length < 1}
              >
                CHECKOUT
              </Button>
              <div class="loader" />
            </div>
          </section>
        </div>
      </div>
    );
  }
}

const EnhancedForm = withFormik({
  mapPropsToValues: props => {
    return {
      // email: props.user.email,
      // password: props.user.password,
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required("name is required!"),
    description: Yup.string().required("description is required"),
    price: Yup.number().required("Please enter the price"),
    run_time: Yup.string().required("Please enter your run_time"),
    director: Yup.string().required("Please enter director of movie"),
    cast: Yup.string().required("Please enter cast of movie"),
    trailer_link: Yup.string().required(
      "Please enter the trailer link from youtube"
    )
    // gender: Yup.string().required("Please enter your gender")
  }),

  handleSubmit: (values, { props: { addMovie }, setSubmitting }) => {
    // let formData = new FormData();
    // for (let key in values) {
    //   formData.append(key, values[key]);
    // }
    // addMovie(formData);
  }
})(SeatMap);

const mapStateToProps = state => {
  return {
    user: state.user,
    movies: state.movies.data,
    cinemas: state.cinemas.data,
    seats: state.seats.data.length && state.seats.data[0].selectedSeats
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchTickets: params => dispatch(fetchTickets(params)),
    addTicket: data => dispatch(addTicket(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EnhancedForm);
