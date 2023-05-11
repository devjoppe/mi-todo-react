import React, {useEffect, useState} from "react";
import TodoItem from "./TodoItem.tsx";
import {todoItem} from "../interface/todoInterface.tsx";

interface IProp {
    title: string,
    todoList: todoItem[]
    updateList: (object:todoItem[]) => void
}

const TodoList: React.FC<IProp> = ({title, todoList, updateList}) => {

    console.log("FROM COMPONENT: ", todoList)

    const [completedTodos, setCompletedTodos] = useState(0)

    useEffect(() => {
        const checkCompleted = todoList.filter(todo => todo.state === true)
        setCompletedTodos(checkCompleted.length)
    }, [todoList])

    const handleState = (item:todoItem) => {
        // Map over the Array, check if the ID, if Yes then use the item and set the state to true.
        const updateTodo = todoList.map((todo) => todo.id === item.id ? {...todo, state: true} : todo )

        updateList(updateTodo)
    }

    const handleDelete = (item:todoItem) => {
        // Filter through the array and if the ID dont match, do not set it in the list.
        const listDeletedItem = (todoList.filter(todo => todo.id !== item.id))

        updateList(listDeletedItem)
    }

    return(
        <div>
            <h2>{title}</h2>
            {todoList.length != completedTodos ? todoList.map((todo) => (
                !todo.state && <TodoItem key={todo.id} todoItem={todo} onClick={handleState} onDelete={handleDelete}/>
            )) : 'No more todos' }
        </div>
    )
}

export default TodoList