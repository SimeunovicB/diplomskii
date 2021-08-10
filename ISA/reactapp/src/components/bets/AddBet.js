import classes from "./AddBet.module.css";
import Card from "../ui/Card";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Select from "react-select";
import { useLocation, useHistory } from "react-router-dom";

function AddBet(props) {
  const location = useLocation();
  console.log("LOCATION ", location.state);

  const history = useHistory();

  console.log("USER U ADD BET ", props.user);

  const stakeInputRef = useRef();

  const [selectedOptionWinner, setSelectedOptionWinner] = useState(null);

  const [redCornerFighterName, setRedCornerFighterName] = useState(null);
  const [blueCornerFighterName, setBlueCornerFighterName] = useState(null);

  const [redCornerFighterSurname, setRedCornerFighterSurname] = useState(null);
  const [blueCornerFighterSurname, setBlueCornerFighterSurname] =
    useState(null);

  const [redCornerFighterImg, setRedCornerFighterImg] = useState(null);
  const [blueCornerFighterImg, setBlueCornerFighterImg] = useState(null);

  const [redCornerFighterWins, setRedCornerFighterWins] = useState(null);
  const [blueCornerFighterWins, setBlueCornerFighterWins] = useState(null);

  const [redCornerFighterLosses, setRedCornerFighterLosses] = useState(null);
  const [blueCornerFighterLosses, setBlueCornerFighterLosses] = useState(null);

  const [redCornerFighterAge, setRedCornerFighterAge] = useState(null);
  const [blueCornerFighterAge, setBlueCornerFighterAge] = useState(null);

  const [redCornerFighterHeight, setRedCornerFighterHeight] = useState(null);
  const [blueCornerFighterHeight, setBlueCornerFighterHeight] = useState(null);

  const [redCornerFighterWeight, setRedCornerFighteWeight] = useState(null);
  const [blueCornerFighterWeight, setBlueCornerFighterWeight] = useState(null);

  const [redCornerFighterReach, setRedCornerFighterReach] = useState(null);
  const [blueCornerFighterReach, setBlueCornerFighterReach] = useState(null);

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
      setBlueCornerFighterWins(blueFighter.wins);
      setBlueCornerFighterLosses(blueFighter.losses);
      setBlueCornerFighterAge(blueFighter.age);
      setBlueCornerFighterHeight(blueFighter.height);
      setBlueCornerFighterWeight(blueFighter.weight);
      setBlueCornerFighterReach(blueFighter.reach);
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
      setRedCornerFighterWins(redFighter.wins);
      setRedCornerFighterLosses(redFighter.losses);
      setRedCornerFighterAge(redFighter.age);
      setRedCornerFighterHeight(redFighter.height);
      setRedCornerFighteWeight(redFighter.weight);
      setRedCornerFighterReach(redFighter.reach);
      loadedFighters.push({
        value: redFighter.id,
        label: redFighter.name + " " + redFighter.surname,
      });
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const makeABet = () => {
    console.log("ide gasic");
    if (stakeInputRef.current.value === "" || selectedOptionWinner === null) {
      console.log("alo nisi uneo ulog i pobednika");
    } else if(stakeInputRef.current.value > props.user.coins) {
      console.log("nemas dovoljno coin-a gari")
    } else {
      console.log("fight ", location.state.fightId);
      console.log("predicted_winner ", selectedOptionWinner.value);
      console.log("stake ", stakeInputRef.current.value);
      axios({
        method: 'post',
        url: 'bets/',
        data: {
          fight: location.state.fightId,
          predicted_winner: selectedOptionWinner.value,
          stake: stakeInputRef.current.value,
          user: props.user.id
        }
      }).then(response => {
        console.log(response);
        console.log(response.data);
        history.replace("/upcoming-events-and-fights")
      }).catch(error => {
        console.log(error);
      })
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
      <div className={classes.father}>
        <div className={classes.red}>{redCornerFighterWins}W : {redCornerFighterLosses}L</div>
        <div className={classes.atribute}>Record</div>
        <div className={classes.blue}>{blueCornerFighterWins}W : {blueCornerFighterLosses}L</div>
      </div>
      <div className={classes.father}>
        <div className={classes.red}>{redCornerFighterAge}</div>
        <div className={classes.atribute}>Age</div>
        <div className={classes.blue}>{blueCornerFighterAge}</div>
      </div>
      <div className={classes.father}>
        <div className={classes.red}>{redCornerFighterHeight}cm</div>
        <div className={classes.atribute}>Height</div>
        <div className={classes.blue}>{blueCornerFighterHeight}cm</div>
      </div>
      <div className={classes.father}>
        <div className={classes.red}>{redCornerFighterWeight}kg</div>
        <div className={classes.atribute}>Weight</div>
        <div className={classes.blue}>{blueCornerFighterWeight}kg</div>
      </div>
      <div className={classes.father}>
        <div className={classes.red}>{redCornerFighterReach}cm</div>
        <div className={classes.atribute}>Reach</div>
        <div className={classes.blue}>{blueCornerFighterReach}cm</div>
      </div>

      <div className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="redCornerFighter">Winner prediction</label>
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
