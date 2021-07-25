import Card from "../ui/Card";
import classes from "./NewFightForm.module.css";
import { useRef } from "react";
import Select from "react-select";
import { useState, useEffect } from "react";
import axios from "axios";

function NewFightForm(props) {

  const redOddsInputRef = useRef();
  const blueOddsInputRef = useRef();

  const [loadedFighters, setLoadedFighters] = useState([]);
  const [selectedOptionRed, setSelectedOptionRed] = useState(null);
  const [selectedOptionBlue, setSelectedOptionBlue] = useState(null);

  function redOddsBlur() {
    console.log("ide gas")
    console.log(redOddsInputRef.current.value);
    if(redOddsInputRef.current.value > 100) {
      redOddsInputRef.current.value = 100;
    }
    blueOddsInputRef.current.value = 100 - redOddsInputRef.current.value;
  }

  function blueOddsBlur() {
    if(blueOddsInputRef.current.value > 100) {
      blueOddsInputRef.current.value = 100;
    }
    redOddsInputRef.current.value = 100 - blueOddsInputRef.current.value;
  }
  

  useEffect(() => {
    axios({
      method: "get",
      url: "api/unscheduled/fighters",
    }).then((response) => {
      let fighters = response.data;
      let ret = [];
      for (let i in fighters) {
        ret.push({ value: fighters[i].id, label: fighters[i].name });
      }
      setLoadedFighters(ret);
    });
  }, []);

  console.log("Loaded fighters", loadedFighters);

  function submitHandler(event) {
    event.preventDefault();
    const enteredOdds = redOddsInputRef.current.value;


    const fightData = {
      redCornerFighter: selectedOptionRed.value,
      blueCornerFighter: selectedOptionBlue.value,
      redCornerOdds: enteredOdds
    };

    console.log(fightData);
    props.onAddFight(fightData);
  }


  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="redCornerFighter">Red corner fighter</label>
          <Select
            defaultValue={selectedOptionRed}
            onChange={setSelectedOptionRed}
            options={loadedFighters}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="blueCornerFighter">Blue corner fighter</label>
          <Select
            defaultValue={selectedOptionBlue}
            onChange={setSelectedOptionBlue}
            options={loadedFighters}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="redOdds">Red corner fighter odds(%)</label>
          <input type="number" required id="redOdds" max="100" ref={redOddsInputRef} onBlur={redOddsBlur}/>
        </div>
        <div className={classes.control}>
          <label htmlFor="blueOdds">Blue corner fighter odds(%)</label>
          <input type="number" required id="blueOdds" max="100" ref={blueOddsInputRef} onBlur={blueOddsBlur}/>
        </div>
        <div className={classes.actions}>
          <button>Add Fight</button>
        </div>
      </form>
    </Card>
  );
}
export default NewFightForm;
