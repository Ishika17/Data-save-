import {useRef} from 'react';
import Input from "./Input"
import Modal from "./Modal"
export default function NewProject({onAdd}) {
    const modal = useRef();
    const title = useRef();
    const description = useRef();
    const dueDate = useRef();
    // isme data save ho rha he

    function handleSave() {
        const enteredTitle = title.current.value;
        const enteredDescription = description.current.value;
        const enterdDueDate = dueDate.current.value;
        // validations
     if(enteredTitle.trim() === '' ||
      enteredDescription.trim() === ''||
    enterdDueDate.trim() === '') {
       //show the error model 
       modal.current.open();
       return;
    }

    onAdd({
    title : enteredTitle,
    description : enteredDescription,
    dueDate : enterdDueDate
        });
    }
    return (
        <>
        <Modal ref={modal} buttonCaption = "Okay"> 
            <h2>Invalid Input</h2>
            <p>Oops... lloks like you forget to enter a value.</p>
            <p>Please make sure you provide a valid value for every input field.</p>
        </Modal>
        <div className="w-[35rem] mt-16">
            <menu className="flex items-center justify-end gap-4 my-4">
                <li>
                    <button className="text-stone-800 hover:text-stone-950">Cancel</button>
                    </li>
                <li>
                    <button className=" px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950" onClick={handleSave}>Save</button>
                    </li>
            </menu>
            <div>
              <Input type = "text" ref={title} label = "Title" />
              <Input ref={description} label = "Description" textarea />
              <Input  type = "date"ref={dueDate} label = "Due Date" />

            </div>
        </div>
        </>
    )
}