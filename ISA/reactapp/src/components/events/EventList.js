import EventItem from "./EventItem";
import classes from "./EventList.module.css";

import { useState } from "react";
import NewFight from "../pages/NewFight";
import EventFights from "../pages/EventFights";

function EventList(props) {
  const [addFightForEvent, setAddFightForEvent] = useState(false);
  const [viewFightsForEvent, setViewFightsForEvent] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [selectedEventName, setSelectedEventName] = useState("");

  const newFightSelectEventHandler = (eventId, eventName) => {
    console.log("Id eventa je", eventId);
    setSelectedEventId(eventId);
    setSelectedEventName(eventName);
    setAddFightForEvent(true);
  };

  const showFightsSelectEventHandler = (eventId, eventName) => {
    setSelectedEventId(eventId);
    setSelectedEventName(eventName);
    setViewFightsForEvent(true);
  }

  const goBackToEventsFromNewFightHandler = () => {
    console.log("Dje ces");
    setAddFightForEvent(false);
  };

  const goBackToEventsFromEventFightsHandler = () => {
    setViewFightsForEvent(false);
  };

  const addFightDoneHandler = (eventId) => {
    setAddFightForEvent(false);
    showFightsSelectEventHandler(eventId);
  }

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
          eventName={selectedEventName}
          goBackToEvents={goBackToEventsFromNewFightHandler}
          addFightDone={addFightDoneHandler}
        />
      ) : addFightForEvent === false && viewFightsForEvent === true ? (
        <EventFights
          eventId={selectedEventId}
          eventName={selectedEventName}
          goBackToEvents={goBackToEventsFromEventFightsHandler}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
}
export default EventList;
