import React from "react";
import { withFormik } from "formik";
import * as Yup from "yup";

import "./Login.css";

const LoginForm = props => {
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
  } = props;

  return (
    <form className="p-5 width-50-center" onSubmit={handleSubmit}>
      <h1>Login</h1>
      <div className="form-group">
        <input
          name="email"
          type="text"
          className={`form-control ${errors.email &&
            touched.email &&
            "is-invalid"}`}
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={"Email"}
        />
        {errors.email &&
          touched.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
      </div>
      <div className="form-group">
        <input
          name="password"
          type="password"
          className={`form-control ${errors.password &&
            touched.password &&
            "is-invalid"}`}
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={"Password"}
        />
        {errors.password &&
          touched.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
      </div>

      <button
        type="submit"
        className="btn btn-outline-primary"
        // disabled={isSubmitting}
      >
        LOGIN
        {/* {isSubmitting ? "WAIT PLIZ" : "CLICK ME"} */}
      </button>
    </form>
  );
};

export default withFormik({
  mapPropsToValues: props => ({
    // email: props.user.email,
    // password: props.user.password,
  }),

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required!"),
    password: Yup.string().required("Password is required!")
  }),

  handleSubmit: (values, { props: { login }, setSubmitting }) => {

    let data = values;
    login(data)

  }
})(LoginForm);
