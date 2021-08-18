import axios from "axios";
import { useState, useEffect } from "react";
import InactiveUserItem from "./InactiveUserItem";
import Card from "../ui/Card";
import classes from "./InactiveUsers.module.css";
import { useCallback } from 'react-router-dom';

function InactiveUsers() {
  const [inactiveUsers, setInactiveUsers] = useState([]);

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

  return (
    <div>
      <Card>
        <div className={classes.content}>
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
              />
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
}

export default InactiveUsers;
