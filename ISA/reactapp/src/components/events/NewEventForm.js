import Card from "../ui/Card";
import classes from './NewEventForm.module.css'
import {useRef} from 'react';

function NewEventForm(props) {

    const nameInputRef = useRef();

    function submitHandler(event) {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;

        const eventData = {
            name: enteredName,
        };

        console.log(eventData);
        props.onAddEvent(eventData);
    }
    return <Card>
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.control}>
                <label htmlFor="name">Event Name</label>
                <input type="text" required id="title" ref={nameInputRef}/>
            </div>
            <div className={classes.actions}>
                <button>Add Event</button>
            </div>
        </form>
    </Card>
}
export default NewEventForm;