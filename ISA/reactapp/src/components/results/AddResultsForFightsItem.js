import classes from "./AddResultsForFightsItem.module.css";
import Card from "../ui/Card";
import axios from "axios";
import { useState, useEffect } from "react";
import Select from "react-select";

function AddResultsForFightsItem(props) {
  const [redCornerFighterName, setRedCornerFighterName] = useState(null);
  const [blueCornerFighterName, setBlueCornerFighterName] = useState(null);

  const [redCornerFighterSurname, setRedCornerFighterSurname] = useState(null);
  const [blueCornerFighterSurname, setBlueCornerFighterSurname] = useState(null);

  const [redCornerFighterImg, setRedCornerFighterImg] = useState(null);
  const [blueCornerFighterImg, setBlueCornerFighterImg] = useState(null);

  const [selectedOptionWinner, setSelectedOptionWinner] = useState(null);
  const [selectedOptionMethod, setSelectedOptionMethod] = useState("");

  const [loadedFighters, setLoadedFighters] = useState([]);
  const [methodOptions, setMethodOptions] = useState([{value: 1, label:"Decision"},{value: 2, label:"KO/TKO"},{value: 3, label: "Submission"}])

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
      setBlueCornerFighterName(blueFighter.name);
      setBlueCornerFighterSurname(blueFighter.surname);
      setBlueCornerFighterImg(blueFighter.image);
      loadedFighters.push({value: blueFighter.id, label: blueFighter.name});
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    axios({
      method: "get",
      url: "fighters/" + props.redCornerFighter,
    }).then((response) => {
      console.log(response.data);
      let redFighter = response.data;
      setRedCornerFighterName(redFighter.name);
      setRedCornerFighterSurname(redFighter.surname);
      setRedCornerFighterImg(redFighter.image);
      loadedFighters.push({value: redFighter.id, label: redFighter.name});
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const submitHandler = () => {
    console.log("submitHandler");
  };

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          {redCornerFighterName} {redCornerFighterSurname} vs{" "}
          {blueCornerFighterName} {blueCornerFighterSurname}
        </div>
        <div className={classes.content}>
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
        </div>

        <form className={classes.form} onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="redCornerFighter">Winner</label>
            <Select
              defaultValue={selectedOptionWinner}
              onChange={setSelectedOptionWinner}
              options={loadedFighters}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="blueCornerFighter">Method</label>
            <Select
              defaultValue={selectedOptionMethod}
              onChange={setSelectedOptionMethod}
              options={methodOptions}
            />
          </div>
          <div className={classes.actions}>
            <button>Add result</button>
          </div>
        </form>
      </Card>
    </li>
  );
}

export default AddResultsForFightsItem;
