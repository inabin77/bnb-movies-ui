import React, { Component } from "react";
import { Form, FormGroup, Label, Input, FormText } from "reactstrap";
import Button from "@material-ui/core/Button";
import Select from "react-select";
import { withFormik } from "formik";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import * as Yup from "yup";
import { addCinema } from "./actions";

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
class CinemaForm extends Component {
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
          <Input
            type="text"
            name="name"
            id="examplename"
            placeholder="Name of the cinema"
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
            name="address"
            id="examplePassword"
            placeholder="Address of the cinema"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-control ${errors.address &&
              touched.address &&
              "is-invalid"}`}
          />
          {errors.address &&
            touched.address && (
              <div className="invalid-feedback">{errors.address}</div>
            )}
        </FormGroup>
        <FormGroup>
          <Input
            type="number"
            name="phone"
            id="exampleText"
            placeholder="Phone number of cinema"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-control ${errors.phone &&
              touched.phone &&
              "is-invalid"}`}
          />
          {errors.phone &&
            touched.phone && (
              <div className="invalid-feedback">{errors.phone}</div>
            )}
        </FormGroup>
        {/* <FormGroup>
          <Input
            type="number"
            name="seats"
            id="examplePassword"
            placeholder="Total seats in cinema"
            onChange={handleChange}
            onBlur={handleBlur}
            className={`form-control ${errors.seats &&
              touched.seats &&
              "is-invalid"}`}
          />
          {errors.seats &&
            touched.seats && (
              <div className="invalid-feedback">{errors.seats}</div>
            )}
        </FormGroup> */}
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
  mapPropsToValues: props => {
    return {
      // email: props.user.email,
      // password: props.user.password,
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("name is required!"),
    address: Yup.string().required("address is required"),
    phone: Yup.number().required("Please enter the phone"),
  }),

  handleSubmit: (values, { props: { addCinema }, setSubmitting }) => {
    let formData = new FormData();
    for (let key in values) {
      formData.append(key, values[key]);
    }
    addCinema(formData);
  }
})(CinemaForm);

const mapStateToProps = state => {};

const mapDispatchToProps = dispatch => {
  return {
    addCinema: data => dispatch(addCinema(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EnhancedForm);
