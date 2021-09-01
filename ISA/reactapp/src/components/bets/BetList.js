import BetItem from "./BetItem";
import classes from "./BetList.module.css";
import Card from "../ui/Card";

function BetList(props) {
  console.log("UPCOMING BETS BET LIST ", props.upcomingBets);
  console.log("SUCCESSFUL BETS BET LIST ", props.successfulBets);
  console.log("FAILED BETS BET LIST ", props.failedBets);
  // console.log("ALL BETS U BET LIST ", props.loadedBets);

  if (props.isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    // <div>Pakao se pravi</div>
    <div>
      {props.upcomingBets.length !== 0 ? (
        <div>
          <Card>
            <div className={classes.pending}>
              <h1>Upcoming bets</h1>
              <ul className={classes.list}>
                {props.upcomingBets.map((bet) => (
                  <BetItem
                    key={bet.id}
                    id={bet.id}
                    fight={bet.fight}
                    predicted_winner={bet.predicted_winner}
                    stake={bet.stake}
                    success={bet.success}
                  />
                ))}
              </ul>
            </div>
          </Card>
        </div>
      ) : (
        <div></div>
      )}

      {props.successfulBets.length !== 0 ? (
        <div>
          <Card>
            <div className={classes.success}>
              <h1>Successful bets</h1>
              <ul className={classes.list}>
                {props.successfulBets.map((bet) => (
                  <BetItem
                    key={bet.id}
                    id={bet.id}
                    fight={bet.fight}
                    predicted_winner={bet.predicted_winner}
                    stake={bet.stake}
                    success={bet.success}
                  />
                ))}
              </ul>
            </div>
          </Card>
        </div>
      ) : (
        <div></div>
      )}

      {props.failedBets.length !== 0 ? (
        <div>
          <Card>
            <div className={classes.failure}>
              <h1>Failed bets</h1>
              <ul className={classes.list}>
                {props.failedBets.map((bet) => (
                  <BetItem
                    key={bet.id}
                    id={bet.id}
                    fight={bet.fight}
                    predicted_winner={bet.predicted_winner}
                    stake={bet.stake}
                    success={bet.success}
                  />
                ))}
              </ul>
            </div>
          </Card>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
export default BetList;
