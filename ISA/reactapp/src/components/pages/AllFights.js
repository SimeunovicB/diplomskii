import { useState, useEffect } from "react";
import axios from 'axios';
import FightList from "../fights/FightList";

function AllFights() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedFights, setLoadedFights] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    axios({
      method: "get",
      url: "fights",
    }).then((response) => {
      let fights = response.data;
      let ret = [];
      console.log("FAJTOVI", fights)
      for(let i in fights) {
        // console.log(fighters[i]);
        ret.push(fights[i]);
      }
      console.log("RET", ret);
      if(fights === ret) {
        console.log("ISTO");
      } else {
        console.log("NIJE ISTO")
      }
      setIsLoading(false);
      setLoadedFights(ret);
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
      <h1>All fights</h1>
      <FightList fights={loadedFights} />
    </div>
  );
}

export default AllFights;
