import "./Login.css";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import classes from "./Login.module.css";
import { useState } from "react";
// import Card from "../ui/Card";

function Login(props) {
  const usernameInputRef = useRef("");
  const passwordInputRef = useRef("");

  const history = useHistory();

  const [errorMessage, setErrorMessage] = useState("");

  async function submitHandler(event) {
    event.preventDefault();
    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    await fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        enteredUsername,
        enteredPassword,
      }),
    }).then((response) => {
      console.log(response);
      axios
        .get("api/user", { withCredentials: true })
        .then(function (response) {
          const content = response.data;
          history.replace("/");
          props.setId(content.id);
          props.setName(content.name);
        })
        .catch(function (error) {
          console.log(error);
          if (error.status === 403) {
            setErrorMessage("You have entered wrong credentials!");
          } else {
            setErrorMessage("Error occured while signing in!");
          }
        });
    });
  }

  return (
    <div>
      <div className={classes.card}>
        <div>
          {errorMessage ? (<div className={classes.alert_danger}>{errorMessage}</div>) : (<div></div>)}
        </div>
        <div className={classes.header}>
          <h1>Sign in and win!</h1>
        </div>
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="floatingInput">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              ref={usernameInputRef}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="floatingPassword">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              ref={passwordInputRef}
            />
          </div>

          <div className={classes.actions}>
            <button className="w-100 btn btn-lg btn-primary" type="submit">
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
