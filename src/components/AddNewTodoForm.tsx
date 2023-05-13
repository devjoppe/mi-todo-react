import {useState} from "react";
import React from "react";
import uniqid from "uniqid";

interface IProp {
    newPost: (data:object) => void
}
const AddNewTodoForm:React.FC<IProp> = ({newPost}) => {

    const todoOptions = ['Personal', 'Work']

    const [todoInput, setTodoInput] = useState('')
    const [todoType, setTodoType] = useState(todoOptions[0])

    // Save new input data
    const saveTodo = (data:string, type:string) => {
        console.log(data)
        const newId = uniqid()
        const newTodo = {
            id: newId,
            todo: data,
            completed: false,
            userId: uniqid(),
            type: type
        }
        newPost(newTodo)
        // Use newPost(data) -> To send it to App
    }

    return(
        <div className="row mt-5">
            <form onSubmit={(e: React.FormEvent) => {
                e.preventDefault();
                saveTodo(todoInput, todoType)
                setTodoInput('')
                setTodoType(todoOptions[0])
            }}>
                <div className="input-group mb-3">
                    <input aria-describedby="button-addon2" className="form-control" type="text" value={todoInput} onChange={e => setTodoInput(e.target.value)} required/>
                    <select value={todoType} onChange={e => setTodoType(e.target.value)}>
                        {todoOptions.map(item => (
                            <option value={item} key={item}>{item}</option>
                        ))}
                    </select>
                    <button id="button-addon2" className="btn btn-outline-secondary" type="submit" disabled={todoInput.length < 1}>Create todo</button>
                </div>
            </form>
        </div>
    )
}

export default AddNewTodoForm