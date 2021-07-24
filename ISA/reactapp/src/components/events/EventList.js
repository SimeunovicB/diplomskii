import EventItem from "./EventItem";
import classes from "./EventList.module.css";

function EventList(props) {

  console.log("Events U Event LIST", props.events);

  return (
    <ul className={classes.list}>
      {props.events.map((event) => (
        <EventItem
          key={event.id}
          id={event.id}
          name={event.name}
        />
      ))}
    </ul>
  );
}
export default EventList;
