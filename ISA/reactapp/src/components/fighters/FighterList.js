import FighterItem from "./FighterItem";
import classes from "./FighterList.module.css";

function FighterList(props) {

  console.log("FAJTERI U FIGHTER LIST", props.fighters);

  return (
    <ul className={classes.list}>
      {props.fighters.map((fighter) => (
        <FighterItem
          key={fighter.id}
          id={fighter.id}
          name={fighter.name}
          surname={fighter.surname}
          image={fighter.image}
          wins={fighter.wins}
          losses={fighter.losses}
          age={fighter.age}
          height={fighter.height}
          weight={fighter.weight}
          reach={fighter.reach}
        />
      ))}
    </ul>
  );
}
export default FighterList;
