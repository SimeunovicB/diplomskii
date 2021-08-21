import axios from "axios";
import { useState, useEffect } from "react";
import InactiveUserItem from "./InactiveUserItem";
import Card from "../ui/Card";
import classes from "./InactiveUsers.module.css";

function InactiveUsers() {
  const [inactiveUsers, setInactiveUsers] = useState([]);
  const [successMessage, setSuccessMessage] = useState(
    "" //User activated, 100PER added.
  );
  const [pendingMessage, setPendingMessage] = useState(
    "" //Transaction in progress, please wait.
  );
  const [errorMessage, setErrorMessage] = useState(""); //Error while attempting transaction!

  useEffect(() => {
    axios({
      method: "get",
      url: "/api/users/inactive",
    })
      .then((response) => {
        console.log("INACTIVE USERI ", response.data);
        let inactiveUsers = response.data;
        setInactiveUsers(inactiveUsers);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const newInactiveUsersHandler = () => {
    axios({
      method: "get",
      url: "/api/users/inactive",
    })
      .then((response) => {
        console.log("INACTIVE USERI ", response.data);
        let inactiveUsers = response.data;
        setInactiveUsers(inactiveUsers);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function setSuccessMessageHandler() {
    setSuccessMessage("User activated, 100PER added.");
    setPendingMessage("");
    setErrorMessage("");
  }

  function setPendingMessageHandler() {
    setSuccessMessage("");
    setPendingMessage("Transaction in progress, please wait.");
    setErrorMessage("");
  }

  function setErrorMessageHandler() {
    setSuccessMessage("");
    setPendingMessage("");
    setErrorMessage("Error while attempting transaction!");
  }

  let validation = <div></div>;
  if (successMessage !== "" && pendingMessage === "" && errorMessage === "") {
    validation = <div className={classes.alert_success}>{successMessage}</div>;
  } else if (
    successMessage === "" &&
    pendingMessage !== "" &&
    errorMessage === ""
  ) {
    validation = (
      <div className={classes.alert_warning}>
        {pendingMessage}{" "}
        <img
          src="https://acegif.com/wp-content/uploads/loading-25.gif"
          width="50"
        ></img>
      </div>
    ); //https://i.stack.imgur.com/ATB3o.gif
  } else if (
    successMessage === "" &&
    pendingMessage === "" &&
    errorMessage !== ""
  ) {
    validation = <div className={classes.alert_danger}>{errorMessage}</div>;
  }

  return (
    <div>
      <Card>
        <div className={classes.content}>
          {validation}
          <h1>Inactive users</h1>
          <ul>
            {inactiveUsers.map((user) => (
              <InactiveUserItem
                key={user.id}
                id={user.id}
                name={user.name}
                surname={user.surname}
                wallet_address={user.wallet_address}
                newInactiveUsers={newInactiveUsersHandler}
                setSuccessMessageItem={setSuccessMessageHandler}
                setPendingMessageItem={setPendingMessageHandler}
                setErrorMessageItem={setErrorMessageHandler}
              />
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
}

export default InactiveUsers;
