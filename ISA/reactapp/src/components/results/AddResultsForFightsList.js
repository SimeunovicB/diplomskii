// import FightItem from "./FightItem";
import AddResultsForFightsItem from "./AddResultsForFightsItem";
import classes from "./AddResultsForFightsList.module.css";
import { useLocation, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../ui/Card";
import Web3 from "web3";

function AddResultsForFightsList() {
  const location = useLocation();
  const history = useHistory();
  console.log("IDEMOOOO ", location.state);

  const [fights, setFights] = useState([]);
  const [adminWalletAddress, setAdminWalletAddress] = useState("");

  const [eventId, setEventId] = useState("");
  const [eventName, setEventName] = useState("");
  const [userId, setUserId] = useState();

  useEffect(() => {
    if (location.state) {
      setEventId(location.state.eventId);
      setEventName(location.state.eventName);
    }
  }, []);

  const [pendingMessage, setPendingMessage] = useState(
    "" //Transaction in progress, please wait.
  );
  const [errorMessage, setErrorMessage] = useState(""); //Error while attempting transaction!

  const [loggedWalletAddress, setLoggedWalletAddress] = useState("");

  const fightsResults = new Map();

  let returnFightIds = [];
  let returnWinnerIds = [];
  let returnMethods = [];

  useEffect(() => {
    axios({
      method: "get",
      url: "api/fights/event?eventId=" + location.state.eventId,
    })
      .then((response) => {
        console.log(response);
        console.log(response.data);
        const fights = response.data;
        setFights(fights);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    (async () => {
      const response = await fetch("http://127.0.0.1:8000/api/user", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const content = await response.json();
      console.log("IDE CONTENT", content);
      setUserId(content.id);
    })();
  }, []);

  useEffect(() => {
    axios({
      method: "get",
      url: "api/admin",
    }).then((response) => {
      console.log("API ADMIN INACTIVE USER ITEM ", response.data);
      let admin = response.data;
      setAdminWalletAddress(admin.wallet_address);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //   console.log("FAJTERI U FIGHTER LIST", props.fights);

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
    console.log(window.contract);
    console.log(window.contract.methods);
    console.log("USAO U LOAD u ADD RESULTS FOR FIGHTS LIST");
  }

  load(this);

  const changeResultsHandler = (fightId, winnerId, winningMethod) => {
    console.log("changeResultsHandler");
    console.log("FIGHT ID ", fightId);
    console.log("WINNER ID ", winnerId);
    console.log("WINNING METHOD ", winningMethod);
    fightsResults.set(fightId, [winnerId, winningMethod]);
  };

  // function submitHandler() {
  //   console.log("probica");
  //   console.log("loggedWalletAddress", loggedWalletAddress);
  //   console.log("adminWalletAddress", adminWalletAddress);
  //   if (loggedWalletAddress === adminWalletAddress) {
  //     console.log("ISTI");
  //   } else if (loggedWalletAddress !== adminWalletAddress) {
  //     console.log("NISU ISTI");
  //   }
  // }

  function submitHandlera() {
    console.log("USAO U submitHandlera");

    asyncSubmitHandler();
    async function asyncSubmitHandler() {
      if (userId === 1) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        let logedWalletAddress = accounts[0];

        logedWalletAddress = logedWalletAddress.toUpperCase();
        let adminWalletAddressUpperCase = adminWalletAddress.toUpperCase();

        console.log("logedWalletAddress", logedWalletAddress);
        console.log("adminWalletAddress", adminWalletAddressUpperCase);
        console.log("logedWalletAddress type ", typeof logedWalletAddress);
        console.log(
          "adminWalletAddress type ",
          typeof adminWalletAddressUpperCase
        );
        console.log("USAO U ASYNC submitHandler");

        if (logedWalletAddress === adminWalletAddressUpperCase) {
          console.log("ISTE WALLET ADRESE");
          setPendingMessageHandler();
          let walletAddressAndPrizeMap = null;

          function logMapElements(value, key) {
            returnFightIds.push(key);
            returnWinnerIds.push(value[0]);
            returnMethods.push(value[1]);
          }

          fightsResults.forEach(logMapElements);

          console.log(returnFightIds);
          console.log(returnWinnerIds);
          console.log(returnMethods);

          (async () => {
            const response = await fetch(
              "http://127.0.0.1:8000/api/results/event",
              {
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                method: "put",
                body: JSON.stringify({
                  adminId: userId,
                  fightIds: returnFightIds,
                  winnerIds: returnWinnerIds,
                  methods: returnMethods,
                }),
              }
            );
            const map = await response.json();
            console.log("IDE CONTENT", map);
            console.log("MAPA ", map);
            console.log("TIP MAPE ", typeof map);
            walletAddressAndPrizeMap = map;
            console.log("PRIMIO GA ", walletAddressAndPrizeMap);
            let transferSuccess;
            console.log("PRED FOR ", walletAddressAndPrizeMap);
            // for (let [key, value] of walletAddressAndPrizeMap) {
            for (const [key, value] of Object.entries(
              walletAddressAndPrizeMap
            )) {
              console.log("pre roundinga ", value);
              let roundedValue = Math.round(value * 100) / 100;
              console.log("rounded value ", roundedValue);
              console.log(
                "from " +
                  adminWalletAddress +
                  " add " +
                  roundedValue +
                  "in " +
                  key
              );
              console.log("TIP ", typeof roundedValue);
              // if(value !== 0) {

              // try {

              setPendingMessageHandler();
              transferSuccess = await window.contract.methods
                .transfer(
                  key,
                  roundedValue * 100 //ovde ide puta 100 zbog dve decimale iza zagrade kod Perper-a
                )
                .send({ from: adminWalletAddress });
              // }
              // catch {
              // console.log("Transaction failed!");
              // setErrorMessageHandler("Error while adding results!");
              // return;
              // }
              console.log(transferSuccess);
            }
          })();
          // setPendingMessage();
          history.replace("/past-events-and-fights");
        } else if (logedWalletAddress !== adminWalletAddressUpperCase) {
          console.log("NISU ISTE WALLET ADRESE");
          setErrorMessageHandler("Wrong metamask account!");
          return;
        }
      } else {
        console.log("Authorization!")
        setErrorMessageHandler("You don't have permissions to add results!");
      }
    }
  }

  function setPendingMessageHandler() {
    // setSuccessMessage("");
    console.log("USAO U setPendingMessageHandler");
    setPendingMessage("Transaction in progress, please wait.");
    setErrorMessage("");
  }

  function setErrorMessageHandler(errMess) {
    // setSuccessMessage("");
    setPendingMessage("");
    setErrorMessage(errMess);
  }

  let validation = <div></div>;
  if (pendingMessage !== "" && errorMessage === "") {
    validation = (
      <div id="validation" className={classes.alert_warning}>
        {pendingMessage}{" "}
        <img
          src="https://acegif.com/wp-content/uploads/loading-25.gif"
          width="50"
        ></img>
      </div>
    ); //https://i.stack.imgur.com/ATB3o.gif
  } else if (pendingMessage === "" && errorMessage !== "") {
    validation = (
      <div id="validation" className={classes.alert_danger}>
        {errorMessage}
      </div>
    );
  }

  return (
    <div>
      <Card>
        <div className={classes.form}>
          <div className={classes.content}>
            {validation}
            <h2>{eventName}</h2>
          </div>
          <ul className={classes.list}>
            {fights.map((fight) => (
              <AddResultsForFightsItem
                key={fight.id}
                id={fight.id}
                redCornerFighter={fight.redCornerFighter}
                blueCornerFighter={fight.blueCornerFighter}
                redCornerOdds={fight.redCornerOdds}
                event={fight.event}
                changeResults={changeResultsHandler}
              />
            ))}
          </ul>
          <div className={classes.actions}>
            <a href="#validation">
              <button onClick={submitHandlera}>Add result</button>
            </a>
          </div>
        </div>
      </Card>
    </div>
  );
}
export default AddResultsForFightsList;
