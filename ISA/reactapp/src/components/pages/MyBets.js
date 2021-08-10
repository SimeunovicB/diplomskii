import BetList from "../bets/BetList";
import { useState, useEffect } from "react";
import axios from "axios";

function MyBets(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [upcomingBets, setUpcomingBets] = useState([]);
  const [successfulBets, setSuccessfulBets] = useState([]);
  const [failedBets, setFailedBets] = useState([]);

  const [user, setUser] = useState(null);

  console.log(props.user);
  console.log("USER ID ", props.user.id);
  console.log("DZET SET ", props.user.bet_set);

  //   useEffect(() => {
  //     setIsLoading(true);

  //     axios({
  //       method: "get",
  //       url: "api/bets/user?userId=" + props.user.id,
  //     }).then((response) => {
  //       let bets = response.data;
  //       let ret = [];
  //       console.log("Bets", bets);
  //       for (let i in bets) {
  //         ret.push(bets[i]);
  //       }
  //       console.log("RET", ret);
  //       setIsLoading(false);
  //       setLoadedBets(ret);
  //     });
  //   }, []); //ako se drugom argumentu promeni stanje onda se opet pozove funkcija

  useEffect(() => {
    (async () => {
      const response = await fetch("http://127.0.0.1:8000/api/user", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const content = await response.json();
      console.log("IDE CONTENT", content);
      setUser(content);
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
            if(bets[i].success === "upcoming") {
                console.log("ceka se jos")
                upcomingBets.push(bets[i]);
            } else if(bets[i].success === "success") {
                console.log("kasirao ga");
                successfulBets.push(bets[i]);
            } else if(bets[i].success === "failure") {
                console.log("bezis od kase");
                failedBets.push(bets[i]);
            }
        }
        setIsLoading(false);
        setUpcomingBets(upcomingBets);
        setSuccessfulBets(successfulBets);
        setFailedBets(failedBets);
      });
    })();
  }, []);

  useEffect(() => {}, []);

  console.log("to je moj user ", user);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <div>
      <h1>My bets</h1>
      <BetList upcomingBets={upcomingBets} successfulBets={successfulBets} failedBets={failedBets} />
    </div>
  );
}

export default MyBets;
