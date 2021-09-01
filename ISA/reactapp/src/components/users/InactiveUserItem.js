import classes from "./InactiveUserItem.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import Web3 from "web3";

function InactiveUserItem(props) {

  const [isLoading, setIsLoading] = useState(false);
  const [adminWalletAddress, setAdminWalletAddress] = useState("");

  console.log("PROPS InactiveUserItem ", props);
  console.log(props.id);

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

  //   const makeUserActive = () => {
  //       axios({
  //           method: 'put',
  //           url: 'api/user/active',
  //           data: {
  //               userId: props.id
  //           }.then(response => {
  //               console.log(response.data);
  //               user = response.data;

  //           })
  //       })
  //   }

  async function makeUserActive() {
    let transferSuccess;
        try {
          props.setPendingMessageItem();
          transferSuccess = await window.contract.methods
            .transfer(
              props.wallet_address,
              100 * 100 //ovde ide puta 100 zbog dve decimale iza zagrade kod Perper-a
            )
            .send({ from: adminWalletAddress });
        } catch {
          props.setErrorMessageItem();
          console.log("Transaction failed!");
          return 0;
        }
        props.setSuccessMessageItem();
        console.log(transferSuccess);
    (async () => {
      const response = await fetch("http://127.0.0.1:8000/api/user/active", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        method: "put",
        body: JSON.stringify({
            userId: props.id
        }),
      });
      const user = await response.json();
      console.log("USER U INACTIVE ", user);
      }
    )();
    props.newInactiveUsers();
  }


  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className={classes.fight}>
          <div>
            {props.name} {props.surname}
          </div>
          <div>
            <button onClick={makeUserActive}>Activate</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default InactiveUserItem;
