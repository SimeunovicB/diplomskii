import FightItem from "./FightItem";
import classes from "./FightList.module.css";

function FightList(props) {

  console.log("FAJTERI U FIGHTER LIST", props.fights);

  return (
    <ul className={classes.list}>
      {props.fights.map((fight) => (
        <FightItem
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
export default FightList;
