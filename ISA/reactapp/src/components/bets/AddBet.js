import classes from "./AddBet.module.css";
import Card from "../ui/Card";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { useLocation } from "react-router-dom";

function AddBet(props) {
  const location = useLocation();
  console.log("LOCATION ", location.state);

  const stakeInputRef = useRef();

  const [redCornerFighterName, setRedCornerFighterName] = useState(null);
  const [blueCornerFighterName, setBlueCornerFighterName] = useState(null);

  const [redCornerFighterSurname, setRedCornerFighterSurname] = useState(null);
  const [blueCornerFighterSurname, setBlueCornerFighterSurname] =
    useState(null);

  const [redCornerFighterImg, setRedCornerFighterImg] = useState(null);
  const [blueCornerFighterImg, setBlueCornerFighterImg] = useState(null);

  // const [redCornerFighterWins, setRedCornerFighterWins] = useState(null);
  // const [blueCornerFighterWins, setBlueCornerFighterWins] = useState(null);

  // const [redCornerFighterLosses, setRedCornerFighterLosses] = useState(null);
  // const [blueCornerFighterLosses, setBlueCornerFighterLosses] = useState(null);

  // const [redCornerFighterAge, setRedCornerFighterAge] = useState(null);
  // const [blueCornerFighterAge, setBlueCornerFighterAge] = useState(null);

  // const [redCornerFighterLosses, setRedCornerFighterLosses] = useState(null);
  // const [blueCornerFighterLosses, setBlueCornerFighterLosses] = useState(null);

  // const [redCornerFighterWins, setRedCornerFighterWins] = useState(null);
  // const [blueCornerFighterWins, setBlueCornerFighterWins] = useState(null);

  // const [redCornerFighterLosses, setRedCornerFighterLosses] = useState(null);
  // const [blueCornerFighterLosses, setBlueCornerFighterLosses] = useState(null);

  const [selectedOptionWinner, setSelectedOptionWinner] = useState(null);
  const [selectedOptionMethod, setSelectedOptionMethod] = useState("");

  const [loadedFighters, setLoadedFighters] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "fighters/" + location.state.blueCornerFighterId,
    }).then((response) => {
      console.log(response.data);
      let blueFighter = response.data;
      setBlueCornerFighterName(blueFighter.name);
      setBlueCornerFighterSurname(blueFighter.surname);
      setBlueCornerFighterImg(blueFighter.image);
      loadedFighters.push({
        value: blueFighter.id,
        label: blueFighter.name + " " + blueFighter.surname,
      });
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    axios({
      method: "get",
      url: "fighters/" + location.state.redCornerFighterId,
    }).then((response) => {
      let redFighter = response.data;
      setRedCornerFighterName(redFighter.name);
      setRedCornerFighterSurname(redFighter.surname);
      setRedCornerFighterImg(redFighter.image);
      loadedFighters.push({
        value: redFighter.id,
        label: redFighter.name + " " + redFighter.surname,
      });
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const makeABet = () => {
    console.log("ide gasic");
    if(stakeInputRef.current.value === "") {
        console.log("alo nisi uneo ulog")
    }
  };

  return (
    <Card>
      <div className={classes.content}>
        <h2>
          {redCornerFighterName} {redCornerFighterSurname} vs{" "}
          {blueCornerFighterName} {blueCornerFighterSurname}
        </h2>
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

      <div className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="redCornerFighter">Winner</label>
          <div>
            <Select
              defaultValue={selectedOptionWinner}
              onChange={setSelectedOptionWinner}
              options={loadedFighters}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="age">Amount of coins to bet</label>
          <input type="number" required id="stake" ref={stakeInputRef} />
        </div>
        <div className={classes.actions}>
          <button onClick={makeABet}>Make a bet</button>
        </div>
      </div>
    </Card>
  );
}

export default AddBet;
