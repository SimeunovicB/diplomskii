import classes from "./EventItem.module.css";
import Card from "../ui/Card";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import NewFight from "../pages/NewFight";

function EventItem(props) {
  const history = useHistory();

  const addFight = () => {
    console.log("addFight");
    console.log(props.id, props.name);
    props.newFightSelectEvent(props.id);
    // history.push('/new-fight');
    // setAddFightForEvent(true);
    // history.push({
    //   pathname: "/new-fight",
    //   state: [{ name: "Dokle" }], // your data array of objects
    // });


  };

  const showFightsForEvent = () => {
    console.log("showFightsForEvent");
    props.showFightsSelectEvent(props.id);
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
