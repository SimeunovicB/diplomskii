import "./Login.css";
import { useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Login(props) {
  const usernameInputRef = useRef("");
  const passwordInputRef = useRef("");

  const history = useHistory();

  async function submitHandler(event) {
    event.preventDefault();
    const enteredUsername = usernameInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    console.log(enteredUsername, enteredPassword);


      await fetch('http://127.0.0.1:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        credentials: 'include',
        body: JSON.stringify( {
          enteredUsername,
          enteredPassword
        })
      })
      .then(response => {
        if(response.status === 200) {
          axios.get('api/user',{ withCredentials: true })
          .then(function (response) {
            const content = response.data;
            history.replace('/');
            props.setName(content.name);
          })
          .catch(function (error) {
            console.log(error);
          });
        }
      })
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
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            placeholder="username"
            ref={usernameInputRef}
          />
          <label htmlFor="floatingInput">Username</label>
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
          Sign in
        </button>
        <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
        <p className="ide">Ide gas</p>
      </form>
    </div>
  );
}

export default Login;
