import Card from "../ui/Card";
import classes from './NewFighterForm.module.css'
import {useRef} from 'react';

function NewFighterForm(props) {

    const nameInputRef = useRef();
    const surnameInputRef = useRef();
    const winsInputRef = useRef();
    const lossesInputRef = useRef();
    const ageInputRef = useRef();
    const heightInputRef = useRef();
    const weightInputRef = useRef();
    const reachInputRef = useRef();

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

        const fighterData = {
            name: enteredName,
            surname: enteredSurname,
            wins: enteredWins,
            losses: enteredLosses,
            age: enteredAge,
            height: enteredHeight,
            weight: enteredWeight,
            reach: enteredReach
        };

        console.log(fighterData);
        props.onAddFighter(fighterData);
    }
    return <Card>
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor="name">Fighter Name</label>
                <input type="text" required id="title" ref={nameInputRef}/>
            </div>
            <div className={classes.control}>
                <label htmlFor="surname">Fighter Surname</label>
                <input type="text" required id="surname" ref={surnameInputRef}/>
            </div>
            <div className={classes.control}>
                <label htmlFor="wins">Fighter Wins</label>
                <input type="number" required id="wins" ref={winsInputRef}/>
            </div>
            <div className={classes.control}>
                <label htmlFor="losses">Fighter Losses</label>
                <input type="number" required id="losses" ref={lossesInputRef}/>
            </div>
            <div className={classes.control}>
                <label htmlFor="age">Fighter Age</label>
                <input type="number" required id="age" ref={ageInputRef}/>
            </div>
            <div className={classes.control}>
                <label htmlFor="height">Fighter Height(cm)</label>
                <input type="number" required id="height" ref={heightInputRef}/>
            </div>
            <div className={classes.control}>
                <label htmlFor="weight">Fighter Weight(kg)</label>
                <input type="number" required id="weight" ref={weightInputRef}/>
            </div>
            <div className={classes.control}>
                <label htmlFor="reach">Fighter Reach(cm)</label>
                <input type="number" required id="reach" ref={reachInputRef}/>
            </div>
            <div className={classes.actions}>
                <button>Add Fighter</button>
            </div>
        </form>
    </Card>
}
export default NewFighterForm;