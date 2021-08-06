import classes from "./PastEventAndFightItem.module.css";
import Card from "../ui/Card";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Route } from "react-router";

function PastEventAndFightItem(props) {
  const [loadedFights, setLoadedFights] = useState([]);
  const [event, setEvent] = useState([""]);
  const [resultsAdded, setResultsAdded] = useState(true);

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
          if(fights[i].winner_id === null) {
            console.log("pisi null")
            setResultsAdded(false);
          }
        }
        setLoadedFights(ret);
      });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


  // const variable = true;

  const numberOfFights = loadedFights.length;
  console.log(numberOfFights);

  let ret = null;
  if(numberOfFights > 0 && resultsAdded === false) {
    ret = <button>Add results</button>
  }
  // const ret = <button>Add results</button>;

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h3>{props.name}</h3>
          <div className={classes.actions}>
            <button>View fights</button>
            {ret}
            <div>
              {/* <Link to={{
                pathname: '/prezime',
                state: {
                  fromNotifications: true
                }
              }}>Ide gas</Link> */}
              <Link to="/prezime/5">Ide gas</Link>
            </div>
          </div>
        </div>
      </Card>
    </li>
  );
}

export default PastEventAndFightItem;
