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
import { addMovie } from "./actions";
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
      <img
        src={thumb}
        alt={file.name}
        className="img-thumbnail mt-2"
        height={200}
        width={200}
      />
    );
  }
}
class MovieForm extends Component {
  // const { selectedOption } = this.props.selectedOption

  constructor(props) {
    super(props);
    this.state = {
      selectedCinemas: {},
      checkedCinemas : []
    };
  }

  componentDidMount() {
    this.props.fetchCinemas();
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  handleCinemaCheck = cineID => {
    if(this.state.checkedCinemas.includes(cineID)) {
      delete this.state.selectedCinemas[cineID];
      const checkedCinemas = [...this.state.checkedCinemas];
      const index = checkedCinemas.indexOf(cineID);
      checkedCinemas.splice(index, 1);
      this.setState({
        checkedCinemas
      });
    }
    else
      this.setState({
        checkedCinemas: [...this.state.checkedCinemas, cineID]
      });
  };

  handleShowCheck = (cineID, show) => {
    if(this.state.selectedCinemas[cineID]) {
      if(this.state.selectedCinemas[cineID].includes(show)){
        const selectedShow = [...this.state.selectedCinemas[cineID]]
        const index = selectedShow.indexOf(show);
        selectedShow.splice(index, 1);
        this.setState({
          selectedCinemas: {
            ...this.state.selectedCinemas,
            [cineID]: [...selectedShow]
          }
        })
      }
      else
      this.setState({
        selectedCinemas: {
          ...this.state.selectedCinemas,
          [cineID]: [...this.state.selectedCinemas[cineID], show]
        }
      });
    }
    else
      this.setState({
        selectedCinemas: {
          ...this.state.selectedCinemas,
          [cineID]: [show]
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
    const { checkedCinemas, selectedCinemas } = this.state;
    console.log(selectedCinemas);
    const showTimes = ['9 AM', '12 PM', '3 PM', '6 PM'];
    return (
      <Form className="p-5 width-50-center" onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            type="text"
            name="name"
            id="examplename"
            placeholder="Name of the movie"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-control ${errors.name &&
              touched.name &&
              "is-invalid"}`}
          />
          {errors.name &&
            touched.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
        </FormGroup>
        <FormGroup>
          <Input
            type="textarea"
            name="description"
            id="examplePassword"
            placeholder="Description of movie"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-control ${errors.description &&
              touched.description &&
              "is-invalid"}`}
          />
          {errors.description &&
            touched.description && (
              <div className="invalid-feedback">{errors.description}</div>
            )}
        </FormGroup>
        <FormGroup>
          <Input
            type="number"
            name="price"
            id="exampleText"
            placeholder="Ticket price of movie"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-control ${errors.price &&
              touched.price &&
              "is-invalid"}`}
          />
          {errors.price &&
            touched.price && (
              <div className="invalid-feedback">{errors.price}</div>
            )}
        </FormGroup>
        <FormGroup>
          <Input
            type="date"
            name="release_date"
            id="examplePassword"
            placeholder="Release release_date of movie"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-control ${errors.release_date &&
              touched.release_date &&
              "is-invalid"}`}
          />
          {errors.release_date &&
            touched.release_date && (
              <div className="invalid-feedback">{errors.release_date}</div>
            )}
        </FormGroup>
        <FormGroup>
          <Input
            type="run_time"
            name="run_time"
            id="examplePassword"
            placeholder="Runtime of movie"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-control ${errors.run_time &&
              touched.run_time &&
              "is-invalid"}`}
          />
          {errors.run_time &&
            touched.run_time && (
              <div className="invalid-feedback">{errors.run_time}</div>
            )}
        </FormGroup>
        <FormGroup>
          <Input
            type="text"
            name="director"
            id="exampleText"
            placeholder="Director of movie"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-control ${errors.director &&
              touched.director &&
              "is-invalid"}`}
          />
          {errors.director &&
            touched.director && (
              <div className="invalid-feedback">{errors.director}</div>
            )}
        </FormGroup>
        <FormGroup>
          <Input
            type="textarea"
            name="cast"
            id="exampleText"
            placeholder="cast of movie"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-control ${errors.cast &&
              touched.cast &&
              "is-invalid"}`}
          />
          {errors.cast &&
            touched.cast && (
              <div className="invalid-feedback">{errors.cast}</div>
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
            // className={`form-control ${errors.poster &&
            //   touched.poster &&
            //   "is-invalid"}`}
          />
          {errors.poster &&
            touched.poster && (
              <div className="invalid-feedback">{errors.poster}</div>
            )}
            <Thumb file={values.poster} />
        </FormGroup>
        <FormGroup>
          <Input
            type="url"
            name="trailer_link"
            id="exampleText"
            placeholder="Youtube movie link"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-control ${errors.trailer_link &&
              touched.trailer_link &&
              "is-invalid"}`}
          />
          {errors.trailer_link &&
            touched.trailer_link && (
              <div className="invalid-feedback">{errors.trailer_link}</div>
            )}
        </FormGroup>


        {/* <FormGroup style={{ textAlign: 'left' }}>
          <Label>Please select cinemas:</Label>
          <fieldset
            style={{
              border: "1px solid #d6d9dc",
              padding: '13px',
              textAlign: 'left'
            }}
          >
            {cinemas.map(cine => {
              let cineID = cine._id;
              return (
                <FormGroup check>
                    <Input
                      type="checkbox"
                      onClick={() => {
                        this.handleCinemaCheck(cineID);
                      }}
                    />{" "}
                    {cine.name} {
                      checkedCinemas.includes(cineID) &&
                        <div className='text-center'>
                          { showTimes.map(showTime => {
                            return <li className='list-inline-item' style={{ fontSize: '14px' }}>
                                    <Input
                                      type="checkbox"
                                      onClick={() => {
                                        this.handleShowCheck(cineID, showTime);
                                      }}/>
                                    {showTime} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                  </li>
                            })
                          }
                        </div>
                      }
                </FormGroup>
              );
            })}
          </fieldset>
        </FormGroup> */}
        <Button  style={{
          backgroundColor:  '#ffc107'
        }} variant="contained" type="button"  onClick={() => history.goBack()}>Cancel</Button>&nbsp;&nbsp;&nbsp;&nbsp;
        <Button color="primary" type="submit" variant="contained" >Submit</Button>
      </Form>
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
    release_date: Yup.string().required("release_date is required"),
    price: Yup.number().required("Please enter the price"),
    run_time: Yup.string().required("Please enter your run_time"),
    director: Yup.string().required("Please enter director of movie"),
    cast: Yup.string().required("Please enter cast of movie"),
    trailer_link: Yup.string().required(
      "Please enter the trailer link from youtube"
    )
    // gender: Yup.string().required("Please enter your gender")
  }),

  handleSubmit: (values, { props: { addMovie } }, state) => {
    let formData = new FormData();
    for (let key in values) {
      formData.append(key, values[key]);
    }
    addMovie(formData);
  }
})(MovieForm);

const mapStateToProps = state => {
  return {
    cinemas: state.cinemas.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addMovie: data => dispatch(addMovie(data)),
    fetchCinemas: () => dispatch(fetchCinemas())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EnhancedForm);
