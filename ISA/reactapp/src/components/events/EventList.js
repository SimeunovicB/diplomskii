import EventItem from "./EventItem";
import classes from "./EventList.module.css";

import { useState } from "react";
import NewFight from "../pages/NewFight";
import AllFights from "../pages/AllFights";

function EventList(props) {
  const [addFightForEvent, setAddFightForEvent] = useState(false);
  const [viewFightsForEvent, setViewFightsForEvent] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState("");

  const newFightSelectEventHandler = (eventId) => {
    console.log("Id eventa je", eventId);
    setSelectedEventId(eventId);
    setAddFightForEvent(true);
  };

  const showFightsSelectEventHandler = (eventId) => {
    setSelectedEventId(eventId);
    setViewFightsForEvent(true);
  }

  const goBackToEventsFromNewFightHandler = () => {
    console.log("Dje ces");
    setAddFightForEvent(false);
  };

  const goBackToEventsFromAllFightsHandler = () => {
    setViewFightsForEvent(false);
  };

  return (
    <div>
      {addFightForEvent === false && viewFightsForEvent === false ? (
        <ul className={classes.list}>
          {props.events.map((event) => (
            <EventItem
              key={event.id}
              id={event.id}
              name={event.name}
              newFightSelectEvent={newFightSelectEventHandler}
              showFightsSelectEvent={showFightsSelectEventHandler}
            />
          ))}
        </ul>
      ) : addFightForEvent === true && viewFightsForEvent === false ? (
        <NewFight
          eventId={selectedEventId}
          goBackToEvents={goBackToEventsFromNewFightHandler}
        />
      ) : addFightForEvent === false && viewFightsForEvent === true ? (
        <AllFights
          eventId={selectedEventId}
          goBackToEvents={goBackToEventsFromAllFightsHandler}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
}
export default EventList;
