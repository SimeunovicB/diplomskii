import { useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

function Register() {
  const history = useHistory();

  const nameInputRef = useRef("");
  const surnameInputRef = useRef("");
  const emailInputRef = useRef("");
  const passwordInputRef = useRef("");
  const usernameInputRef = useRef("");

  function submitHandler(event) {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredSurname = surnameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredUsername = usernameInputRef.current.value;
    console.log(enteredName, enteredEmail, enteredPassword);

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

    axios({
      method: "post",
      url: "api/register",
      data: {
        name: enteredName,
        surname: enteredSurname,
        email: enteredEmail,
        password: enteredPassword,
        username: enteredUsername
      },
    }).then((response) => {
      console.log(response);
      console.log(response.data);
      history.replace('/login');
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
        <h1 className="h3 mb-3 fw-normal">Please register</h1>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            placeholder="name"
            ref={nameInputRef}
          />
          <label htmlFor="floatingInput">Name</label>
        </div>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            placeholder="surname"
            ref={surnameInputRef}
          />
          <label htmlFor="floatingInput">Surname</label>
        </div>
        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            placeholder="name@example.com"
            ref={emailInputRef}
          />
          <label htmlFor="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            placeholder="username"
            ref={usernameInputRef}
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

        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Submit
        </button>
        <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
        <p className="ide">Ide gas</p>
      </form>
    </div>
  );
}

export default Register;
