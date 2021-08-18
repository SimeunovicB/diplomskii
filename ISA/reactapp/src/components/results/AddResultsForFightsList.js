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
  console.log(location.state.eventId);

  const [fights, setFights] = useState([]);
  const [adminWalletAddress, setAdminWalletAddress] = useState("");
  // const [walletAddressAndPrizeMap, setWalletAddressAndPrizeMap] =
    // useState(null);
  const fightsResults = new Map();
  // fightsResults.set("a", [1,13]);
  // fightsResults.set("b", [2,18]);
  // fightsResults.set("c", [3,-4]);

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

  function submitHandler() {
    asyncSubmitHandler();

    async function asyncSubmitHandler() {
      console.log("ide gas");
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
        const response = await fetch("http://127.0.0.1:8000/api/results/event", {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          method: "put",
          body: JSON.stringify({
            fightIds: returnFightIds,
            winnerIds: returnWinnerIds,
            methods: returnMethods,
          }),
        });
        const map = await response.json();
        console.log("IDE CONTENT", map);
        console.log("MAPA ", map);
          console.log("TIP MAPE ", typeof map);
          walletAddressAndPrizeMap = map;
          console.log("PRIMIO GA ", walletAddressAndPrizeMap);
          let transferSuccess;
          console.log("PRED FOR ", walletAddressAndPrizeMap);
          // for (let [key, value] of walletAddressAndPrizeMap) {
          for (const [key, value] of Object.entries(walletAddressAndPrizeMap)) {
            console.log("from " + adminWalletAddress + " add " + value + "in " + key);
            console.log("TIP ", typeof value);
            // if(value !== 0) {
            try {
              transferSuccess = await window.contract.methods
                .transfer(
                  key,
                  value * 100 //ovde ide puta 100 zbog dve decimale iza zagrade kod Perper-a
                )
                .send({ from: adminWalletAddress });
            } catch {
              console.log("Transaction failed!");
            }
            console.log(transferSuccess);
    
            // }
          }
      })();

      // axios({
      //   method: "put",
      //   url: "api/results/event",
      //   data: {
      //     fightIds: returnFightIds,
      //     winnerIds: returnWinnerIds,
      //     methods: returnMethods,
      //   },
      // })
      //   .then((response) => {
      //     console.log(response);
      //     console.log("jesam tu sam");
      //     let map = response.data; //key = walletAddress, value = amount of coins to add
      //     console.log("MAPA ", map);
      //     console.log("TIP MAPE ", typeof map);
      //     walletAddressAndPrizeMap = map;
      //     // console.log("PRIMIO GA ", walletAddressAndPrizeMap);
      //     // setWalletAddressAndPrizeMap(map);

      //     //
      //     // console.log(mapa['a'])
      //     // console.log(mapa[1])
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });

      // let transferSuccess;
      // console.log("PRED FOR ", walletAddressAndPrizeMap);
      // // for (let [key, value] of walletAddressAndPrizeMap) {
      // for (const [key, value] of Object.entries(walletAddressAndPrizeMap)) {
      //   console.log("in " + key + " add " + value);
      //   console.log("TIP ", typeof value);
      //   // if(value !== 0) {
      //   try {
      //     transferSuccess = await window.contract.methods
      //       .transfer(
      //         key,
      //         value * 100 //ovde ide puta 100 zbog dve decimale iza zagrade kod Perper-a
      //       )
      //       .send({ from: "0x7f78c74b3C360d9452E94051C302e491A042024f" });
      //   } catch {
      //     console.log("Transaction failed!");
      //   }
      //   console.log(transferSuccess);

      //   // }
      // }
    }
    history.replace("/past-events-and-fights");
  }

  return (
    <div>
      <Card>
        <div className={classes.form}>
          <div className={classes.content}>
            <h2>{location.state.eventName}</h2>
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
            <button onClick={submitHandler}>Add result</button>
          </div>
        </div>
      </Card>
    </div>
  );
}
export default AddResultsForFightsList;
