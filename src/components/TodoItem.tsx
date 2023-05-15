import {apiTodos} from "../interface/todoInterface.tsx";
import React from "react";

// This one is very important when I want to use props between components.
interface TodoItemProp {
    todoItem: apiTodos
    onClick: (data:apiTodos) => void
    onDelete: (data:apiTodos) => void
}
const TodoItem:React.FC<TodoItemProp> = ({todoItem, onClick, onDelete}) => {
    return(
        <div className="row align-items-start">
            <div className="col">
                {!todoItem.completed ? 'Ongoing' : 'Completed'}
            </div>
            <div className="col">
                {todoItem.todo}
            </div>
            <div className="col">
                {todoItem.type}
            </div>
            <div className="col">
                {todoItem.completed ? <button onClick={() => onClick(todoItem)}>Re-active task</button> :
                <button onClick={() => onClick(todoItem)}>Complete task</button>
                }
                <button onClick={() => onDelete(todoItem)}>Delete</button>
            </div>
        </div>
    )
}

export default TodoItem