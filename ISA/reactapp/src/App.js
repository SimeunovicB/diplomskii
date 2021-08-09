// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reloaddd.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from "react";
import Layout from "./components/layout/Layout";
import { Route, Switch } from "react-router-dom";
import Home from "./components/pages/Home";
import AllFighters from "./components/pages/AllFighters";
import NewFighter from "./components/pages/NewFighter";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import NewEvent from "./components/pages/NewEvent";
import AllEvents from "./components/pages/AllEvents";
import MyProfile from "./components/pages/MyProfile";
import UpcomingEventsAndFights from "./components/pages/UpcomingEventsAndFights";
import PastEventsAndFights from "./components/pages/PastEventsAndFights";
import PastFightList from "./components/eventAndFight/PastFightList";
import AddResultsForFightsList from "./components/results/AddResultsForFightsList";
import AddBet from "./components/bets/AddBet";
// import Prezime from "./components/pages/Prezime";

function App() {
  const [name, setName] = useState("");

  const [user, setUser] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetch("http://127.0.0.1:8000/api/user", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const content = await response.json();
      console.log("IDE CONTENT", content);
      setName(content.name);
      setUser(content);
    })();
  }, []);

  function updateUserStateHandler(event) {
    console.log(event.target.value);
    setName(event.target.value);
  }

  return (
    <div>
      <Layout name={name} setName={setName}>
        <Switch>
          <Route path="/" exact>
            <Home name={name} />
          </Route>
          <Route path="/all-fighters">
            <AllFighters />
          </Route>
          <Route path="/new-fighter">
            <NewFighter />
          </Route>
          {/* <Route path="/prezime/:numberOfFights">
            <Prezime />
          </Route> */}
          <Route path="/past-fight-list">
            <PastFightList />
          </Route>
          <Route path="/add-results-for-fights-list">
            <AddResultsForFightsList />
          </Route>
          <Route path="/add-bet">
            <AddBet />
          </Route>
          <Route path="/upcoming-events-and-fights">
            <UpcomingEventsAndFights />
          </Route>
          <Route path="/past-events-and-fights">
            <PastEventsAndFights />
          </Route>
          <Route path="/login">
            <Login name={name} setName={setName} />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/my-profile">
            <MyProfile user={user} changeUser={updateUserStateHandler} />
          </Route>
          <Route path="/new-event">
            <NewEvent />
          </Route>
          <Route path="/all-events">
            <AllEvents />
          </Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
