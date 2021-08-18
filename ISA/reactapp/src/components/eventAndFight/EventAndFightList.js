import EventAndFightItem from "./EventAndFightItem";
import classes from "./EventAndFightList.module.css";
import {useState,useEffect} from 'react';

function EventAndFightList(props) {

  console.log("Events U Event LIST", props.events);

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await fetch("http://127.0.0.1:8000/api/user", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const content = await response.json();
      console.log("IDE CONTENT", content);
      setUserId(content.id);
    })();
  }, []);

  return (
    <ul className={classes.list}>
      {props.events.map((event) => (
        <EventAndFightItem
          key={event.id}
          id={event.id}
          name={event.name}
          fights={event.fight_set}
          userId={userId}
        />
      ))}
    </ul>
  );
}
export default EventAndFightList;