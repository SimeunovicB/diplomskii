import classes from "./PastEventAndFightItem.module.css";
import Card from "../ui/Card";
import axios from "axios";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function PastEventAndFightItem(props) {
  const [loadedFights, setLoadedFights] = useState([]);
  const [resultsAdded, setResultsAdded] = useState(true);

  const history = useHistory();

  useEffect(() => {
    axios({
      method: "get",
      url: "api/fights/event?eventId=" + props.id,
    }).then((response) => {
      let fights = response.data;
      let ret = [];
      console.log("FAJTOVI", fights);
      for (let i in fights) {
        ret.push(fights[i]);
        if (fights[i].winner_id === null) {
          console.log("pisi null");
          setResultsAdded(false);
        }
      }
      setLoadedFights(ret);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const viewFightsHandler = () => {
    console.log("view fights");
    history.push("/past-fight-list", { eventId: props.id, eventName: props.name });
  };

  const addResultsHandler = () => {
    console.log("addResultsHandler");
    history.push("/add-results-for-fights-list", { eventId: props.id, eventName: props.name });
  };

  const numberOfFights = loadedFights.length;
  console.log(numberOfFights);

  let buttons = null;
  if (numberOfFights > 0 && resultsAdded === false) {
    buttons = (
      <div>
        <button onClick={viewFightsHandler}>View fights</button>
        <button onClick={addResultsHandler}>Add results</button>
      </div>
    );
  } else if (numberOfFights > 0 && resultsAdded === true) {
    buttons = <button onClick={viewFightsHandler}>View fights</button>;
  } else if (numberOfFights === 0) {
    buttons = <div>No fights were held on this event.</div>;
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h3>{props.name}</h3>
          <div className={classes.actions}>{buttons}</div>
        </div>
      </Card>
    </li>
  );
}

export default PastEventAndFightItem;
