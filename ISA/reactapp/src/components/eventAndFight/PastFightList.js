import classes from "./PastFightList.module.css";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import FightItem from "../fights/FightItem";
import Card from "../ui/Card";

function PastFightList() {
  const [fights, setFights] = useState([]);
  const location = useLocation();

  console.log("LOCATION ", location);
  console.log("STATE ", location.state);
  console.log("eventId ", location.state.eventId);

  useEffect(() => {
    axios({
      method: "get",
      url: "api/fights/event?eventId=" + location.state.eventId,
    })
      .then((response) => {
        console.log(response);
        let responseFights = response.data;
        setFights(responseFights);
        // let fights = [];
        // for(let i in responseFights) {
        //   fights.push(responseFights[i]);
        // }
        // setFights(fights);
        // if(responseFights === fights) {
        //   console.log("isto");
        // } else {
        //   console.log("nije isto")
        // }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Card>
      <div className={classes.content}>
        <h2>{location.state.eventName}</h2>
      </div>
      <ul className={classes.list}>
        {fights.map((fight) => (
          <FightItem
            key={fight.id}
            id={fight.id}
            redCornerFighter={fight.redCornerFighter}
            blueCornerFighter={fight.blueCornerFighter}
            winner_id={fight.winner_id}
            method={fight.method}
          />
        ))}
      </ul>
    </Card>
  );
}
export default PastFightList;
