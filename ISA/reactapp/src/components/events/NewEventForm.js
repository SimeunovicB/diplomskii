import Card from "../ui/Card";
import classes from "./NewEventForm.module.css";
import { useRef } from "react";

function NewEventForm(props) {
  const nameInputRef = useRef();
  const dateInputRef = useRef();
  const timeInputRef = useRef();

  function submitHandler(event) {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredDate = dateInputRef.current.value;
    const enteredTime = timeInputRef.current.value;

    const eventData = {
      name: enteredName,
      date: enteredDate,
      finishTime: enteredTime,
    };

    console.log(eventData);
    props.onAddEvent(eventData);
  }
  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="name">Event Name</label>
          <input type="text" required id="title" ref={nameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="date">Event Date</label>
          <input type="date" required id="date" ref={dateInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="time">Event Finish Time</label>
          <input type="time" required id="time" ref={timeInputRef} />
        </div>
        <div className={classes.actions}>
          <button>Submit</button>
        </div>
      </form>
    </Card>
  );
}
export default NewEventForm;
