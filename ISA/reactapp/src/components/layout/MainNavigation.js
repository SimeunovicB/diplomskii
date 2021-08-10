import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
// import {useContext} from 'react';

function MainNavigation(props) {
  const logoutFunction = async function () {
    console.log("IDE MO MO MO");
    await fetch("http://127.0.0.1:8000/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    props.setName("");
  };
  let login, register, logout, myProfile;
  if (!props.name) {
    login = (
      <li>
        <Link to="/login">Login</Link>
      </li>
    );
    register = (
      <li>
        <Link to="/register">Register</Link>
      </li>
    );
  } else {
    logout = (
      <li onClick={logoutFunction}>
        <Link to="/">Logout</Link>
      </li>
    );
  }
  if(props.name) {
    myProfile= (
      <li>
        <Link to="/my-profile">My profile</Link>
      </li>
    );
  }
  return (
    <header className={classes.header}>
      <div className={classes.logo}>React meetups</div>
      <nav>
        <ul>
          {login}
          {register}
          {myProfile}
          {/* <li>
            <Link to="/prezime">Prezime</Link>
          </li> */}
          <li>
            <Link to="/all-fighters">All fighters</Link>
          </li>
          <li>
            <Link to="/new-fighter">Add new fighter</Link>
          </li>
          <li>
            <Link to="/my-bets">My bets</Link>
          </li>
          {/* <li>
            <Link to="/all-fights">All fights</Link>
          </li>
          <li>
            <Link to="/new-fight">Add new fight</Link>
          </li> */}
          <li>
            <Link to="/upcoming-events-and-fights">Upcoming fights</Link>
          </li>
          <li>
            <Link to="/past-events-and-fights">Past fights</Link>
          </li>
          <li>
            <Link to="/new-event">Add new event</Link>
          </li>
          <li>
            <Link to="/all-events">Upcoming events</Link>
          </li>
          {logout}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
