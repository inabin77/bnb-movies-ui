import React, { Component } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import Button from "@material-ui/core/Button";
import Select from "react-select";
import { withFormik } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import { updateMovieByID } from "./actions";
import { fetchCinemas } from "../Cinemas/actions";

class Thumb extends React.Component {
  state = {
    loading: false,
    thumb: undefined
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.file) {
      return;
    }

    this.setState({ loading: true }, () => {
      let reader = new FileReader();

      reader.onloadend = () => {
        this.setState({ loading: false, thumb: reader.result });
      };

      reader.readAsDataURL(nextProps.file);
    });
  }

  removeUploadedImage = () => {
      this.setState({
          thumb: null,
      })
  }

  render() {
    const { file } = this.props;
    const { loading, thumb } = this.state;
    if (!file) {
      return null;
    }

    if (loading) {
      return <p>loading...</p>;
    }

    return (
      <div className="avatar-upload">
        {/* <div className="avatar-edit" onClick={this.removeUploadedImage}>
          X
        </div> */}
        <img
          src={thumb}
          alt={file.name}
          className="img-thumbnail mt-2"
          height={200}
          width={200}
        />
      </div>
    );
  }
}

class MovieEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCinemas: {},
      movie: {}
    };
  }

  componentDidMount() {
    this.props.fetchCinemas();
    // const movieID = this.props.match.params.movieID;
    // let movie = this.props.movies.find(mov => mov._id === movieID);
    // this.setState(
    //   {
    //     movie
    //   },
    //   () => {
    //     console.log(this.state);
    //   }
    // );
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.file) {
      return;
    }

    this.setState({ loading: true }, () => {
      let reader = new FileReader();

      reader.onloadend = () => {
        this.setState({ loading: false, thumb: reader.result });
      };

      reader.readAsDataURL(nextProps.file);
    });
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  handleCinemaCheck = (event, cineID) => {
    let { name, value } = event.target;
    this.setState(
      {
        selectedCinemas: {
          ...this.state.selectedCinemas,
          [cineID]: ["MOCK"]
        }
      },
      () => {
        console.log("state", this.state);
      }
    );
  };

  handleShowCheck = (event, cineID, show) => {
    let { name, value } = event;
    console.log("ss", this.state, cineID);
    this.setState({
      selectedCinemas: {
        // ...this.state.selectedCinemas,
        [cineID]: [this.state.selectedCinemas[cineID], show]
      }
    });
  };

  render() {
    const {
      values,
      touched,
      errors,
      dirty,
      isSubmitting,
      handleChange,
      setFieldValue,
      handleBlur,
      handleSubmit,
      handleReset,
      cinemas,
      history
    } = this.props;

    console.log(values);

    return (
      <Form className="p-5 width-50-center" onSubmit={handleSubmit}>
        <FormGroup>
          {/* <div className="col-xs-12 col-sm-4 col-md-4"> */}
          {!values.poster && (
            <img className="img-responsive center" src={values.poster_link} height="250px" width="200px"/>
          )}
          {/* </div> */}
        </FormGroup>
        <Thumb file={values.poster} />

        <FormGroup className="row">
        <label className="col-sm-2 col-form-label"> Name </label>
          <div className="col-sm-10">
          <Input
            type="text"
            name="name"
            id="name"
            value={values.name}
            placeholder="Name of the movie"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-control ${errors.name &&
              touched.name &&
              "is-invalid"}`}
          />
          </div>
          {errors.name &&
            touched.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
        </FormGroup>
        <FormGroup className="row">
        <label className="col-sm-2 col-form-label"> Description </label>
          <div className="col-sm-10">
          <Input
            style={{
              height: "100px"
            }}
            type="textarea"
            name="description"
            id="description"
            value={values.description}
            placeholder="Description of movie"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-control ${errors.description &&
              touched.description &&
              "is-invalid"}`}
          />
          </div>
          {errors.description &&
            touched.description && (
              <div className="invalid-feedback">{errors.description}</div>
            )}
        </FormGroup>
        <FormGroup className="row">
        <label className="col-sm-2 col-form-label"> Price </label>
          <div className="col-sm-10">
          <Input
            type="number"
            name="price"
            id="exampleText"
            value={values.price}
            placeholder="Ticket price of movie"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-control ${errors.price &&
              touched.price &&
              "is-invalid"}`}
          />
          </div>
          {errors.price &&
            touched.price && (
              <div className="invalid-feedback">{errors.price}</div>
            )}
        </FormGroup>
        <FormGroup className="row">
        <label className="col-sm-2 col-form-label"> Release Date </label>
          <div className="col-sm-10">
          <Input
            type="date"
            name="date"
            value={values.release_date}
            id="examplePassword"
            placeholder="Release date of movie"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-control ${errors.date &&
              touched.date &&
              "is-invalid"}`}
          />
          </div>
          {errors.date &&
            touched.date && (
              <div className="invalid-feedback">{errors.date}</div>
            )}
        </FormGroup>
        <FormGroup className="row">
        <label className="col-sm-2 col-form-label"> Run time </label>
          <div className="col-sm-10">
          <Input
            type="run_time"
            value={values.run_time}
            name="run_time"
            id="examplePassword"
            placeholder="Runtime of movie"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-control ${errors.run_time &&
              touched.run_time &&
              "is-invalid"}`}
          />
          </div>
          {errors.run_time &&
            touched.run_time && (
              <div className="invalid-feedback">{errors.run_time}</div>
            )}
        </FormGroup>
        <FormGroup className="row">
        <label className="col-sm-2 col-form-label"> Director </label>
          <div className="col-sm-10">
          <Input
            type="text"
            name="director"
            id="exampleText"
            value={values.director}
            placeholder="Director of movie"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-control ${errors.director &&
              touched.director &&
              "is-invalid"}`}
          />
          </div>
          {errors.director &&
            touched.director && (
              <div className="invalid-feedback">{errors.director}</div>
            )}
        </FormGroup>
        <FormGroup className="row">
        <label className="col-sm-2 col-form-label"> Cast </label>
          <div className="col-sm-10">
          <Input
            type="textarea"
            name="cast"
            id="exampleText"
            value={values.cast}
            placeholder="cast of movie"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-control ${errors.cast &&
              touched.cast &&
              "is-invalid"}`}
          />
          </div>
          {errors.cast &&
            touched.cast && (
              <div className="invalid-feedback">{errors.cast}</div>
            )}
        </FormGroup>

        <FormGroup className="row">
        <label className="col-sm-2 col-form-label"> Trailer link </label>
          <div className="col-sm-10">
          <Input
            type="url"
            name="trailer_link"
            value={values.trailer_link}
            id="exampleText"
            placeholder="Youtube movie link"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-control ${errors.trailer_link &&
              touched.trailer_link &&
              "is-invalid"}`}
          />
          </div>
          {errors.trailer_link &&
            touched.trailer_link && (
              <div className="invalid-feedback">{errors.trailer_link}</div>
            )}
        </FormGroup>
        <FormGroup>
          <Input
            type="file"
            name="poster"
            id="file"
            onChange={event => {
              setFieldValue("poster", event.currentTarget.files[0]);
            }}
          />
          <Thumb file={values.poster} />
        </FormGroup>
        <Button  style={{
          backgroundColor:  '#ffc107'
        }} variant="contained" type="button"  onClick={() => history.goBack()}>Cancel</Button>&nbsp;&nbsp;&nbsp;&nbsp;
        <Button color="primary" type="submit" variant="contained" >Submit</Button>
      </Form>
    );
  }
}

const EnhancedForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => {
    const movieID = props.match.params.movieID;
    const movie = props.movies.find(mov => mov._id === movieID);
    return { ...movie };
  },

  // validationSchema: Yup.object().shape({
  //   name: Yup.string().required("name is required!"),
  //   description: Yup.string().required("description is required"),
  //   run_time: Yup.string().required("Please enter your run_time"),
  //   director: Yup.string().required("Please enter director of movie"),
  //   cast: Yup.string().required("Please enter cast of movie"),
  //   trailer_link: Yup.string().required(
  //     "Please enter the trailer link from youtube"
  //   )
  // }),

  handleSubmit: (values, { props: { updateMovieByID, match }, setSubmitting }) => {
    let formData = new FormData();
    for (let key in values) {
      formData.append(key, values[key]);
    }
    let movieID = match.params.movieID
    updateMovieByID(movieID, formData);
  }
})(MovieEditForm);

const mapStateToProps = state => {
  return {
    movies: state.movies.data,
    cinemas: state.cinemas.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateMovieByID: (movieID, data) => dispatch(updateMovieByID(movieID, data)),
    fetchCinemas: () => dispatch(fetchCinemas())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EnhancedForm);
