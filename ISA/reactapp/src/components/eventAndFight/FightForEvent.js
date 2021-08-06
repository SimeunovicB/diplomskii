import axios from "axios";
import { useState, useEffect } from "react";

function FightForEvent(props) {
  const [isLoadingRed, setIsLoadingRed] = useState(false);
  const [isLoadingBlue, setIsLoadingBlue] = useState(false);
  const [redCornerFighter, setRedCornerFighter] = useState("");
  const [blueCornerFighter, setBlueCornerFighter] = useState("");

  console.log(
    "PROPS ",
    props.id,
    props.redCornerFighter,
    props.blueCornerFighter,
    props.redCornerOdds
  );

  useEffect(() => {
    setIsLoadingRed(true);
    axios({
      method: "GET",
      url: "api/fighter/fight?id=" + props.redCornerFighter,
    })
      .then((response) => {
        console.log(response);
        let fighter = response.data[0];
        setRedCornerFighter(fighter);
        setIsLoadingRed(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setIsLoadingBlue(true);
    axios({
      method: "GET",
      url: "api/fighter/fight?id=" + props.blueCornerFighter,
    })
      .then((response) => {
        console.log(response);
        let fighter = response.data[0];
        setBlueCornerFighter(fighter);
        setIsLoadingBlue(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const istina = true;
  if (istina) {
    console.log("idemo gas");
  }

  return (
    <div>
      {isLoadingRed || isLoadingBlue ? (
        <div>Loading...</div>
      ) : (
        <div>
          {redCornerFighter.name} {redCornerFighter.surname} vs{" "}
          {blueCornerFighter.name} {blueCornerFighter.surname}
        </div>
      )}
    </div>
  );
}

export default FightForEvent;
