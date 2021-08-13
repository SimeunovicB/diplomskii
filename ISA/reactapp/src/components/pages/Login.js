import "./Login.css";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import classes from "./Login.module.css";
// import Card from "../ui/Card";

function Login(props) {
  const usernameInputRef = useRef("");
  const passwordInputRef = useRef("");

  const history = useHistory();

  async function submitHandler(event) {
    event.preventDefault();
    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    console.log(enteredUsername, enteredPassword);

    await fetch("http://127.0.0.1:8000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        enteredUsername,
        enteredPassword,
      }),
    }).then((response) => {
      if (response.status === 200) {
        axios
          .get("api/user", { withCredentials: true })
          .then(function (response) {
            const content = response.data;
            history.replace("/");
            props.setName(content.name);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    });
  }

  return (
    <div>
      <div className={classes.card}>
      <form className={classes.form} onSubmit={submitHandler}>
        <h1 className="h3 mb-3 fw-normal">Sign in and win!</h1>

        <div className={classes.control}>
          <label htmlFor="floatingInput">Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="username"
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
