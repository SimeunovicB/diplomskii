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
import MyBets from "./components/pages/MyBets";
import Prezime from "./components/pages/Prezime";
import Web3 from "web3";
import InactiveUsers from "./components/users/InactiveUsers";

function App() {
  const [id, setId] = useState("");
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
      setId(content.id);
      setName(content.name);
      setUser(content);
    })();
  }, [name]);

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
      console.log("USAO U IF");
    }
    console.log("USAO U loadWeb3");
  }

  async function loadContract() {
    console.log("VERZIJA WEB3");
    console.log(window.web3.version);
    return await new window.web3.eth.Contract(
      [
        {
          constant: true,
          inputs: [],
          name: "name",
          outputs: [
            {
              name: "",
              type: "string",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            {
              name: "_spender",
              type: "address",
            },
            {
              name: "_value",
              type: "uint256",
            },
          ],
          name: "approve",
          outputs: [
            {
              name: "",
              type: "bool",
            },
          ],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "totalSupply",
          outputs: [
            {
              name: "",
              type: "uint256",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            {
              name: "_from",
              type: "address",
            },
            {
              name: "_to",
              type: "address",
            },
            {
              name: "_value",
              type: "uint256",
            },
          ],
          name: "transferFrom",
          outputs: [
            {
              name: "",
              type: "bool",
            },
          ],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "decimals",
          outputs: [
            {
              name: "",
              type: "uint8",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [
            {
              name: "_owner",
              type: "address",
            },
          ],
          name: "balanceOf",
          outputs: [
            {
              name: "balance",
              type: "uint256",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: true,
          inputs: [],
          name: "symbol",
          outputs: [
            {
              name: "",
              type: "string",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            {
              name: "_to",
              type: "address",
            },
            {
              name: "_value",
              type: "uint256",
            },
          ],
          name: "transfer",
          outputs: [
            {
              name: "",
              type: "bool",
            },
          ],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          constant: true,
          inputs: [
            {
              name: "_owner",
              type: "address",
            },
            {
              name: "_spender",
              type: "address",
            },
          ],
          name: "allowance",
          outputs: [
            {
              name: "",
              type: "uint256",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          payable: true,
          stateMutability: "payable",
          type: "fallback",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              name: "owner",
              type: "address",
            },
            {
              indexed: true,
              name: "spender",
              type: "address",
            },
            {
              indexed: false,
              name: "value",
              type: "uint256",
            },
          ],
          name: "Approval",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              name: "from",
              type: "address",
            },
            {
              indexed: true,
              name: "to",
              type: "address",
            },
            {
              indexed: false,
              name: "value",
              type: "uint256",
            },
          ],
          name: "Transfer",
          type: "event",
        },
      ],
      "0x3e6c08800313ae6a225a3f72c691bc4ce971dd03"
    );
  }

  async function load() {
    console.log("EVO GA");
    await loadWeb3();
    window.contract = await loadContract();
    console.log("APP", window.contract);
    console.log("APP METHODS ", window.contract.methods);
    let balanceOfMe = await window.contract.methods
      .balanceOf("0x7f78c74b3C360d9452E94051C302e491A042024f")
      .call();
      console.log("Balance u APP ", balanceOfMe);
    console.log("USAO U LOAD");
  }

  load(this);


  function updateUserStateHandler(event) {
    console.log(event.target.value);
    setName(event.target.value);
  }


  return (
    // <div style={{ 
    //   backgroundImage: `url("https://i.postimg.cc/qvz9s70f/262315.jpg")` 
    // }}>
    <div>
      <Layout id={id} setId={setId} name={name} setName={setName}>
        <Switch>
          {/* <Route path="/" exact>
            <Home name={name} />
          </Route> */}
          <Route path="/all-fighters">
            <AllFighters />
          </Route>
          <Route path="/new-fighter">
            <NewFighter />
          </Route>
          <Route path="/prezime">
            <Prezime />
          </Route>
          <Route path="/inactive-users">
            <InactiveUsers />
          </Route>
          <Route path="/past-fight-list">
            <PastFightList />
          </Route>
          <Route path="/add-results-for-fights-list">
            <AddResultsForFightsList />
          </Route>
          <Route path="/add-bet">
            <AddBet user={user}/>
          </Route>
          <Route path="/my-bets">
            <MyBets user={user}/>
          </Route>
          <Route path="/" exact>
            <UpcomingEventsAndFights />
          </Route>
          <Route path="/past-events-and-fights">
            <PastEventsAndFights />
          </Route>
          <Route path="/login">
            <Login id={id} setId={setId} name={name} setName={setName} />
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
    // </div>
  );
}

export default App;
