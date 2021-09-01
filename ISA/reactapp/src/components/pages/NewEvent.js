import { useHistory } from "react-router-dom";
import NewEventForm from "../events/NewEventForm";
import axios from "axios";
import Card from "../ui/Card";
import classes from "./NewEvent.module.css";

function NewEvent() {
  const history = useHistory();
  function addEventHandler(eventData) {
    axios({
      method: "post",
      url: "events/",
      data: {
        name: eventData.name,
        date: eventData.date,
        finishTime: eventData.finishTime,
        fight_set: [],
      },
    }).then((response) => {
      console.log("namee", eventData.name);
      console.log(response);
      console.log(response.data);
      history.replace("/all-events");
    });
  }

  return (
    <section>
      <Card>
        <div className={classes.header}>
          <h1>Add new event</h1>
        </div>
        <NewEventForm onAddEvent={addEventHandler} />
      </Card>
    </section>
  );
}

export default NewEvent;
