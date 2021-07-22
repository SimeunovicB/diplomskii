import { useState, useEffect } from "react";
import axios from 'axios';
import FighterList from "../fighters/FighterList";

function AllFightersPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedFighters, setLoadedFighters] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    axios({
      method: "get",
      url: "fighters",
    }).then((response) => {
      let fighters = response.data;
      let ret = [];
      console.log("FAJTERI", fighters)
      for(let i in fighters) {
        // console.log(fighters[i]);
        ret.push(fighters[i]);
      }
      console.log("RET", ret);
      if(fighters === ret) {
        console.log("ISTO");
      } else {
        console.log("NIJE ISTO")
      }
      setIsLoading(false);
      setLoadedFighters(ret);
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
      <h1>All fighters</h1>
      <FighterList fighters={loadedFighters} />
    </div>
  );
}

export default AllFightersPage;
