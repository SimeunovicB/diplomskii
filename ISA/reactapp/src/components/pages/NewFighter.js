import { useHistory } from "react-router-dom";
import NewFighterForm from "../fighters/NewFighterForm";
import axios from 'axios';

function NewFighter() {
  const history = useHistory();
  function addFighterHandler(fighterData) {
    axios({
      method: "post",
      url: "fighters/",
      data: {
        name: fighterData.name
      }
    }).then((response) => {
      console.log("namee", fighterData.name);
      console.log(response);
      console.log(response.data)
      history.replace('/all-fighters');
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
