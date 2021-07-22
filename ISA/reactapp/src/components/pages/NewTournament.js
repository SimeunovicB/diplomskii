import { useHistory } from "react-router-dom";
import NewTournamentForm from "../tournaments/NewTournamentForm";
import axios from 'axios';

function NewTournament() {
  const history = useHistory();
  function addTournamentHandler(tournamentData) {
    axios({
      method: "post",
      url: "tournaments/",
      data: {
        name: tournamentData.name
      }
    }).then((response) => {
      console.log("namee", tournamentData.name);
      console.log(response);
      console.log(response.data)
      history.replace('/all-tournaments');
    });
  }

  return (
    <section>
      <h1>Add new tournament</h1>
      <NewTournamentForm onAddTournament={addTournamentHandler} />
    </section>
  );
}

export default NewTournament;
