import classes from "./FightItem.module.css";
import Card from "../ui/Card";
import axios from "axios";
import { useState, useEffect } from "react";

function FightItem(props) {

  const [redCornerFighterId, setRedCornerFighterId] = useState(null);
  const [blueCornerFighterId, setBlueCornerFighterId] = useState(null);

  const [redCornerFighterName, setRedCornerFighterName] = useState(null);
  const [blueCornerFighterName, setBlueCornerFighterName] = useState(null);

  const [redCornerFighterSurname, setRedCornerFighterSurname] = useState(null);
  const [blueCornerFighterSurname, setBlueCornerFighterSurname] =
    useState(null);

  const [redCornerFighterImg, setRedCornerFighterImg] = useState(null);
  const [blueCornerFighterImg, setBlueCornerFighterImg] = useState(null);

  console.log("RED CORNER FIGHTER ", props.redCornerFighter);
  console.log("BLUE CORNER FIGHTER ", props.blueCornerFighter);
  console.log("WINNER_ID ", props.winner_id);

  useEffect(() => {
    axios({
      method: "get",
      url: "fighters/" + props.blueCornerFighter,
    }).then((response) => {
      console.log(response.data);
      let blueFighter = response.data;
      setBlueCornerFighterId(blueFighter.id);
      setBlueCornerFighterName(blueFighter.name);
      setBlueCornerFighterSurname(blueFighter.surname);
      setBlueCornerFighterImg(blueFighter.image);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    axios({
      method: "get",
      url: "fighters/" + props.redCornerFighter,
    }).then((response) => {
      console.log(response.data);
      let redFighter = response.data;
      setRedCornerFighterId(redFighter.id);
      setRedCornerFighterName(redFighter.name);
      setRedCornerFighterSurname(redFighter.surname);
      setRedCornerFighterImg(redFighter.image);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  let finishedFightData = "";
  if(props.winner_id !== null) {
    console.log("rezultat je unesen");
    if(redCornerFighterId === props.winner_id) {
      finishedFightData += "Winner is " + redCornerFighterName + " " + redCornerFighterSurname + " by " + props.method;
    } else if(blueCornerFighterId === props.winner_id) {
      finishedFightData += "Winner is " + blueCornerFighterName + " " + blueCornerFighterSurname + " by " + props.method;
    }
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h3>
            {redCornerFighterName} {redCornerFighterSurname} vs{" "}
            {blueCornerFighterName} {blueCornerFighterSurname}
          </h3>
        {/* </div> */}
        {/* <div className={classes.content}> */}
          <img
            src={redCornerFighterImg}
            alt="slika borca"
            height="200"
            width="200"
          ></img>{" "}
          vs{" "}
          <img
            src={blueCornerFighterImg}
            alt="slika borca"
            height="200"
            width="200"
          ></img>
          <h3>
            {finishedFightData}
          </h3>
        </div>
      </Card>
    </li>
  );
}

export default FightItem;
