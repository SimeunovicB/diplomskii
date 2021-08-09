import classes from "./PastEventAndFightList.module.css";
import PastEventAndFightItem from "./PastEventAndFightItem";

function PastEventAndFightList(props) {

  console.log("Events U Event LIST", props.events);

  return (
    <ul className={classes.list}>
      {props.events.map((event) => (
        <PastEventAndFightItem
          key={event.id}
          id={event.id}
          name={event.name}
          fights={event.fight_set}
        />
      ))}
    </ul>
  );
}
export default PastEventAndFightList;