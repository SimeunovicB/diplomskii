import classes from "./EventItem.module.css";
import Card from "../ui/Card";

function EventItem(props) {

  const addFight = () => {
    console.log("addFight");
    console.log(props.id, props.name);
    props.newFightSelectEvent(props.id, props.name);
  };

  const showFightsForEvent = () => {
    console.log("showFightsForEvent");
    console.log(props.id, props.name);
    props.showFightsSelectEvent(props.id, props.name);
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h3>{props.name}</h3>
          <div className={classes.actions}>
            <button onClick={showFightsForEvent}>View fights on event</button>
            <button onClick={addFight}>Add Fight For Event</button>
            {/* <Link
              to={{
                pathname: "/new-fight",
                state: [{ name: "Dokle" }], // your data array of objects
              }}
            >New fight</Link> */}
          </div>
        </div>
      </Card>
    </li>
  );
}

export default EventItem;
