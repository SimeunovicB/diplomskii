import { useState, useEffect } from "react";
import axios from "axios";
import PastEventAndFightList from "../eventAndFight/PastEventAndFightList";
import Card from "../ui/Card";
import classes  from "./PastEventsAndFights.module.css"

function PastEventsAndFights() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedEvents, setLoadedEvents] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    axios({
      method: "get",
      url: "api/events/past",
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

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <div>
      <Card>
        <div className={classes.header}>
        <h1>Past events</h1>
        </div>
        <PastEventAndFightList events={loadedEvents} />
        {/* <PastEventAndFightList events={loadedEvents} /> */}
      </Card>
    </div>
  );
}

export default PastEventsAndFights;
