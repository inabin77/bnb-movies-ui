import React, { Component } from "react";
import { withFormik } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import Select from "react-select";
import { updateProfile } from "./actions"
class Profile extends Component {
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
      handleReset
    } = this.props;

    return (
      <div>
        <form className="p-5 width-50-center" onSubmit={handleSubmit}>
          <h1>Profile</h1>

          <div className="form-group row">
          <label className="col-sm-2 col-form-label"> Name </label>
          <div className="col-sm-10">
            <input
              name="name"
              className="form-control"
              type="text"
              value={values.name}
              className={`form-control ${errors.name &&
                touched.name &&
                "is-invalid"}`}
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={"Name"}
            />
            </div>
            {errors.name &&
              touched.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
          </div>
          <div className="form-group row">
          <label className="col-sm-2 col-form-label"> Email </label>
          <div className="col-sm-10">
            <input
              name="email"
              className="form-control"
              type="text"
              className={`form-control ${errors.email &&
                touched.email &&
                "is-invalid"}`}
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={"Email"}
            />
            </div>
            {errors.email &&
              touched.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
          </div>

          <div className="form-group row">
          <label className="col-sm-2 col-form-label"> Phone </label>
          <div className="col-sm-10">
            <input
              name="phone"
              className="form-control"
              type="number"
              className={`form-control ${errors.phone &&
                touched.phone &&
                "is-invalid"}`}
              value={values.phone}
              onChange={handleChange}
              placeholder={"phone"}
              onBlur={handleBlur}
            />
            </div>
            {errors.phone &&
              touched.phone && (
                <div className="invalid-feedback">{errors.phone}</div>
              )}
          </div>

          <div className="form-group row">
          <label className="col-sm-2 col-form-label"> Date of Birth </label>
          <div className="col-sm-10">
            <input
              name="dob"
              className="form-control"
              type="date"
              className={`form-control ${errors.dob &&
                touched.dob &&
                "is-invalid"}`}
              value={values.dob}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={"Date of birth"}
            />
            </div>
            {errors.dob &&
              touched.dob && (
                <div className="invalid-feedback">{errors.dob}</div>
              )}
          </div>

          <div className="form-group row">
          <label className="col-sm-2 col-form-label"> Gender </label>
          <div className="col-sm-10">
            <Select
              name="gender"
              placeholder={"Gender"}
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" }
              ]}
              value={{
                value: values.gender,
                label: values.gender === "male" ? "Male" : values.gender
              }}
              onChange={event => {
                setFieldValue("gender", event.value);
              }}
            />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-outline-primary"
            // disabled={isSubmitting}
          >
            {/* {isSubmitting ? "WAIT PLIZ" : "CLICK ME"} */}
            Update
          </button>
        </form>
      </div>
    );
  }
}

const EnhancedForm = withFormik({
  mapPropsToValues: props => {
    return { ...props.user };
  },
  // validationSchema: Yup.object().shape({
  //   name: Yup.string().required("name is required!"),
  //   address: Yup.string().required("address is required"),
  //   phone: Yup.number().required("Please enter the phone"),
  //   seats: Yup.string().required("Please enter your seats")
  // }),

  handleSubmit: (values, { props: { updateProfile, user }, setSubmitting }) => {
    let userID = user._id;
    updateProfile(userID, values);
  }
})(Profile);

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateProfile: (movieID, data) => dispatch(updateProfile(movieID, data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EnhancedForm);
