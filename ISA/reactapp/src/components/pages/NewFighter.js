import { useHistory } from "react-router-dom";
import NewFighterForm from "../fighters/NewFighterForm";
// import axios from "axios";

function NewFighter() {
  const history = useHistory();
  function addFighterHandler(fighterData) {
    console.log("ispis fighterDataaaa", fighterData);
    for (var key of fighterData.entries()) {
      console.log(key[0] + ', ' + key[1]);
  }
    console.log("ispis image", fighterData.image);

    fetch("http://127.0.0.1:8000/fighters/", {
      method: "POST",
      body: fighterData
    })
      .then((response) => {
        console.log(response);
        console.log(response.data);
        history.replace('/all-fighters');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <section>
      <h1>Add new fighter</h1>
      <NewFighterForm onAddFighter={addFighterHandler} />
    </section>
  );
}

export default NewFighter;
