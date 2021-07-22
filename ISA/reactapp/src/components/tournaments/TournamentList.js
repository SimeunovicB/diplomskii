import TournamentItem from "./TournamentItem";
import classes from "./TournamentList.module.css";

function TournamentList(props) {

  console.log("Tournaments U Tournament LIST", props.tournaments);

  return (
    <ul className={classes.list}>
      {props.tournaments.map((tournament) => (
        <TournamentItem
          key={tournament.id}
          id={tournament.id}
          name={tournament.name}
        />
      ))}
    </ul>
  );
}
export default TournamentList;
