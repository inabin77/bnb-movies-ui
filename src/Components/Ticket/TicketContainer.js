import React, { Component } from "react";
import { connect } from "react-redux";

import TicketComponent from "./TicketComponent";

class TicketContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <TicketComponent {...this.props}/>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //   addCinema: data => dispatch(addCinema(data))
  };
};

export default connect(
  mapStateToProps,
  mapStateToProps
)(TicketContainer);
