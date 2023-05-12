import {apiTodos, todoItem} from "../interface/todoInterface.tsx";
import React from "react";

// This one is very important when I want to use props between components.
interface TodoItemProp {
    todoItem: apiTodos
    onClick: (data:todoItem) => void
    onDelete: (data:todoItem) => void
}
const TodoItem:React.FC<TodoItemProp> = ({todoItem, onClick, onDelete}) => {

    console.log("TODO ITEM: ", todoItem)

    return(
        <div className="row align-items-start">
            <div className="col">
                {!todoItem.completed ? 'Ongoing' : 'Completed'}
            </div>
            <div className="col">
                {todoItem.todo}
            </div>
            <div className="col">
                {todoItem.completed ? <button disabled>Task completed</button> :
                <button onClick={() => onClick(todoItem)}>Complete task</button>
                }
                <button onClick={() => onDelete(todoItem)}>Delete</button>
            </div>
        </div>
    )
}

export default TodoItem