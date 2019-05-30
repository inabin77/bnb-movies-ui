import React from "react";
import { withFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";

import "./Signup.css";

const SignupForm = props => {
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
      <h1>Register</h1>
      <div className="form-group">
        <input
          name="name"
          type="text"
          className={`form-control ${errors.name &&
            touched.name &&
            "is-invalid"}`}
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={"Name"}
        />
        {errors.name &&
          touched.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>
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
          name="phone"
          type="number"
          className={`form-control ${errors.phone &&
            touched.phone &&
            "is-invalid"}`}
          value={values.phone}
          onChange={handleChange}
          placeholder={"phone"}
          onBlur={handleBlur}
        />
        {errors.phone &&
          touched.phone && (
            <div className="invalid-feedback">{errors.phone}</div>
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

      <div className="form-group">
        <input
          name="dob"
          type="date"
          className={`form-control ${errors.dob &&
            touched.dob &&
            "is-invalid"}`}
          value={values.dob}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={"Date of birth"}
        />
        {errors.dob &&
          touched.dob && <div className="invalid-feedback">{errors.dob}</div>}
      </div>

      <div className="form-group">
        <Select
          name="gender"
          placeholder={"Gender"}
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" }
          ]}
          // value={values.gender}
          onChange={event => {
            setFieldValue("gender", event.value)
          }}
        />
      </div>

      <button
        type="submit"
        className="btn btn-outline-primary"
        // disabled={isSubmitting}
      >
        {/* {isSubmitting ? "WAIT PLIZ" : "CLICK ME"} */}
        Signup
      </button>
    </form>
  );
};

export default withFormik({
    mapPropsToValues: props => {
      return ({
        // email: props.user.email,
        // password: props.user.password,
      })
    },

  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required!"),
    password: Yup.string().required("This man needs a password"),
    name: Yup.string().required("Please enter the name"),
    phone: Yup.number().required("Please enter your phone number"),
    // dob: Yup.date().required("Please enter date of birth"),
    // gender: Yup.string().required("Please enter your gender")
  }),

  handleSubmit: (values, { props: { signup } , setSubmitting }) => {

    let data = values;
    signup(data)
  }
})(SignupForm);
