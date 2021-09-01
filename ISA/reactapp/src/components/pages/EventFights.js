import { useState, useEffect } from "react";
import axios from "axios";
import FightList from "../fights/FightList";
import classes from "./EventFights.module.css";

function EventFights(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedFights, setLoadedFights] = useState([]);
  const [numberOfFights, setNumberOfFights] = useState("");

  // useEffect(() => {
  //   setIsLoading(true);

  //   axios({
  //     method: "get",
  //     url: "fights",
  //   }).then((response) => {
  //     let fights = response.data;
  //     let ret = [];
  //     console.log("FAJTOVI", fights)
  //     for(let i in fights) {
  //       // console.log(fighters[i]);
  //       ret.push(fights[i]);
  //     }
  //     console.log("RET", ret);
  //     if(fights === ret) {
  //       console.log("ISTO");
  //     } else {
  //       console.log("NIJE ISTO")
  //     }
  //     setIsLoading(false);
  //     setLoadedFights(ret);
  //     // console.log("LOADED",loadedFighters);
  //   });
  // }, []); //ako se drugom argumentu promeni stanje onda se opet pozove funkcija

  console.log("EVENT FIGHTS", props.eventId);
  console.log(props.eventName);

  useEffect(() => {
    setIsLoading(true);

    axios({
      method: "get",
      url: "api/fights/event?eventId=" + props.eventId,
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

  const goBackToEventsAction = () => {
    props.goBackToEvents();
  };

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  } else if (numberOfFights === 0) {
    return (
      <section>
        <p>No scheduled fights for this event.</p>
        <div className={classes.actions}>
          <button onClick={goBackToEventsAction}>Back to events</button>
        </div>
      </section>
    );
  }

  return (
    <div>
      <div className={classes.header}>
        <h2>Fights for {props.eventName} event</h2>
      </div>
      <FightList fights={loadedFights} />
      <div className={classes.actions}>
        <button onClick={goBackToEventsAction}>Back to events</button>
      </div>
    </div>
  );
}

export default EventFights;
