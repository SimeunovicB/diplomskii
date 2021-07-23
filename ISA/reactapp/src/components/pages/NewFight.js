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
        redCornerFighter: fightData.redCornerFighter,
        blueCornerFighter: fightData.blueCornerFighter,
        date: fightData.date,
      }
    }).then((response) => {
      console.log("RESPONSE")
      console.log(response);
      console.log(response.data)
      console.log(response.status);
      if(response.status === 201) {
        console.log("JESTE 201");
        console.log(fightData);
        axios({
          method: "put",
          url: "api/fighter/schedule",
          data: {
            redCornerFighter: fightData.redCornerFighter,
            blueCornerFighter: fightData.blueCornerFighter
          },
        })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
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
