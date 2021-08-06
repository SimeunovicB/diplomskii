import classes from "./EventAndFightItem.module.css";
import Card from "../ui/Card";
import axios from "axios";
import { useState, useEffect } from "react";
import FightForEvent from "./FightForEvent";

function EventAndFightItem(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedFights, setLoadedFights] = useState([]);
  const [numberOfFights, setNumberOfFights] = useState("");

  // axios({
  //     method: "POST", //post je zato sto ne znam koliko ce se id-eva slati
  //     url: "fights/event",
  //     data: {
  //         fights: props.fights
  //     }
  // }).then(response => {
  //     console.log(response);
  // })

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
      setIsLoading(false);
      setLoadedFights(ret);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h3>{props.name}</h3>
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
        </div>
      </Card>
    </li>
  );
}

export default EventAndFightItem;
