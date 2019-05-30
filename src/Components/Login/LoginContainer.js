import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import LoginComponent from "./LoginComponent";
import { login } from "./actions";

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <Fragment>
        <LoginComponent {...this.props} />
      </Fragment>
    );
  }
}

const mapStateToProps = state => {};

const mapDispatchToProps = dispatch => {
  return {
    login: data => dispatch(login(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
