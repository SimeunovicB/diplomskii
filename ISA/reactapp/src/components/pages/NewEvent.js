import { useHistory } from "react-router-dom";
import NewEventForm from "../events/NewEventForm";
import axios from 'axios';

function NewEvent() {
  const history = useHistory();
  function addEventHandler(eventData) {
    axios({
      method: "post",
      url: "events/",
      data: {
        name: eventData.name,
        date: eventData.date,
        finishTime: eventData.finishTime
      }
    }).then((response) => {
      console.log("namee", eventData.name);
      console.log(response);
      console.log(response.data)
      history.replace('/all-events');
    });
  }

  return (
    <section>
      <h1>Add new event</h1>
      <NewEventForm onAddEvent={addEventHandler} />
    </section>
  );
}

export default NewEvent;
