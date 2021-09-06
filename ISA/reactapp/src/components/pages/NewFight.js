import NewFightForm from "../fights/NewFightForm";
import axios from 'axios';
import classes from "./NewFight.module.css"
import { useState, useEffect } from 'react';


function NewFight(props) {

  console.log("PROPS")
  console.log("NEW FIGHT KONACNO", props.eventId);


  const [userId, setUserId] = useState();

  useEffect(() => {
    (async () => {
      const response = await fetch("http://127.0.0.1:8000/api/user", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const content = await response.json();
      setUserId(content.id);
    })();
  }, []);


  function addFightHandler(fightData) {
    console.log("redCornerFighter ", fightData.redCornerFighter);
    console.log("blueCornerFighter ", fightData.blueCornerFighter);
    axios({
      method: "post",
      url: "fights/?userId=" + userId,
      data: {
        redCornerFighter: fightData.redCornerFighter,
        blueCornerFighter: fightData.blueCornerFighter,
        redCornerOdds: fightData.redCornerOdds,
        eventId: props.eventId
      }
    }).then((response) => {
      console.log("RESPONSE")
      console.log(response);
      console.log(response.data)
      console.log(response.status);
      if(response.status === 201) {
        console.log("JESTE 201");
        console.log(fightData);
        axios({
          method: "put",
          url: "api/fighter/schedule",
          data: {
            redCornerFighter: fightData.redCornerFighter,
            blueCornerFighter: fightData.blueCornerFighter
          },
        })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      props.addFightDone(props.eventId, props.eventName);
    });
  }


  const goBackToEventsHandler = () => {
    console.log("Drugi")
    props.goBackToEvents();
  }


  return (
    <section className={classes.content}>
      <h1>Add new fight</h1>
      <NewFightForm onAddFight={addFightHandler} goBackToEvents={goBackToEventsHandler}/>
    </section>
  );
}

export default NewFight;
