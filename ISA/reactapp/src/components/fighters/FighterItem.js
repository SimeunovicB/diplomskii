import classes from "./FighterItem.module.css";
import Card from "../ui/Card";

function FighterItem(props) {
  
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h3>{props.name} {props.surname}</h3>
          <img src={props.image} alt="slika borca" height="200" width="200"></img>
        </div>
      </Card>
    </li>
  );
}

export default FighterItem;
