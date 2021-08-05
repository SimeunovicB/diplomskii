import EventAndFightItem from "./EventAndFightItem";
import classes from "./EventAndFightList.module.css";

function EventAndFightList(props) {

  console.log("Events U Event LIST", props.events);

  return (
    <ul className={classes.list}>
      {props.events.map((event) => (
        <EventAndFightItem
          key={event.id}
          id={event.id}
          name={event.name}
        />
      ))}
    </ul>
  );
}
export default EventAndFightList;