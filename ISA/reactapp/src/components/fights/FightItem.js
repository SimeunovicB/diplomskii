import classes from "./FightItem.module.css";
import Card from "../ui/Card";
import axios from "axios";
import { useState } from "react";

function FightItem(props) {
  const [redCornerFighter, setRedCornerFighter] = useState(null);
  const [blueCornerFighter, setBlueCornerFighter] = useState(null);

  const [redCornerFighterImg, setRedCornerFighterImg] = useState(null);
  const [blueCornerFighterImg, setBlueCornerFighterImg] = useState(null);

  axios({
    method: "get",
    url: "fighters/" + props.blueCornerFighter,
  }).then((response) => {
    console.log(response.data);
    let blueFighter = response.data;
    setBlueCornerFighter(blueFighter.name);
    setBlueCornerFighterImg(blueFighter.image);
  });

  axios({
    method: "get",
    url: "fighters/" + props.redCornerFighter,
  }).then((response) => {
    console.log(response.data);
    let redFighter = response.data;
    setRedCornerFighter(redFighter.name);
    setRedCornerFighterImg(redFighter.image);
  });

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          {redCornerFighter} vs {blueCornerFighter}
        </div>
        <div className={classes.content}>
          <img
            src={redCornerFighterImg}
            alt="slika borca"
            height="200"
            width="200"
          ></img>{" "}
          vs
          <img
            src={blueCornerFighterImg}
            alt="slika borca"
            height="200"
            width="200"
          ></img>
        </div>
      </Card>
    </li>
  );
}

export default FightItem;
