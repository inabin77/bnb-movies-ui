import React from "react";
import TextField from "@material-ui/core/TextField";

const OutlinedTextField = ({ field, form: { touched, errors } }, ...props) => {
  return (
    <div>
      <TextField {...field} {...props} />
      {touched[field.name] &&
        errors[field.name] && <div className="error">{errors[field.name]}</div>}
    </div>
  );
};

export default OutlinedTextField;
