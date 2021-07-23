import { useHistory } from "react-router-dom";
import NewFightForm from "../fights/NewFightForm";
import axios from 'axios';

function NewFight() {
  const history = useHistory();
  function addFightHandler(fightData) {
    axios({
      method: "post",
      url: "fights/",
      data: {
        method: fightData.method
      }
    }).then((response) => {
      console.log("namee", fightData.method);
      console.log(response);
      console.log(response.data)
      history.replace('/all-fights');
    });
  }

  return (
    <section>
      <h1>Add new fight</h1>
      <NewFightForm onAddFight={addFightHandler} />
    </section>
  );
}

export default NewFight;
