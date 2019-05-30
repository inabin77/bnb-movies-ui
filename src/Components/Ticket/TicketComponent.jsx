import React, { Component } from "react";
import "./Ticket.css";
class TicketComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      totalAmount,
      selectedSeats,
      data: { name, movie_name, cinema_name, show_time, release_date, run_time }
    } = this.props;
    return (
      <div className="cardWrap">
        <div className="tcard cardLeft">
          <h1>{cinema_name}</h1>
          <div className="title">
            <h2>
              {movie_name}{" "}
              <span
                style={{
                  float: "right",
                  color: "black"
                }}
              >
                {/* Invoice no: 190826 */}
              </span>
            </h2>
            <span>movie</span>
          </div>
          <div className="name">
            <h2>{name}</h2>
            <span>name</span>
          </div>
          <div className="seat">
            <h2>{release_date}</h2>
            <span>date</span>
          </div>
          <div className="time">
            <h2>{show_time}</h2>
            <span>time</span>
          </div>
          <div
            className="time"
            style={{
              float: "right"
            }}
          >
            <h2>
              Rs.
              {totalAmount}
            </h2>
            <span>total price</span>
          </div>
        </div>
        <div className="tcard cardRight">
          <div className="eye" />
          <div className="number" style={{}}>
            <h6
              style={{
                fontSize: "11px",
                position: "relative"
              }}
            >
              {selectedSeats.toString()}
            </h6>
            <span>seat</span>
          </div>
          <div className="barcode" />
        </div>
      </div>
    );
  }
}

export default TicketComponent;
