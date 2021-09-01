import BetList from "../bets/BetList";
import { useState, useEffect } from "react";
import axios from "axios";
import classes from "./MyBets.module.css";
import Card from "../ui/Card";

function MyBets(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [upcomingBets, setUpcomingBets] = useState([]);
  const [successfulBets, setSuccessfulBets] = useState([]);
  const [failedBets, setFailedBets] = useState([]);


  console.log(props.user);
  console.log("USER ID ", props.user.id);
  console.log("DZET SET ", props.user.bet_set);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://127.0.0.1:8000/api/user", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      setIsLoading(true);
      const content = await response.json();
      console.log("IDE CONTENT", content);
      axios({
        method: "get",
        url: "api/bets/user?userId=" + content.id,
      }).then((response) => {
        console.log("DJE STE VI BRE", response.data);
        let bets = response.data;
        let upcomingBets = [];
        let successfulBets = [];
        let failedBets = [];
        console.log("Bets", bets);
        for (let i in bets) {
          if (bets[i].success === "upcoming") {
            console.log("ceka se jos");
            upcomingBets.push(bets[i]);
          } else if (bets[i].success === "success") {
            console.log("kasirao ga");
            successfulBets.push(bets[i]);
          } else if (bets[i].success === "failure") {
            console.log("bezis od kase");
            failedBets.push(bets[i]);
          }
        }
        setIsLoading(false);
        setUpcomingBets(upcomingBets);
        setSuccessfulBets(successfulBets);
        setFailedBets(failedBets);
        setIsLoading(false);
      });
    })();
  }, []);


  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <div>
      <Card>
      {/* <h1>My bets</h1> */}
      {upcomingBets.length === 0 &&
      successfulBets.length === 0 &&
      failedBets.length === 0 ? (
        <div className={classes.card}>
          <h1>All bets</h1>
          <h3>You made no bets!</h3>
        </div>
      ) : (
        <BetList
          upcomingBets={upcomingBets}
          successfulBets={successfulBets}
          failedBets={failedBets}
          isLoading={isLoading}
        />
      )}
      </Card>
    </div>
  );
}

export default MyBets;
