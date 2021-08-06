import classes from "./PastEventAndFightItem.module.css";
import Card from "../ui/Card";
import axios from "axios";
import { useState, useEffect } from "react";

function PastEventAndFightItem(props) {
  const [loadedFights, setLoadedFights] = useState([]);

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
        }
        setLoadedFights(ret);
      });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps


  const variable = true;

  const ret = <button>Add results</button>;

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h3>{props.name}</h3>
          <div className={classes.actions}>
            <button>View fights</button>
            {variable ? ret : <div></div>}
          </div>
        </div>
      </Card>
    </li>
  );
}

export default PastEventAndFightItem;
