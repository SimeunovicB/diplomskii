import classes from "./FighterItem.module.css";
import Card from "../ui/Card";

function FighterItem(props) {
  
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h3>{props.name}</h3>
        </div>
      </Card>
    </li>
  );
}

export default FighterItem;
