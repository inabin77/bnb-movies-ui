import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CinemaComponent from "./CinemaComponent";
import { addCinema, fetchCinemas, deleteCinema } from "./actions";
import autoMergeLevel1 from "redux-persist/es/stateReconciler/autoMergeLevel1";

class CinemaContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.fetchCinemas();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.key !== this.props.location.key) {
      this.props.fetchCinemas()
    }
  }

  render() {
    return (
      <div className="p-5 " style={{
        width:"90%",
        margin:"0 auto",
      }}>
        {this.props.user.role === 1 && (
          <div className="width-50-center">
          <Link to="/add-cinema" className="center">
            <Button type="button" variant="contained" color="primary" style={{ textAlign:"center",
            
              margin: "0 auto"}}>
              Add a cinema
            </Button>
          </Link>
          </div>
        )}
        <CinemaComponent {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cinemas: state.cinemas.data,
    loading: state.cinemas.loading,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addCinema: data => {
      dispatch(addCinema(data));
    },
    fetchCinemas: () => {
      dispatch(fetchCinemas());
    },
    deleteCinema: cinemaID => {
      dispatch(deleteCinema(cinemaID));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CinemaContainer);
