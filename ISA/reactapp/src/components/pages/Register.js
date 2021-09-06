import { useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import classes from "./Register.module.css";
import Card from "../ui/Card";
import { useState } from "react";
import Web3 from "web3";

function Register() {
  const history = useHistory();

  const nameInputRef = useRef("");
  const surnameInputRef = useRef("");
  const emailInputRef = useRef("");
  const walletAddressInputRef = useRef("");
  const usernameInputRef = useRef("");
  const passwordInputRef = useRef("");
  const confirmPasswordInputRef = useRef("");

  const [isFirstUser, setIsFirstUser] = useState("");

  axios({
    method: "get",
    url: "api/users/first",
  }).then((response) => {
    console.log(response.data);
    setIsFirstUser(response.data);
  });

  console.log("isFirstUser", isFirstUser);

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

  function submitHandler(event) {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredSurname = surnameInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    let enteredWalletAddress = "";
    if (isFirstUser === "yes") {
      enteredWalletAddress = "0x7f78c74b3C360d9452E94051C302e491A042024f";
    } else {
      enteredWalletAddress = walletAddressInputRef.current.value;
    }
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

    let isValidWalletAddress = true;
    checkWalletAddress();

    async function checkWalletAddress() {
      try {
        await window.contract.methods.balanceOf(enteredWalletAddress).call();
      } catch {
        isValidWalletAddress = false;
        console.log("Not a valid address");
        throw "Not a valid wallet address";
      }
    }

    if (isValidWalletAddress === true) {
      if (enteredPassword === enteredConfirmPassword) {
        axios({
          method: "post",
          url: "api/register",
          data: {
            name: enteredName,
            surname: enteredSurname,
            email: enteredEmail,
            wallet_address: enteredWalletAddress,
            username: enteredUsername,
            password: enteredPassword,
          },
        }).then((response) => {
          console.log(response);
          console.log(response.data);
          let user = response.data;
          if (user.id === 1) {
            axios({
              method: "put",
              url: "api/user/admin",
              data: {
                userId: user.id,
              },
            })
              .then((response) => {
                console.log(response);
              })
              .catch((error) => {
                console.log(error);
              });
          }
          history.replace("/login");
        });
      } else {
        console.log("sifre se ne poklapaju!");
        throw "Passwords not matching!";
      }
    }
  }

  return (
    <div>
      <Card>
        <div className={classes.header}>
          <h1>Registration</h1>
        </div>
        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="floatingInput">Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="name"
              ref={nameInputRef}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="floatingInput">Surname</label>
            <input
              type="text"
              className="form-control"
              placeholder="surname"
              ref={surnameInputRef}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="floatingInput">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="name@example.com"
              ref={emailInputRef}
            />
          </div>
          {isFirstUser === "yes" ? (
            <div></div>
          ) : (
            <div className={classes.control}>
              <label htmlFor="floatingInput">Wallet address</label>
              <input
                type="text"
                className="form-control"
                placeholder="Wallet address"
                ref={walletAddressInputRef}
              />
            </div>
          )}
          <div className={classes.control}>
            <label htmlFor="floatingInput">Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="username"
              ref={usernameInputRef}
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
            <label htmlFor="floatingPassword">Confirm password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm password"
              ref={confirmPasswordInputRef}
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

export default Register;
