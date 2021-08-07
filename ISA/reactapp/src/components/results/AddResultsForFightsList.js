// import FightItem from "./FightItem";
import classes from "./AddResultsForFightsList.module.css";
import { useLocation } from "react-router-dom";

function AddResultsForFightsList() {

    let location = useLocation();
    console.log(location);
    console.log(location.state.eventId);

//   console.log("FAJTERI U FIGHTER LIST", props.fights);

  return (
      <div>Ide gas</div>
    // <ul className={classes.list}>
    //   {props.fights.map((fight) => (
    //     <FightItem
    //       key={fight.id}
    //       id={fight.id}
    //       redCornerFighter={fight.redCornerFighter}
    //       blueCornerFighter={fight.blueCornerFighter}
    //       method={fight.method}
    //       date={fight.date}
    //     />
    //   ))}
    // </ul>
  );
}
export default AddResultsForFightsList;
