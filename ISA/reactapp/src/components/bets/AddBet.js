import classes from "./AddBet.module.css";
import Card from "../ui/Card";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { useLocation, useHistory } from "react-router-dom";
import Web3 from "web3";

import {useCallback} from 'react';

function AddBet(props) {
  const location = useLocation();

  const oddsRef = useRef();

  console.log("LOCATION ", location.state);

  const history = useHistory();

  console.log("USER U ADD BET ", props.user);

  const stakeInputRef = useRef();

  // const [fightId, setFightId] = useState(location.state.fightId);

  const [adminWalletAddress, setAdminWalletAddress] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [balance, setBalance] = useState(null);

  const [selectedOptionWinner, setSelectedOptionWinner] = useState(null);

  const [redCornerFighterName, setRedCornerFighterName] = useState(null);
  const [blueCornerFighterName, setBlueCornerFighterName] = useState(null);

  const [redCornerFighterSurname, setRedCornerFighterSurname] = useState(null);
  const [blueCornerFighterSurname, setBlueCornerFighterSurname] =
    useState(null);

  const [redCornerFighterImg, setRedCornerFighterImg] = useState(null);
  const [blueCornerFighterImg, setBlueCornerFighterImg] = useState(null);

  const [redCornerFighterWins, setRedCornerFighterWins] = useState(null);
  const [blueCornerFighterWins, setBlueCornerFighterWins] = useState(null);

  const [redCornerFighterLosses, setRedCornerFighterLosses] = useState(null);
  const [blueCornerFighterLosses, setBlueCornerFighterLosses] = useState(null);

  const [redCornerFighterAge, setRedCornerFighterAge] = useState(null);
  const [blueCornerFighterAge, setBlueCornerFighterAge] = useState(null);

  const [redCornerFighterHeight, setRedCornerFighterHeight] = useState(null);
  const [blueCornerFighterHeight, setBlueCornerFighterHeight] = useState(null);

  const [redCornerFighterWeight, setRedCornerFighteWeight] = useState(null);
  const [blueCornerFighterWeight, setBlueCornerFighterWeight] = useState(null);

  const [redCornerFighterReach, setRedCornerFighterReach] = useState(null);
  const [blueCornerFighterReach, setBlueCornerFighterReach] = useState(null);

  const [redCornerOdds, setRedCornerOdds] = useState(null);
  const [blueCornerOdds, setBlueCornerOdds] = useState(null);

  const [potentialWin, setPotentialWin] = useState(0);

  const [loadedFighters, setLoadedFighters] = useState([]);

  // const [successMessage, setSuccessMessage] = useState(
  //   "" 
  // );
  const [pendingMessage, setPendingMessage] = useState(
    "" //Transaction in progress, please wait.
  );
  const [errorMessage, setErrorMessage] = useState(""); //Error while attempting transaction!

  useEffect(() => {
    (async () => {
      const response = await fetch("http://127.0.0.1:8000/api/user", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const content = await response.json();
      console.log("IDE CONTENT", content);
      setWalletAddress(content.wallet_address);
    })();
  }, []);


  useEffect(() => {
    axios({
      method: "get",
      url: "fights/" + location.state.fightId,
    }).then((response) => {
      console.log("FIGHT U ADD BET ", response.data);
      let redCornerPercentageOdds = response.data.redCornerOdds;
      setRedCornerOdds((100/redCornerPercentageOdds).toFixed(2));
      let blueCornerPercentageOdds = 100 - redCornerPercentageOdds;
      setBlueCornerOdds((100/blueCornerPercentageOdds).toFixed(2));
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  useEffect(() => {
    axios({
      method: "get",
      url: "api/admin",
    }).then((response) => {
      console.log("API ADMIN ", response.data);
      let admin = response.data;
      setAdminWalletAddress(admin.wallet_address);

    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  useEffect(() => {
    axios({
      method: "get",
      url: "fighters/" + location.state.blueCornerFighterId,
    }).then((response) => {
      console.log(response.data);
      let blueFighter = response.data;
      setBlueCornerFighterName(blueFighter.name);
      setBlueCornerFighterSurname(blueFighter.surname);
      setBlueCornerFighterImg(blueFighter.image);
      setBlueCornerFighterWins(blueFighter.wins);
      setBlueCornerFighterLosses(blueFighter.losses);
      setBlueCornerFighterAge(blueFighter.age);
      setBlueCornerFighterHeight(blueFighter.height);
      setBlueCornerFighterWeight(blueFighter.weight);
      setBlueCornerFighterReach(blueFighter.reach);
      loadedFighters.push({
        value: blueFighter.id,
        label: blueFighter.name + " " + blueFighter.surname,
      });
      console.log(setLoadedFighters);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    axios({
      method: "get",
      url: "fighters/" + location.state.redCornerFighterId,
    }).then((response) => {
      let redFighter = response.data;
      setRedCornerFighterName(redFighter.name);
      setRedCornerFighterSurname(redFighter.surname);
      setRedCornerFighterImg(redFighter.image);
      setRedCornerFighterWins(redFighter.wins);
      setRedCornerFighterLosses(redFighter.losses);
      setRedCornerFighterAge(redFighter.age);
      setRedCornerFighterHeight(redFighter.height);
      setRedCornerFighteWeight(redFighter.weight);
      setRedCornerFighterReach(redFighter.reach);
      loadedFighters.push({
        value: redFighter.id,
        label: redFighter.name + " " + redFighter.surname,
      });
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
    console.log("EVO GA ON ", walletAddress);
    let balanceOfMe = 0;
    try {
      balanceOfMe = await window.contract.methods
        .balanceOf(walletAddress)
        .call();
    } catch {
      console.log("Not a valid address");
    }
    setBalance(balanceOfMe / 100);
    // setStatus("Ready!");
    console.log("USAO U LOAD");
  }

  if (props.user.wallet_address !== null) {
    load(this);
  }

  console.log("WALLET ADDRESS U ADDBET", walletAddress);
  console.log("BALANCE U ADDBET ", balance);

  async function makeABet() {
    console.log("window contract ide gasic", window.contract.methods);
    if (stakeInputRef.current.value === "" || selectedOptionWinner === null) {
      console.log("alo nisi uneo ulog i pobednika");
      // throw "Fill up all the fields in the form!";

      setErrorMessageHandler("Fill all input fields!");
      return;

    } 
    else if (stakeInputRef.current.value > balance) {
      console.log("nemas dovoljno coin-a gari");
      // throw "You don't have enough Perpers for transaction";
      setErrorMessageHandler("You don't have enough perper!");
      return;
    } else if(props.user.id === null || props.user.id === 1) {
      setErrorMessageHandler("You don't have permission to add a bet.");
    } else {
      console.log("fight ", location.state.fightId);
      console.log("predicted_winner ", selectedOptionWinner.value);
      console.log("stake ", stakeInputRef.current.value);
      let transferSuccess;
      try {
        setPendingMessageHandler();
        transferSuccess = await window.contract.methods
          .transfer(
            adminWalletAddress,
            stakeInputRef.current.value * 100 //ovde ide puta 100 zbog dve decimale iza zagrade kod Perper-a
          )
          .send({ from: walletAddress });
      } catch {
        console.log("Transaction failed!");
        setErrorMessageHandler("Transaction failed!");
        history.replace("/", { error: true});
        return;
      }
      console.log(transferSuccess);
      axios({
        method: "post",
        url: "bets/",
        data: {
          fight: location.state.fightId,
          predicted_winner: selectedOptionWinner.value,
          stake: stakeInputRef.current.value,
          user: props.user.id,
        },
      })
        .then((response) => {
          console.log(response);
          console.log(response.data);
          history.replace("/my-bets");
        })
        .catch((error) => {
          console.log(error);
          setErrorMessageHandler("Error while adding bet!");
        });
    }
  }


  // function setSuccessMessageHandler() {
  //   setSuccessMessage("Bet successfully added.");
  //   setPendingMessage("");
  //   setErrorMessage("");
  // }


  function betBlur() {
    console.log("betBlur")
    let redFighterNameAndSurname = redCornerFighterName + " " + redCornerFighterSurname;
    let blueFighterNameAndSurname = blueCornerFighterName + " " + blueCornerFighterSurname;
    console.log("POTENTIAL TO WIN ", potentialWin)
    // 
    console.log("POTENTIAL TO WIN ", potentialWin)
    if(selectedOptionWinner != null && stakeInputRef.current.value !== null) {
      console.log(selectedOptionWinner.label);
      if(selectedOptionWinner.label === redFighterNameAndSurname) {
        console.log("crveni");
        oddsRef.current.value = (stakeInputRef.current.value * redCornerOdds).toFixed(2);
      } else if(selectedOptionWinner.label === blueFighterNameAndSurname) {
        console.log("plavi");
        oddsRef.current.value = (stakeInputRef.current.value * blueCornerOdds).toFixed(2);
      }
    }
  }


  function setPendingMessageHandler() {
    // setSuccessMessage("");
    setPendingMessage("Transaction in progress, please wait.");
    setErrorMessage("");
  }

  function setErrorMessageHandler(errMess) {
    // setSuccessMessage("");
    setPendingMessage("");
    setErrorMessage(errMess);
  }


  let validation = <div></div>;
  if (
    pendingMessage !== "" &&
    errorMessage === ""
  ) {
    validation = (
      <div id="validation" className={classes.alert_warning}>
        {pendingMessage}{" "}
        <img
          src="https://acegif.com/wp-content/uploads/loading-25.gif"
          width="50"
        ></img>
      </div>
    ); //https://i.stack.imgur.com/ATB3o.gif
  } else if (
    pendingMessage === "" &&
    errorMessage !== ""
  ) {
    validation = <div id="validation" className={classes.alert_danger}>{errorMessage}</div>;
  }


  return (
    <Card>
      <div className={classes.content}>
        {validation}
        <h2>
          {redCornerFighterName} {redCornerFighterSurname} vs{" "}
          {blueCornerFighterName} {blueCornerFighterSurname}
        </h2>
      </div>
      <div className={classes.content}>
        <img
          src={redCornerFighterImg}
          alt="slika borca"
          height="200"
          width="200"
        ></img>
        <img
          src={blueCornerFighterImg}
          alt="slika borca"
          height="200"
          width="200"
        ></img>
      </div>
      <div className={classes.father}>
        <div className={classes.red}>
          {redCornerOdds}
        </div>
        <div className={classes.atribute}><b>Odds</b></div>
        <div className={classes.blue}>
          {blueCornerOdds}
        </div>
      </div>
      <div className={classes.father}>
        <div className={classes.red}>
          {redCornerFighterWins}W : {redCornerFighterLosses}L
        </div>
        <div className={classes.atribute}><b>Record</b></div>
        <div className={classes.blue}>
          {blueCornerFighterWins}W : {blueCornerFighterLosses}L
        </div>
      </div>
      <div className={classes.father}>
        <div className={classes.red}>{redCornerFighterAge}</div>
        <div className={classes.atribute}><b>Age</b></div>
        <div className={classes.blue}>{blueCornerFighterAge}</div>
      </div>
      <div className={classes.father}>
        <div className={classes.red}>{redCornerFighterHeight}cm</div>
        <div className={classes.atribute}><b>Height</b></div>
        <div className={classes.blue}>{blueCornerFighterHeight}cm</div>
      </div>
      <div className={classes.father}>
        <div className={classes.red}>{redCornerFighterWeight}kg</div>
        <div className={classes.atribute}><b>Weight</b></div>
        <div className={classes.blue}>{blueCornerFighterWeight}kg</div>
      </div>
      <div className={classes.father}>
        <div className={classes.red}>{redCornerFighterReach}cm</div>
        <div className={classes.atribute}><b>Reach</b></div>
        <div className={classes.blue}>{blueCornerFighterReach}cm</div>
      </div>

      <div className={classes.form} onClick={betBlur}>
        <div className={classes.control}>
          <label htmlFor="redCornerFighter">Winner prediction</label>
          <div>
            <Select
              defaultValue={selectedOptionWinner}
              onChange={setSelectedOptionWinner}
              options={loadedFighters}
              onBlur={betBlur}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="age">Amount of PER to bet</label>
          <input type="number" required id="stake" onChange={betBlur} onBlur={betBlur} ref={stakeInputRef} />
        </div>
        {/* <div className={classes.control}>
          <label htmlFor="age">Potential PER win</label>
          <input type="number" required id="stake" defaultValue={potentialWin}/>
        </div> */}
        <div className={classes.control}>
            <label htmlFor="floatingPassword">Potential PER to win</label>
            <input
              type="number"
              className="form-control"
              ref={oddsRef}
              readOnly
            />
          </div>
        <div className={classes.actions}>
        <a href="#validation"><button onClick={makeABet}>Make a bet</button></a>
        </div>
        <div>
        </div>
      </div>
    </Card>
  );
}

export default AddBet;
