import { useState, useEffect } from "react";
import axios from 'axios';
import EventList from "../events/EventList";

function AllEvents() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedEvents, setLoadedEvents] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    axios({
      method: "get",
      url: "events/",
    }).then((response) => {
      let events = response.data;
      let ret = [];
      console.log("Events", events)
      for(let i in events) {
        // console.log(fighters[i]);
        ret.push(events[i]);
      }
      console.log("RET", ret);
      if(events === ret) {
        console.log("ISTO");
      } else {
        console.log("NIJE ISTO")
      }
      setIsLoading(false);
      setLoadedEvents(ret);
      // console.log("LOADED",loadedFighters);
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
      <h1>All events</h1>
      <EventList events={loadedEvents} />
    </div>
  );
}

export default AllEvents;
