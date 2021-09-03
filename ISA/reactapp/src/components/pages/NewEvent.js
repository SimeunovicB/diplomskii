import { useHistory } from "react-router-dom";
import NewEventForm from "../events/NewEventForm";
import axios from "axios";
import Card from "../ui/Card";
import { useState, useEffect } from 'react';
import classes from "./NewEvent.module.css";

function NewEvent() {
  const history = useHistory();

  const [userId, setUserId] = useState();

  useEffect(() => {
    (async () => {
      const response = await fetch("http://127.0.0.1:8000/api/user", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const content = await response.json();
      setUserId(content.id);
    })();
  }, []);

  function addEventHandler(eventData) {
    axios({
      method: "post",
      url: "events/?userId=" + userId,
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
