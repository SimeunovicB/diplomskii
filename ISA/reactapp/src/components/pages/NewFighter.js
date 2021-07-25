import { useHistory } from "react-router-dom";
import NewFighterForm from "../fighters/NewFighterForm";
import axios from 'axios';

function NewFighter() {
  const history = useHistory();
  function addFighterHandler(fighterData) {
    console.log("ispis unosa", fighterData);
    axios({
      method: "post",
      url: "fighters/",
      data: {
        name: fighterData.name,
        surname: fighterData.surname,
        wins: fighterData.wins,
        losses: fighterData.losses,
        age: fighterData.age,
        height: fighterData.height,
        weight: fighterData.weight,
        reach: fighterData.reach
        // scheduledFight: fighterData.scheduledFight
      }
    }).then((response) => {
      console.log("namee", fighterData.name);
      console.log(response);
      console.log(response.data)
      history.replace('/all-fighters');
    })
    .catch(error => {
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
