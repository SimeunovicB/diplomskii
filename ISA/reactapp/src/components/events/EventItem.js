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
  };

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h3>{props.name}</h3>
          <div className={classes.actions}>
            <div className={classes.father}>
              <div className={classes.first}>
                <button onClick={showFightsForEvent}>
                  View fights
                </button>
              </div>
              <div className={classes.second}>
                <button onClick={addFight}>Add Fights</button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </li>
  );
}

export default EventItem;
