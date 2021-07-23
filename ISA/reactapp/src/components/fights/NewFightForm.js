import Card from "../ui/Card";
import classes from './NewFightForm.module.css'
import {useRef} from 'react';

function NewFightForm(props) {

    const methodInputRef = useRef();

    function submitHandler(event) {
        event.preventDefault();
        const enteredMethod = methodInputRef.current.value;

        const fightData = {
            method: enteredMethod,
        };

        console.log(fightData);
        props.onAddFight(fightData);
    }
    return <Card>
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor="name">Fight Finish Method</label>
                <input type="text" required id="title" ref={methodInputRef}/>
            </div>
            <div className={classes.actions}>
                <button>Add Fight</button>
            </div>
        </form>
    </Card>
}
export default NewFightForm;