import Card from "../ui/Card";
import classes from "./NewFighterForm.module.css";
import { useRef, useState } from "react";
// import ImageUpload from "./ImageUploadNeRadi";
import ImageUpload from "./ImageUpload";

function NewFighterForm(props) {
  const nameInputRef = useRef();
  const surnameInputRef = useRef();
  const winsInputRef = useRef();
  const lossesInputRef = useRef();
  const ageInputRef = useRef();
  const heightInputRef = useRef();
  const weightInputRef = useRef();
  const reachInputRef = useRef();

  const [image, setImage] = useState("");

  function addImageHandler(file) {
    console.log("ide gasolina");
    console.log(file);
    setImage(file);
  }

  function submitHandler(event) {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredSurname = surnameInputRef.current.value;
    const enteredWins = winsInputRef.current.value;
    const enteredLosses = lossesInputRef.current.value;
    const enteredAge = ageInputRef.current.value;
    const enteredHeight = heightInputRef.current.value;
    const enteredWeight = weightInputRef.current.value;
    const enteredReach = reachInputRef.current.value;

    // const fighterData = {
    //   name: enteredName,
    //   surname: enteredSurname,
    //   // image: (image,image.name),
    //   wins: enteredWins,
    //   losses: enteredLosses,
    //   age: enteredAge,
    //   height: enteredHeight,
    //   weight: enteredWeight,
    //   reach: enteredReach,
    //   image: image,
    // };

    // const fighterData = new FormData();

    // fighterData.append('image', image, image.name);
    // fighterData.append('image', image);

    // const fighterData = {
    //   'image': (image,image.name)
    // }

    // console.log("fighterData", fighterData);
    // console.log("image",image);

    // props.onAddFighter(fighterData);

    console.log("jel radi ");
    const uploadData = new FormData();
    uploadData.append("name", enteredName);
    uploadData.append("surname", enteredSurname);
    uploadData.append("image", image);
    uploadData.append("wins", enteredWins);
    uploadData.append("losses", enteredLosses);
    uploadData.append("age", enteredAge);
    uploadData.append("height", enteredHeight);
    uploadData.append("weight", enteredWeight);
    uploadData.append("reach", enteredReach);
    for (var key of uploadData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }

    props.onAddFighter(uploadData);
  }

  return (
    <Card>
      {/* <form
        className={classes.form}
        onSubmit={submitHandler}
        encType="multipart/form-data"
      > */}
      <div className={classes.form}>
        <div className={classes.control}>
          <label htmlFor="name">Name</label>
          <input type="text" required id="title" ref={nameInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="surname">Surname</label>
          <input type="text" required id="surname" ref={surnameInputRef} />
        </div>
        {/* <div className={classes.control}>
          <label htmlFor="img">Fighter Image</label>
          <input type="file" id="img" name="img" accept="image/*"></input>
        </div> */}
        <div className={classes.control}>
          <label htmlFor="img">Image</label>
          <ImageUpload onAddImage={addImageHandler} />
        </div>
        <div className={classes.control}>
          <label htmlFor="wins">Wins</label>
          <input type="number" required id="wins" ref={winsInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="losses">Losses</label>
          <input type="number" required id="losses" ref={lossesInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="age">Age</label>
          <input type="number" required id="age" ref={ageInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="height">Height(cm)</label>
          <input type="number" required id="height" ref={heightInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="weight">Weight(kg)</label>
          <input type="number" required id="weight" ref={weightInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="reach">Reach(cm)</label>
          <input type="number" required id="reach" ref={reachInputRef} />
        </div>
        <div className={classes.actions}>
          <button onClick={submitHandler}>Submit</button>
        </div>
        {/* </form> */}
      </div>
    </Card>
  );
}
export default NewFighterForm;
