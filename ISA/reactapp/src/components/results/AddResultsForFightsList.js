// import FightItem from "./FightItem";
import AddResultsForFightsItem from "./AddResultsForFightsItem";
import classes from "./AddResultsForFightsList.module.css";
import { useLocation, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../ui/Card";

function AddResultsForFightsList() {
  const location = useLocation();
  const history = useHistory();
  console.log(location.state.eventId);

  const [fights, setFights] = useState([]);
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

  //   console.log("FAJTERI U FIGHTER LIST", props.fights);

  const changeResultsHandler = (fightId, winnerId, winningMethod) => {
    console.log("changeResultsHandler");
    console.log("FIGHT ID ", fightId)
    console.log("WINNER ID ", winnerId);
    console.log("WINNING METHOD ", winningMethod);
    fightsResults.set(fightId, [winnerId,winningMethod]);
  };

  const submitHandler = () => {
    console.log("ide gas");

    function logMapElements(value, key) {
      returnFightIds.push(key);
      returnWinnerIds.push(value[0]);
      returnMethods.push(value[1]);
    }

    fightsResults.forEach(logMapElements);

    console.log(returnFightIds);
    console.log(returnWinnerIds);
    console.log(returnMethods);
    axios({
      method: "put",
      url: "api/results/event",
      data: {
        fightIds: returnFightIds,
        winnerIds: returnWinnerIds,
        methods: returnMethods
      },
    }).then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });


    history.replace('/past-events-and-fights')
  };

  return (
    <div>
      <Card>
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
      </Card>
    </div>
  );
}
export default AddResultsForFightsList;
