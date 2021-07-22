import { useRef } from "react";
import axios from "axios";
// import { useHistory } from "react-router-dom";
import { useState } from "react";

function MyProfile(props) {
//   const history = useHistory();

  console.log("LOGED USER", props.user);

  console.log("NAME", props.user.name);


  const nameInputRef = useRef("");
  const surnameInputRef = useRef("");
  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");
  const confirmPasswordInputRef = useRef("");
  const usernameInputRef = useRef("");

  function submitHandler(event) {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredSurname = surnameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;
    const enteredUsername = usernameInputRef.current.value;
    console.log(
      enteredName,
      enteredSurname,
      enteredEmail,
      enteredUsername,
      enteredPassword
    );

    axios({
      method: "put",
      url: "users/" + props.user.id + "/",
      data: {
        name: enteredName,
        surname: enteredSurname,
        email: enteredEmail,
        password: props.user.password,
        username: enteredUsername,
      },
    }).then((response) => {
      console.log(response);
      console.log(response.data);
      if (response.status === 200) {
        console.log("DOBAR");
        if (
          enteredPassword !== "" &&
          enteredPassword === enteredConfirmPassword
        ) {
          console.log("MENJAMO SIFRU");
          axios({
            method: "put",
            url: "api/user/change",
            data: {
              id: props.user.id,
              password: enteredPassword,
            },
          })
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    });
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <img
          className="mb-4"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSN6PSb90rGnT4WTxYC7HBxNWs2Ig-mSP2b0g&usqp=CAU"
          alt=""
          width="72"
          height="57"
        />
        <h1 className="h3 mb-3 fw-normal">Change user data</h1>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            placeholder="name"
            ref={nameInputRef}
            // onChange={props.changeUser}
            defaultValue={props.user.name}
          />
          <label htmlFor="floatingInput">Name</label>
        </div>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            placeholder="surname"
            ref={surnameInputRef}
            defaultValue={props.user.surname}
          />
          <label htmlFor="floatingInput">Surname</label>
        </div>
        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            placeholder="name@example.com"
            ref={emailInputRef}
            defaultValue={props.user.email}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            placeholder="username"
            ref={usernameInputRef}
            defaultValue={props.user.username}
          />
          <label htmlFor="floatingInput">username</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            ref={passwordInputRef}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            ref={confirmPasswordInputRef}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>

        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Submit
        </button>
        <label>{props.user.name}</label>
      </form>
    </div>
  );
}

export default MyProfile;
