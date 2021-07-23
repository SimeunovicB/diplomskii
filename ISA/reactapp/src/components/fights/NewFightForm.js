import Card from "../ui/Card";
import classes from "./NewFightForm.module.css";
import { useRef } from "react";
import Select from "react-select";
import { useState, useEffect } from "react";
import axios from "axios";

function NewFightForm(props) {
  const dateInputRef = useRef();

  const [loadedFighters, setLoadedFighters] = useState([]);
  const [selectedOptionRed, setSelectedOptionRed] = useState(null);
  const [selectedOptionBlue, setSelectedOptionBlue] = useState(null);

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
    const enteredDate = dateInputRef.current.value;



    const fightData = {
      redCornerFighter: selectedOptionRed.value,
      blueCornerFighter: selectedOptionBlue.value,
      date: enteredDate
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
          <label htmlFor="date">Fight Date</label>
          <input type="date" required id="date" ref={dateInputRef} />
        </div>
        <div className={classes.actions}>
          <button>Add Fight</button>
        </div>
      </form>
    </Card>
  );
}
export default NewFightForm;
