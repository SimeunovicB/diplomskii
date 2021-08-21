import { useState, useEffect } from "react";
import axios from "axios";
import EventAndFightList from "../eventAndFight/EventAndFightList";
import classes from "./UpcomingEventsAndFights.module.css";
import Card from "../ui/Card";
import { useLocation } from "react-router-dom";

function UpcomingEventsAndFights() {

  const location = useLocation();
  console.log("LOCATION IN UPCOMING EVENTS AND FIGHTS", location.state);
  
  const [isLoading, setIsLoading] = useState(false);
  const [loadedEvents, setLoadedEvents] = useState([]);
  
  const [errorMessage, setErrorMessage] = useState("");
  

  useEffect(() => {
  if(location.state) {
    setErrorHandler();
  }
},[])

  useEffect(() => {
    setIsLoading(true);

    axios({
      method: "get",
      // url: "api/events/upcoming",
      url: "events",
    }).then((response) => {
      let events = response.data;
      let ret = [];
      console.log("Events", events);
      for (let i in events) {
        ret.push(events[i]);
      }
      console.log("RET", ret);
      setIsLoading(false);
      setLoadedEvents(ret);
    });
  }, []); //ako se drugom argumentu promeni stanje onda se opet pozove funkcija

  function setErrorHandler() {
    setErrorMessage("Error occured while adding a bet!");
  }

  let validation = <div></div>;

  if (errorMessage !== "") {
    validation = <div className={classes.alert_danger}>{errorMessage}</div>;
  }

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <Card>
      <div className={classes.content}>
        {validation}
        <h1>Upcoming events</h1>
        <EventAndFightList events={loadedEvents} />
      </div>
    </Card>
  );
}

export default UpcomingEventsAndFights;
