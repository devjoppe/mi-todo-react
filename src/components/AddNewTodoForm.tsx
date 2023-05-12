import {useState} from "react";
import React from "react";
import uniqid from "uniqid";

interface IProp {
    newPost: (data:object) => void
}
const AddNewTodoForm:React.FC<IProp> = ({newPost}) => {

    const [todoInput, setTodoInput] = useState('')

    // Save new input data
    const saveTodo = (data:string) => {
        const newId = uniqid()
        const newTodo = {
            id: newId,
            todo: data,
            completed: false,
            userId: uniqid()
        }
        newPost(newTodo)
        // Use newPost(data) -> To send it to App
    }

    return(
        <div className="row mt-5">
            <form onSubmit={(e: React.FormEvent) => {
                e.preventDefault();
                saveTodo(todoInput)
                setTodoInput('')
            }}>
                <div className="input-group mb-3">
                    <input aria-describedby="button-addon2" className="form-control" type="text" value={todoInput} onChange={e => setTodoInput(e.target.value)} required/>
                    <button id="button-addon2" className="btn btn-outline-secondary" type="submit" disabled={todoInput.length < 1}>Create todo</button>
                </div>
            </form>
        </div>
    )
}

export default AddNewTodoForm