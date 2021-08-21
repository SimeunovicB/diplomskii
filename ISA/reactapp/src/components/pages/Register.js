import { useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import classes from "./Register.module.css";
import Card from "../ui/Card";

function Register() {
  const history = useHistory();

  const nameInputRef = useRef("");
  const surnameInputRef = useRef("");
  const emailInputRef = useRef("");
  const walletAddressInputRef = useRef("");
  const usernameInputRef = useRef("");
  const passwordInputRef = useRef("");
  const confirmPasswordInputRef = useRef("");

  function submitHandler(event) {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredSurname = surnameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredWalletAddress = walletAddressInputRef.current.value;
    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredConfirmPassword = confirmPasswordInputRef.current.value;
    console.log(
      enteredName,
      enteredSurname,
      enteredEmail,
      enteredWalletAddress,
      enteredUsername,
      enteredPassword
    );

    if (enteredWalletAddress[0] !== "0" || enteredWalletAddress[1] !== "x") {
      throw "Not a valid wallet address";
    }

    if (enteredWalletAddress.length !== 42) {
      throw "Not a valid wallet addresssss"; //MOZES STAVITI DA POKUSA DA UZME BALANS PA AKO NE POSTOJI BACI ERROR UMESTO OVA DVA SRANJA OD ZASTITE
    }

    // const responses = await fetch('http://127.0.0.1:8000/api/register', {
    //     method: 'POST',
    //     headers: {'Content-type': 'application/json'},
    //     body: JSON.stringify({
    //         name,
    //         email,
    //         password
    //     })
    // })

    // const content = await responses.json();

    // console.log(content);

    if (enteredPassword === enteredConfirmPassword) {
      axios({
        method: "post",
        url: "api/register",
        data: {
          name: enteredName,
          surname: enteredSurname,
          email: enteredEmail,
          wallet_address: enteredWalletAddress,
          username: enteredUsername,
          password: enteredPassword,
        },
      }).then((response) => {
        console.log(response);
        console.log(response.data);
        let user = response.data;
        if (user.id === 1) {
          axios({
            method: "put",
            url: "api/user/admin",
            data: {
              userId: user.id,
            },
          }).then((response) => {
            console.log(response);
          }).catch(error => {
            console.log(error);
          })
        }
        history.replace("/login");
      });
    } else {
      console.log("sifre se ne poklapaju!");
      throw "Passwords not matching!";
    }
  }

  return (
    <div>
      <Card>
        <form className={classes.form} onSubmit={submitHandler}>
          <h1 className="h3 mb-3 fw-normal">Registration</h1>
          <div className={classes.control}>
            <label htmlFor="floatingInput">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="name"
              ref={nameInputRef}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="floatingInput">Surname</label>
            <input
              type="text"
              className="form-control"
              placeholder="surname"
              ref={surnameInputRef}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="floatingInput">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="name@example.com"
              ref={emailInputRef}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="floatingInput">Wallet address</label>
            <input
              type="text"
              className="form-control"
              placeholder="Wallet address"
              ref={walletAddressInputRef}
            />
          </div>
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

          <div className={classes.control}>
            <label htmlFor="floatingPassword">Confirm password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm password"
              ref={confirmPasswordInputRef}
            />
          </div>

          <div className={classes.actions}>
            <button className="w-100 btn btn-lg btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default Register;
