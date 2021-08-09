import classes from "./Prezime.module.css";

import { useLocation } from "react-router-dom";

const Prezime = (props) => {

    const location = useLocation();
    console.log("PROPS ", location.pathname);
    const numberOfFightsArray = location.pathname.split("/");
    const numberOfFights = numberOfFightsArray[2];
    console.log(numberOfFights);
  
    return <div className={classes.okvir}>
        <div className={classes.maj}>
            name: Silk Apartment<br/>
            password: 08061996i
        </div>
    </div>
}
export default Prezime;