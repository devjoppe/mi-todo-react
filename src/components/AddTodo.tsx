import {useState} from "react";
import React from "react";

interface TodoItemProp {
    newPost: (data:string) => void
}
const AddTodo = ({newPost}:TodoItemProp) => {

    const [todoInput, setTodoInput] = useState('')
    // newPost(todoInput);
    return(
        <div className="row mt-5">
            <form onSubmit={(e: React.FormEvent) => {
                e.preventDefault();
                newPost(todoInput)
                setTodoInput('')
            }}>
                <div className="input-group mb-3">
                    <input aria-describedby="button-addon2" className="form-control" type="text" value={todoInput} onChange={e => setTodoInput(e.target.value)} required/>
                    <button id="button-addon2" className="btn btn-outline-secondary" type="submit">Create todo</button>
                </div>
            </form>
        </div>
    )
}

export default AddTodo