import classes from "./FighterItem.module.css";
import Card from "../ui/Card";

function FighterItem(props) {
  console.log(props);

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.content}>
          <h3>
            {props.name} {props.surname}
          </h3>
          <img
            src={props.image}
            alt="slika borca"
            height="200"
            width="200"
          ></img>
          <div className={classes.atribute}>
            <div className={classes.first}><b>Record</b></div>
            <div className={classes.second}>
              {props.wins}:{props.losses}
            </div>
          </div>
          <div className={classes.atribute}>
            <div className={classes.first}><b>Age</b></div>
            <div className={classes.second}>
              {props.age}y
            </div>
          </div>
          <div className={classes.atribute}>
            <div className={classes.first}><b>Height</b></div>
            <div className={classes.second}>
              {props.height}cm
            </div>
          </div>
          <div className={classes.atribute}>
            <div className={classes.first}><b>Weight</b></div>
            <div className={classes.second}>
              {props.weight}kg
            </div>
          </div>
        </div>
      </Card>
    </li>
  );
}

export default FighterItem;
