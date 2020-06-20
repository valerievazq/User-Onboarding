import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

//YUP VALIDATION FORMSCHEMA
const formSchema = yup.object().shape({
  name: yup.string().required("Name is a required field"),
  email: yup
    .string()
    .email("Must be a valid email address")
    .required("Must include email address"),
  password: yup
    .string()
    .min(6, "Passwords must be at least 6 characters long.")
    .required("Password is Required"),
  terms: yup.boolean().oneOf([true], "You must agree to terms of use"),
});

function Form() {
  //STATES FOR THE FORM VALUES
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,
  });

  //BUTTON DISABLING WHEN FORM FAILS TO PASS VALIDATION
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    formSchema.isValid(formState).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [formState]);

  //ERROR STATE
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
    terms: "",
  });

  //VALIDATION FN
  const validate = (e) => {
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    yup
      //THIS GOES TO THE SCHEMA WE PREVIOUSLY CREATED AND RETRIEVE THE INFORMATION FOR VALIDATION
      .reach(formSchema, e.target.name)
      .validate(value)
      //THIS CLEARS THE ERROR MESSAGE IF FORM PASSES VALIDATION
      .then((valid) => {
        setError({
          ...error,
          [e.target.name]: "",
        });
      })
      //IF VALIDATION FAILS THIS RETRIEVES THE ERROR WE CREATED IN OUR SCHEMA
      .catch((err) => {
        setError({
          ...error,
          [e.target.name]: err.errors[0],
        });
      });
  };

  //ONCHANGE FN
  const handleChange = (e) => {
    e.persist(); //ALLOWS US TO RUN IT ASYNC
    validate(e);
    let value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormState({ ...formState, [e.target.name]: value });
  };



  //STATE FOR NEW USER POST SUBMISSION
  const [users, setUsers] = useState([]);

  //ON SUBMISSION FN
  const formSubmit = (e) => {
    e.preventDefault(); // PREVENTS FORM FROM CLEARING
    console.log("FORM ACCEPTED & VALIDATED");
    //SENDS THE INFORMATION FROM THE POST TO SERVER
    axios
      .post("https://reqres.in/api/users", formState)
      .then((res) => {
        setUsers(res.data);
      })
      // .then((response) => console.log(response))
      .catch((err) => console.log(err));
  };


  
  //FORM
  return (
    <form onSubmit={formSubmit}>
      <div className="form">
        <div>
          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              id="name"
              value={formState.name}
              onChange={handleChange}
              className="input"
            />
          </label>
        </div>
        <div>
          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              id="email"
              value={formState.email}
              onChange={handleChange}
              className="input"
            />
            {error.email.length > 0 ? <p>{error.email}</p> : null}
          </label>
        </div>

        <div>
          <label htmlFor="password">
            Password
            <input
              id="password"
              type="password"
              name="password"
              value={formState.password}
              onChange={handleChange}
              className="input"
            />
            {error.password.length > 0 ? <p>{error.password}</p> : null}
          </label>
        </div>

        <div>
          <label htmlFor="terms">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={formState.terms}
              onChange={handleChange}
            />
            Terms & Conditions
            {error.terms.length > 0 ? <p>{error.terms}</p> : null}
          </label>
        </div>
        <div>
          <button className="button" disabled={buttonDisabled}>
            Submit
          </button>
          <pre>{JSON.stringify(users, null, 2)}</pre>
        </div>
      </div>
    </form>
  );
}
export default Form;
