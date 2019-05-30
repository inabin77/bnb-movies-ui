import React, { Component } from "react";
import { withFormik } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: "",
      confirmPassword: ""
    };
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
          <h1>Change password</h1>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label">
              {" "}
              Current Password{" "}
            </label>
            <div className="col-sm-10">
              <input
                name="currentPassword"
                type="text"
                className={`form-control ${errors.currentPassword &&
                  touched.currentPassword &&
                  "is-invalid"}`}
                value={values.currentPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={"Current Password"}
              />
            </div>
            {errors.currentPassword &&
              touched.currentPassword && (
                <div className="invalid-feedback">{errors.currentPassword}</div>
              )}
          </div>
          <div className="form-group row">
            <label className="col-sm-2 col-form-label"> New Password </label>
            <div className="col-sm-10">
              <input
                name="newPassword"
                type="text"
                className={`form-control ${errors.newPassword &&
                  touched.newPassword &&
                  "is-invalid"}`}
                value={values.newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={"New Password"}
              />
            </div>
            {errors.newPassword &&
              touched.newPassword && (
                <div className="invalid-feedback">{errors.newPassword}</div>
              )}
          </div>

          <div className="form-group row">
            <label className="col-sm-2 col-form-label">
              {" "}
              Confirm Password{" "}
            </label>
            <div className="col-sm-10">
              <input
                name="confirmPassword"
                type="text"
                className={`form-control ${errors.confirmPassword &&
                  touched.confirmPassword &&
                  "is-invalid"}`}
                value={values.confirmPassword}
                onChange={handleChange}
                placeholder={"confirmPassword"}
                onBlur={handleBlur}
              />
            </div>
            {errors.confirmPassword &&
              touched.confirmPassword && (
                <div className="invalid-feedback">{errors.confirmPassword}</div>
              )}
          </div>

          <button
            type="submit"
            className="btn btn-outline-primary"
            // disabled={isSubmitting}
          >
            {/* {isSubmitting ? "WAIT PLIZ" : "CLICK ME"} */}
            Change Pasword
          </button>
        </form>
      </div>
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
    newPassword: Yup.string()
      .min(6, "Password has to be longer than 6 characters!")
      .required("Password is required!")
  }),

  handleSubmit: (values, { props: { addCinema }, setSubmitting }) => {
    // addCinema(formData);
  }
})(ChangePassword);

const mapStateToProps = state => {};

const mapDispatchToProps = dispatch => {
  return {
    //   addCinema: data => dispatch(addCinema(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EnhancedForm);
