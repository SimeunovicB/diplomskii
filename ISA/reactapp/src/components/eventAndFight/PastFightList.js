// import PastFightItem from "./PastFightItem";
// import classes from "./FightList.module.css";

import { useLocation } from "react-router-dom";

    

function PastFightList(props) {

    const location = useLocation();
    console.log("LINK ", location.pathname);
    const eventIdArray = location.pathname.split("/");
    const eventId = eventIdArray[2];
    console.log(eventId);

  return (
      <div>Ide gas</div>
    // <ul className={classes.list}>
    //   {props.fights.map((fight) => (
    //     <PastFightItem
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
export default PastFightList;
