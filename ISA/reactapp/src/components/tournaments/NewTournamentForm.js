import Card from "../ui/Card";
import classes from './NewTournamentForm.module.css'
import {useRef} from 'react';

function NewTournamentForm(props) {

    const nameInputRef = useRef();

    function submitHandler(event) {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;

        const tournamentData = {
            name: enteredName,
        };

        console.log(tournamentData);
        props.onAddTournament(tournamentData);
    }
    return <Card>
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor="name">Tournament Name</label>
                <input type="text" required id="title" ref={nameInputRef}/>
            </div>
            <div className={classes.actions}>
                <button>Add Tournament</button>
            </div>
        </form>
    </Card>
}
export default NewTournamentForm;