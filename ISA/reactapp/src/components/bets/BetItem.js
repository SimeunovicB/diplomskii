import classes from "./BetItem.module.css";
import Card from "../ui/Card";
import axios from "axios";
import { useState, useEffect } from "react";

function BetItem(props) {
  console.log(props);

  //   const [fight, setFight] = useState(null);

  const [redCornerFighterOdds, setRedCornerFighterOdds] = useState(null);
  const [blueCornerFighterOdds, setBlueCornerFighterOdds] = useState(null);

  const [winnerId, setWinnerId] = useState(null);
  const [method, setMethod] = useState(null);

  const [redCornerFighterId, setRedCornerFighterId] = useState(null);
  const [blueCornerFighterId, setBlueCornerFighterId] = useState(null);

  const [redCornerFighterName, setRedCornerFighterName] = useState(null);
  const [blueCornerFighterName, setBlueCornerFighterName] = useState(null);

  const [redCornerFighterSurname, setRedCornerFighterSurname] = useState(null);
  const [blueCornerFighterSurname, setBlueCornerFighterSurname] =
    useState(null);

  const [redCornerFighterImg, setRedCornerFighterImg] = useState(null);
  const [blueCornerFighterImg, setBlueCornerFighterImg] = useState(null);

  useEffect(() => {
    axios({
      method: "get",
      url: "fights/" + props.fight,
    })
      .then((response) => {
        let fight = response.data;
        console.log("daj mi fajt ", fight);
        console.log("tip od odds je ", typeof fight.redCornerOdds);
        setRedCornerFighterOdds(fight.redCornerOdds);
        setBlueCornerFighterOdds(100 - fight.redCornerOdds);
        setWinnerId(fight.winner_id);
        setMethod(fight.method);
        axios({
          method: "get",
          url: "fighters/" + fight.redCornerFighter,
        }).then((response) => {
          let redFighter = response.data;
          setRedCornerFighterId(redFighter.id);
          setRedCornerFighterName(redFighter.name);
          setRedCornerFighterSurname(redFighter.surname);
          setRedCornerFighterImg(redFighter.image);
        });

        axios({
          method: "get",
          url: "fighters/" + fight.blueCornerFighter,
        }).then((response) => {
          let blueFighter = response.data;
          setBlueCornerFighterId(blueFighter.id);
          setBlueCornerFighterName(blueFighter.name);
          setBlueCornerFighterSurname(blueFighter.surname);
          setBlueCornerFighterImg(blueFighter.image);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  //   console.log("FIGHT USE STATE ", fight);
  //   console.log("RED FIGHTER USE STATE ", redCornerFighter);
  //   console.log("BLUE CORNER FIGHTER USE STATE ", blueCornerFighter);

  //   let finishedFightData = "";
  //   if(props.winner_id !== null) {
  //     console.log("rezultat je unesen");
  //     if(redCornerFighterId === props.winner_id) {
  //       finishedFightData += "Winner is " + redCornerFighterName + " " + redCornerFighterSurname + " by " + props.method;
  //     } else if(blueCornerFighterId === props.winner_id) {
  //       finishedFightData += "Winner is " + blueCornerFighterName + " " + blueCornerFighterSurname + " by " + props.method;
  //     }
  //   }

  let winnerShow = null;
  let predictedWinnerShow = null;
  let betStatusShow = null;
  let priceShow = null;
  let potentialWin = <div></div>

  if (props.success === "success" || props.success === "failure") {
    if (winnerId === redCornerFighterId) {
      winnerShow = (
        <div>
          Winner is {redCornerFighterName} {redCornerFighterSurname} by {method}
        </div>
      );
    } else if (winnerId === blueCornerFighterId) {
      winnerShow = (
        <div>
          Winner is {blueCornerFighterName} {blueCornerFighterSurname} by {method}
        </div>
      );
    }
  }

  if(props.predicted_winner === redCornerFighterId) {
    predictedWinnerShow = <div>Your bet is on {redCornerFighterName} {redCornerFighterSurname} with {redCornerFighterOdds}% odds</div>
  } else if(props.predicted_winner === blueCornerFighterId) {
    predictedWinnerShow = <div>Your bet is on {blueCornerFighterName} {blueCornerFighterSurname} with {blueCornerFighterOdds}% odds</div>
  }

  if(props.success === "upcoming") {
    betStatusShow = <div><b>Bet status: Pending</b></div>
    priceShow = <div>Bet amount {props.stake} PER</div>
    if(props.predicted_winner === redCornerFighterId) {
      let amountWon = props.stake/redCornerFighterOdds*100;
      amountWon = amountWon.toFixed(2);
      potentialWin = <div>Your potential prize is {amountWon} PER</div>
    } else if(props.predicted_winner === blueCornerFighterId) {
      let amountWon = props.stake/blueCornerFighterOdds*100;
      amountWon = amountWon.toFixed(2);
      potentialWin = <div>Your potential prize is {amountWon} PER</div>    }
  } else if(props.success === "success") {
    betStatusShow = <div><b>Bet status: Success</b></div>
    if(props.predicted_winner === redCornerFighterId) {
      let amountWon = props.stake/redCornerFighterOdds*100;
      amountWon = amountWon.toFixed(2);
      priceShow = <div>You won {amountWon} PER</div>
    } else if(props.predicted_winner === blueCornerFighterId) {
      let amountWon = props.stake/blueCornerFighterOdds*100;
      amountWon = amountWon.toFixed(2);
      priceShow = <div>You won {amountWon} PER</div>    }
  } else if(props.success === "failure") {
    betStatusShow = <div><b>Bet status: Failure</b></div>
    priceShow = <div>You lost {props.stake} PER</div>
  }

  // } else if (props.success === "failure") {
  //   winnerShow = "propo";
  // }

  console.log("redCornerFighterImg", redCornerFighterImg);
  console.log("blueCornerFighterImg ", blueCornerFighterImg);

  return (
    // <div>Moja je cura {ret}</div>
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <div>
            <img
              src={redCornerFighterImg}
              alt="slika borca"
              height="200"
              width="200"
            ></img>
            <img
              src={blueCornerFighterImg}
              alt="slika borca"
              height="200"
              width="200"
            ></img>
          </div>
          <h3>
            {redCornerFighterName} {redCornerFighterSurname} vs{" "}  
            {blueCornerFighterName} {blueCornerFighterSurname}
          </h3>
          {winnerShow}
          {predictedWinnerShow}
          {priceShow}
          {potentialWin}
          {betStatusShow}
          {/* <h3>
            {redCornerFighter.name} {redCornerFighter.surname} vs{" "}
            {blueCornerFighter.name} {blueCornerFighter.surname}
          </h3> */}
          {/* <img
            src={redCornerFighter.img}
            alt="slika borca"
            height="200"
            width="200"
          ></img>{" "}
          vs{" "}
          <img
            src={blueCornerFighter.img}
            alt="slika borca"
            height="200"
            width="200"
          ></img> */}
        </div>
      </Card>
    </li>
  );
}

export default BetItem;
