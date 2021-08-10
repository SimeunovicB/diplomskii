// import BetItem from "./BetItem";
import classes from "./BetList.module.css";

function BetList(props) {

  console.log("UPCOMING BETS BET LIST ", props.upcomingBets);
  console.log("SUCCESSFUL BETS BET LIST ", props.successfulBets);
  console.log("FAILED BETS BET LIST ", props.failedBets);

  return (
      <div>Pakao se pravi</div>
    // <ul className={classes.list}>
    //   {props.fights.map((bet) => (
    //     <BetItem
    //       key={bet.id}
    //       id={bet.id}
    //       redCornerFighter={bet.redCornerFighter}
    //       blueCornerFighter={fight.blueCornerFighter}
    //       method={fight.method}
    //       date={fight.date}
    //     />
    //   ))}
    // </ul>
  );
}
export default BetList;
