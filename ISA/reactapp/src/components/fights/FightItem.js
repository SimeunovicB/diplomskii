import classes from "./FightItem.module.css";
import Card from "../ui/Card";

function FightItem(props) {
  
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h3>{props.method}</h3>
        </div>
      </Card>
    </li>
  );
}

export default FightItem;
