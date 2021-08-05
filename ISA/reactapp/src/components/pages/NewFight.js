import NewFightForm from "../fights/NewFightForm";
import axios from 'axios';


function NewFight(props) {

  console.log("PROPS")
  console.log("NEW FIGHT KONACNO", props.eventId);


  function addFightHandler(fightData) {
    axios({
      method: "post",
      url: "fights/",
      data: {
        redCornerFighter: fightData.redCornerFighter,
        blueCornerFighter: fightData.blueCornerFighter,
        redCornerOdds: fightData.redCornerOdds,
        eventId: props.eventId
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
      props.addFightDone(props.eventId, props.eventName);
    });
  }


  const goBackToEventsHandler = () => {
    console.log("Drugi")
    props.goBackToEvents();
  }


  return (
    <section>
      <h1>Add new fight</h1>
      <NewFightForm onAddFight={addFightHandler} goBackToEvents={goBackToEventsHandler}/>
    </section>
  );
}

export default NewFight;
