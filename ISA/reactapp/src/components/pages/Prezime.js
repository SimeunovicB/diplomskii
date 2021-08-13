// import classes from "./Prezime.module.css";

// import { useLocation } from "react-router-dom";

// const Prezime = (props) => {

//     const location = useLocation();
//     console.log("PROPS ", location.pathname);
//     const numberOfFightsArray = location.pathname.split("/");
//     const numberOfFights = numberOfFightsArray[2];
//     console.log(numberOfFights);

//     return <div className={classes.okvir}>
//         <div className={classes.maj}>
//             name: Silk Apartment<br/>
//             password: 08061996i
//         </div>
//     </div>
// }
// export default Prezime;

import classes from "./Prezime.module.css";
import Web3 from "web3";
import { useState } from "react";

const Prezime = () => {
  const [status, setStatus] = useState("Loading...");
  const [balance, setBalance] = useState(null);

  console.log("USAO NA POCETAK");
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
    let balanceOfMe = await window.contract.methods
      .balanceOf("0x7f78c74b3C360d9452E94051C302e491A042024f")
      .call();
    setBalance(balanceOfMe);
    setStatus("Ready!");
    console.log("USAO U LOAD");
  }

  load(this);

  async function ideGas() {
    console.log("ide gas");
    console.log("CONTRACT ", window.contract);
    console.log("METHODS ", window.contract.methods);
    console.log("BALANCEOF");
    // let balanceOfMe = await window.contract.methods
    //   .balanceOf("0x7f78c74b3C360d9452E94051C302e491A042024f")
    //   .call();
    let balanceOfMe = await window.contract.methods
      .balanceOf("0x2C466ade72BFE409EC41522Ed77D257B171ddE66")
      .call();
    console.log(balanceOfMe);
    console.log("TOTAL SUPPLY");
    let totalSupply = await window.contract.methods.totalSupply().call();
    console.log(totalSupply);
    let tokenName = await window.contract.methods.name().call();
    console.log(tokenName);
  }

  async function sendToSecond() {
    console.log("send To second");
    setStatus("Started transaction to second acc");
    //OD KECA KA DVOJCI
    let transferSuccess = await window.contract.methods
      .transfer("0x2C466ade72BFE409EC41522Ed77D257B171ddE66", 1000)
      .send({ from: "0x7f78c74b3C360d9452E94051C302e491A042024f" });
    console.log("Transfer success: ", transferSuccess);
    setStatus("Finished");
  }

  return (
    <div>
      <div className={classes.okvir}>
        <h1>Povezujemo Perper sa kladionicom</h1>
        <div>{status}</div>
        <div>I have {balance}PER</div>
        <button onClick={ideGas}>Ide gas</button>
        <div>
          <button onClick={sendToSecond}>Send to second acc</button>
        </div>
      </div>
    </div>
  );
};
export default Prezime;
