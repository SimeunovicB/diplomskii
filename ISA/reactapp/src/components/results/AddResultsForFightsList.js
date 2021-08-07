// import FightItem from "./FightItem";
import AddResultsForFightsItem from "./AddResultsForFightsItem";
import classes from "./AddResultsForFightsList.module.css";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from "axios";

function AddResultsForFightsList() {

    let location = useLocation();
    console.log(location);
    console.log(location.state.eventId);

    const [fights, setFights] = useState([]);

    useEffect(() => {
      axios({
        method: 'get',
        url: 'api/fights/event?eventId=' + location.state.eventId
      }).then(response => {
        console.log(response);
        console.log(response.data);
        const fights = response.data;
        setFights(fights);
      }).catch(error => {
        console.log(error);
      })
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

//   console.log("FAJTERI U FIGHTER LIST", props.fights);

  return (
    <ul className={classes.list}>
      {fights.map((fight) => (
        <AddResultsForFightsItem
          key={fight.id}
          id={fight.id}
          redCornerFighter={fight.redCornerFighter}
          blueCornerFighter={fight.blueCornerFighter}
          method={fight.method}
          date={fight.date}
        />
      ))}
    </ul>
  );
}
export default AddResultsForFightsList;
