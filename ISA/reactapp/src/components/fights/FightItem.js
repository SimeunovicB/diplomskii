import classes from "./FightItem.module.css";
import Card from "../ui/Card";
import axios from "axios";
import { useState } from "react";

function FightItem(props) {
  const [redCornerFighter, setRedCornerFighter] = useState(null);
  const [blueCornerFighter, setBlueCornerFighter] = useState(null);

  axios({
    method: "get",
    url: "fighters/" + props.blueCornerFighter,
  }).then((response) => {
    console.log(response.data);
    let blueFighter = response.data;
    setBlueCornerFighter(blueFighter.name);
  });

  axios({
    method: "get",
    url: "fighters/" + props.redCornerFighter,
  }).then((response) => {
    console.log(response.data);
    let redFighter = response.data;
    setRedCornerFighter(redFighter.name);
  });


  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>{redCornerFighter} vs {blueCornerFighter}</div>
      </Card>
    </li>
  );
}

export default FightItem;
