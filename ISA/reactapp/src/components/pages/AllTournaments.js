import { useState, useEffect } from "react";
import axios from 'axios';
import TournamentList from "../tournaments/TournamentList";

function AllTournamentsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedTournaments, setLoadedTournaments] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    axios({
      method: "get",
      url: "tournaments/",
    }).then((response) => {
      let tournaments = response.data;
      let ret = [];
      console.log("Tournaments", tournaments)
      for(let i in tournaments) {
        // console.log(fighters[i]);
        ret.push(tournaments[i]);
      }
      console.log("RET", ret);
      if(tournaments === ret) {
        console.log("ISTO");
      } else {
        console.log("NIJE ISTO")
      }
      setIsLoading(false);
      setLoadedTournaments(ret);
      // console.log("LOADED",loadedFighters);
    });
  }, []); //ako se drugom argumentu promeni stanje onda se opet pozove funkcija

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  return (
    <div>
      <h1>All tournaments</h1>
      <TournamentList tournaments={loadedTournaments} />
    </div>
  );
}

export default AllTournamentsPage;
