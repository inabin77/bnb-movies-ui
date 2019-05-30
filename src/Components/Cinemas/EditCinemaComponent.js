import React, { Component } from "react";
import { Form, FormGroup, Label, Input, FormText } from "reactstrap";
import Button from "@material-ui/core/Button";
import Select from "react-select";
import { withFormik } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import { updateCinemaByID } from "./actions";

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
class CinemaEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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
      history
    } = this.props;
    return (
      <Form className="p-5 width-50-center" onSubmit={handleSubmit}>
        <FormGroup>
          {/* <div className="col-xs-12 col-sm-4 col-md-4"> */}
          {!values.poster && (
            <img className="img-responsive center" src={values.poster_link} height="350px" width="400px"/>
          )}
          {/* </div> */}
        </FormGroup>
        <Thumb file={values.poster} />

        <div>
          <FormGroup className="row">
          <label className="col-sm-2 col-form-label"> Name </label>
          <div className="col-sm-10">
            <Input
              type="text"
              name="name"
              id="examplename"
              value={values.name}
              placeholder="Name of the cinema"
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
        </div>
        <FormGroup className="row">
        <label className="col-sm-2 col-form-label"> Address </label>
          <div className="col-sm-10">
          <Input
            type="textarea"
            name="address"
            id="examplePassword"
            value={values.address}
            placeholder="Address of the cinema"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-control ${errors.address &&
              touched.address &&
              "is-invalid"}`}
          />
          </div>
          {errors.address &&
            touched.address && (
              <div className="invalid-feedback">{errors.address}</div>
            )}
        </FormGroup>
        <FormGroup className="row">
        <label className="col-sm-2 col-form-label"> Phone </label>
          <div className="col-sm-10">
          <Input
            type="number"
            name="phone"
            id="exampleText"
            value={values.phone}
            placeholder="Phone number of cinema"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-control ${errors.phone &&
              touched.phone &&
              "is-invalid"}`}
          />
          </div>
          {errors.phone &&
            touched.phone && (
              <div className="invalid-feedback">{errors.phone}</div>
            )}
        </FormGroup>
        {/* <FormGroup className="row">
        <label className="col-sm-2 col-form-label"> Total Seats </label>
          <div className="col-sm-10">
          <Input
            type="number"
            name="seats"
            value={values.seats}
            id="examplePassword"
            placeholder="Total seats in cinema"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-control ${errors.seats &&
              touched.seats &&
              "is-invalid"}`}
          />
          </div>
          {errors.seats &&
            touched.seats && (
              <div className="invalid-feedback">{errors.seats}</div>
            )}
        </FormGroup> */}
        {/* <FormGroup>
          <Input
            type="file"
            name="poster"
            id="file"
            onChange={event => {
              setFieldValue("poster", event.currentTarget.files[0]);
            }}
          />
          <Thumb file={values.poster} />
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
    const cineID = props.match.params.cineID;
    const cinema = props.cinemas.find(cine => cine._id === cineID);
    return { ...cinema };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("name is required!"),
    address: Yup.string().required("address is required"),
    phone: Yup.number().required("Please enter the phone"),
  }),

  handleSubmit: (
    values,
    {
      props: {
        updateCinemaByID,
        match: {
          params: { cineID }
        }
      },
      setSubmitting
    }
  ) => {
    let formData = new FormData();
    for (let key in values) {
      formData.append(key, values[key]);
    }
    updateCinemaByID(cineID, formData);
  }
})(CinemaEditForm);

const mapStateToProps = state => {
  return {
    cinemas: state.cinemas.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateCinemaByID: (cineID, data) =>
      dispatch(updateCinemaByID(cineID, data))
  };
};

export default  connect(
  mapStateToProps,
  mapDispatchToProps
)(EnhancedForm);
