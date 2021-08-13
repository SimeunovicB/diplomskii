import { useRef } from "react";
import axios from "axios";
import Web3 from "web3";
// import { useHistory } from "react-router-dom";
import { useState } from "react";
import classes from "./MyProfile.module.css";
import Card from "../ui/Card";
import { useEffect } from "react";

function MyProfile(props) {
  //   const history = useHistory();

  console.log("LOGED USER", props.user);

  console.log("NAME", props.user.name);
  console.log(
    "WALLET ADDRESS ",
    props.user.wallet_address,
    typeof props.user.wallet_address
  );

  // const [walletAddress, setWalletAddress] = useState(props.user.wallet_address);
  const [walletAddress, setWalletAddress] = useState(
    ""
  );
  const [balance, setBalance] = useState(null);
  const [state, setState] = useState({hasError: false});


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

    axios({
      method: "put",
      url: "users/" + props.user.id + "/",
      data: {
        name: enteredName,
        surname: enteredSurname,
        email: enteredEmail,
        wallet_address: enteredWalletAddress,
        username: enteredUsername,
        password: props.user.password,
      },
    }).then((response) => {
      console.log(response);
      console.log(response.data);
      if (response.status === 200) {
        console.log("DOBAR");
        if (
          enteredPassword !== "" &&
          enteredPassword === enteredConfirmPassword
        ) {
          console.log("MENJAMO SIFRU");
          axios({
            method: "put",
            url: "api/user/change",
            data: {
              id: props.user.id,
              password: enteredPassword,
            },
          })
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    });
  }

  // if(window.contract === null) {
  //   console.log("JESTE NULL");
  // } else {
  //   console.log("NIJE NULL");
  // }

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
      console.log("Not a valid address")
    }
    setBalance(balanceOfMe / 100);
    // setStatus("Ready!");
    console.log("USAO U LOAD");
  }

  if (props.user.wallet_address !== null) {
    load(this);
  }



  console.log("BALANS JE ", balance);
  console.log("STATE JE ", state);

  return (
    <div>
      <Card>
        <form className={classes.form} onSubmit={submitHandler}>
          <h1 className="h3 mb-3 fw-normal">Change user data</h1>
          <div className={classes.control}>
            <label htmlFor="floatingInput">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="name"
              ref={nameInputRef}
              // onChange={props.changeUser}
              defaultValue={props.user.name}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="floatingInput">Surname</label>
            <input
              type="text"
              className="form-control"
              placeholder="surname"
              ref={surnameInputRef}
              defaultValue={props.user.surname}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="floatingInput">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="name@example.com"
              ref={emailInputRef}
              defaultValue={props.user.email}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="floatingInput">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="username"
              ref={usernameInputRef}
              defaultValue={props.user.username}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="floatingInput">Wallet Address</label>
            <input
              type="text"
              className="form-control"
              placeholder="wallet address"
              ref={walletAddressInputRef}
              defaultValue={props.user.wallet_address}
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
            <label htmlFor="floatingPassword">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              ref={confirmPasswordInputRef}
            />
          </div>

          <div className={classes.control}>
            <label htmlFor="floatingPassword">Amount of PER</label>
            <input
              type="number"
              className="form-control"
              placeholder="Perper amount"
              defaultValue={balance}
              readOnly
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

export default MyProfile;
