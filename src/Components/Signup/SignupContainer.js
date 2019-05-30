import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import SignupComponent from "./SignupComponent";
import { signup } from "./actions";

class SignupContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <Fragment>
        <SignupComponent {...this.props} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {};

const mapDispatchToProps = dispatch => {
  return {
    signup: data => dispatch(signup(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupContainer);
