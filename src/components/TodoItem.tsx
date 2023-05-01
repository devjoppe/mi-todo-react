import {todoItem} from "../interface/todoInterface.tsx";

// This one is very important when I want to use props between components.
interface TodoItemProp {
    todoItem: todoItem
    onClick: (data:todoItem) => void
    onDelete: (data:todoItem) => void
}
const TodoItem = ({todoItem, onClick, onDelete}:TodoItemProp) => {

    return(
        <div className="row align-items-start">
            <div className="col">
                {!todoItem.state ? 'Ongoing' : 'Completed'}
            </div>
            <div className="col">
                {todoItem.body}
            </div>
            <div className="col">
                {todoItem.state ? <button disabled>Task completed</button> :
                <button onClick={() => onClick(todoItem)}>Complete task</button>
                }
                <button onClick={() => onDelete(todoItem)}>Delete</button>
            </div>
        </div>
    )
}

export default TodoItem