import { useHistory } from "react-router-dom";
import NewFighterForm from "../fighters/NewFighterForm";
import Card from "../ui/Card";
import { useState, useEffect } from 'react';
import classes from "./NewFighter.module.css"
// import axios from "axios";

function NewFighter() {
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

  function addFighterHandler(fighterData) {
    console.log("ispis fighterDataaaa", fighterData);
    for (var key of fighterData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }
    console.log("ispis image", fighterData.image);

    fetch("http://127.0.0.1:8000/fighters/?userId=" + userId, {
      method: "POST",
      body: fighterData,
    })
      .then((response) => {
        console.log(response);
        console.log(response.data);
        history.replace("/all-fighters");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <section>
      <Card>
        <div className={classes.new}>
          <h1>Add new fighter</h1>
        </div>
        <NewFighterForm onAddFighter={addFighterHandler} />
      </Card>
    </section>
  );
}

export default NewFighter;
