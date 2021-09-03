import axios from "axios";
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

    props.setId("");
    props.setName("");
  };
  let login,
    register,
    logout,
    myProfile,
    addNewFighter,
    myBets,
    inactiveUsers,
    upcomingFights,
    pastFights,
    addNewEvent,
    upcomingEvents;

  if (!props.id) {
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
    myProfile = (
      <li>
        <Link to="/my-profile">My profile</Link>
      </li>
    );
    logout = (
      <li onClick={logoutFunction}>
        <Link to="/login">Logout</Link>
      </li>
    );
  }
  if (props.id && props.id !== 1) {
    myBets = (
      <li>
        <Link to="/my-bets">My bets</Link>
      </li>
    );
    // upcomingFights = (
    //   <li>
    //     <Link to="/">Upcoming fights</Link>
    //   </li>
    // );
  }
  if(props.id !== 1) {
    upcomingFights = (
      <li>
        <Link to="/">Upcoming fights</Link>
      </li>
    );
  }
  if (props.id === 1) {
    addNewFighter = (
      <li>
        <Link to="/new-fighter">Add new fighter</Link>
      </li>
    );
    inactiveUsers = (
      <li>
        <Link to="/inactive-users">Inactive users</Link>
      </li>
    );
    pastFights = (
      <li>
        <Link to="/past-events-and-fights">Past fights</Link>
      </li>
    );
    addNewEvent = (
      <li>
        <Link to="/new-event">Add new event</Link>
      </li>
    );
    upcomingEvents = (
      <li>
        <Link to="/all-events">Upcoming events</Link>
      </li>
    );
  }
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Thesis</div>
      <nav>
        <ul>
          {login}
          {register}
          {myProfile}

          <li>
            <Link to="/all-fighters">All fighters</Link>
          </li>
          {addNewFighter}
          {myBets}
          {inactiveUsers}
          {upcomingFights}
          {pastFights}
          {addNewEvent}
          {upcomingEvents}
          {logout}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
