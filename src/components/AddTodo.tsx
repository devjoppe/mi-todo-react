import {useState} from "react";
import React from "react";

interface TodoItemProp {
    newPost: (data:string) => void
}
const AddTodo = ({newPost}:TodoItemProp) => {

    const [todoInput, setTodoInput] = useState('')
    // newPost(todoInput);
    return(
        <div className="row">
            <form onSubmit={(e: React.FormEvent) => {
                e.preventDefault();
                newPost(todoInput)
                setTodoInput('')
            }}>
                <input type="text" value={todoInput} onChange={e => setTodoInput(e.target.value)} required/>
                <button type="submit">Create todo</button>
            </form>
        </div>
    )
}

export default AddTodo