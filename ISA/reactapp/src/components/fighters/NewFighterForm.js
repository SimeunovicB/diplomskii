import Card from "../ui/Card";
import classes from './NewFighterForm.module.css'
import {useRef} from 'react';

function NewFighterForm(props) {

    const nameInputRef = useRef();

    function submitHandler(event) {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;

        const fighterData = {
            name: enteredName,
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
            <div className={classes.actions}>
                <button>Add Fighter</button>
            </div>
        </form>
    </Card>
}
export default NewFighterForm;