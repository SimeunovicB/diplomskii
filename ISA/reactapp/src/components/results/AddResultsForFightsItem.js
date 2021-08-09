import classes from "./AddResultsForFightsItem.module.css";
import Card from "../ui/Card";
import axios from "axios";
import { useState, useEffect } from "react";
import Select from "react-select";

function AddResultsForFightsItem(props) {
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
  const methodOptions = [
    { value: "Decision", label: "Decision" },
    { value: "KO/TKO", label: "KO/TKO" },
    { value: "Submission", label: "Submission" },
  ];

  // console.log("RED CORNER FIGHTER ", props.redCornerFighter);
  // console.log("BLUE CORNER FIGHTER ", props.blueCornerFighter);
  // console.log("WINNER_ID ", props.winner_id);
  // console.log("ID OD FIGHT JE ", props.id);

  console.log("PROPS ", props);

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
      loadedFighters.push({
        value: blueFighter.id,
        label: blueFighter.name + " " + blueFighter.surname,
      });
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    axios({
      method: "get",
      url: "fighters/" + props.redCornerFighter,
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

  const changeResultsHandler = () => {
    console.log("ide gaaaas");
    if (selectedOptionWinner !== null && selectedOptionMethod !== "") {
      console.log("selectedOptionWinner", selectedOptionWinner);
      console.log("selectedOptionMethod", selectedOptionMethod);
      props.changeResults(props.id, selectedOptionWinner, selectedOptionMethod);
      // console.log("PROBA AXIOS");
      // axios({
      //   method: 'put',
      //   url: 'fights/' + props.id + '/',
      //   data: {
      //     redCornerFighter: props.redCornerFighter,
      //     blueCornerFighter: props.blueCornerFighter,
      //     redCornerOdds: props.redCornerOdds,
      //     winner_id: selectedOptionWinner,
      //     method: selectedOptionMethod,
      //     event: props.event
      //   }
      // }).then(response => {
      //   console.log(response);
      // }).catch(error => {
      //   console.log(error);
      // })
    }
  };

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h3>
            {redCornerFighterName} {redCornerFighterSurname} vs{" "}
            {blueCornerFighterName} {blueCornerFighterSurname}
          </h3>
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

        {/* <form className={classes.form} onSubmit={submitHandler}> */}
        <div className={classes.control}>
          <label htmlFor="redCornerFighter">Winner</label>
          <div onBlur={changeResultsHandler}>
            <Select
              defaultValue={selectedOptionWinner}
              onChange={setSelectedOptionWinner}
              options={loadedFighters}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="blueCornerFighter">Method</label>
          <div onBlur={changeResultsHandler}>
            <Select
              defaultValue={selectedOptionMethod}
              onChange={setSelectedOptionMethod}
              options={methodOptions}
            />
          </div>
        </div>
        {/* <div className={classes.actions}>
            <button onClick={submitHandler}>Add result</button>
          </div> */}
        {/* </form> */}
      </Card>
    </li>
  );
}

export default AddResultsForFightsItem;
