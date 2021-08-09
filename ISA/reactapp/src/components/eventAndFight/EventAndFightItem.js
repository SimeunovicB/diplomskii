import classes from "./EventAndFightItem.module.css";
import Card from "../ui/Card";
import axios from "axios";
import { useState, useEffect } from "react";
import FightForEvent from "./FightForEvent";

function EventAndFightItem(props) {
  // const [isLoading, setIsLoading] = useState(false);
  const [loadedFights, setLoadedFights] = useState([]);
  const [numberOfFights, setNumberOfFights] = useState("");



  useEffect(() => {
    axios({
      method: "get",
      url: "api/fights/event?eventId=" + props.id,
    }).then((response) => {
      let fights = response.data;
      let ret = [];
      console.log("FAJTOVI", fights);
      for (let i in fights) {
        ret.push(fights[i]);
      }
      setNumberOfFights(ret.length);
      // setIsLoading(false);
      setLoadedFights(ret);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const zeroFights = (
    <div>There are no scheduled fights for this event currently.</div>
  );

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h2>{props.name}</h2>
          {numberOfFights === 0 ? (
            zeroFights
          ) : (
            <ul className={classes.list}>
              {loadedFights.map((fight) => (
                <FightForEvent
                  key={fight.id}
                  id={fight.id}
                  redCornerFighter={fight.redCornerFighter}
                  blueCornerFighter={fight.blueCornerFighter}
                  redCornerOdds={fight.redCornerOdds}
                />
              ))}
            </ul>
          )}
        </div>
      </Card>
    </li>
  );
}

export default EventAndFightItem;
