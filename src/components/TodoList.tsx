import React, {useEffect, useState} from "react";
import TodoItem from "./TodoItem.tsx";
import {apiTodos} from "../interface/todoInterface.tsx";

interface IProp {
    title: string,
    todoList: apiTodos[]
    updateList: (object:apiTodos[], todoItem:apiTodos[], isDelete:boolean) => void
    isComplete: boolean
}

const TodoList: React.FC<IProp> = ({title, todoList, updateList, isComplete}) => {

    const [completedTodos, setCompletedTodos] = useState(0)

    useEffect(() => {
        const checkCompleted = todoList.filter(todo => todo.completed === true)
        setCompletedTodos(checkCompleted.length)

    }, [todoList])

    const handleState = (item:apiTodos) => {
        //const updateTodo = todoList.map((todo) => todo.id === item.id ? {...todo, completed: true} : todo )
        const updateTodo = todoList.map((todo) => todo.id === item.id ? {...todo, completed: !item.completed} : todo )
        const changedTodo = updateTodo.filter(todo => todo.id === item.id)
        console.log("Vad skrivs ut här: ", changedTodo)
        updateList(updateTodo, changedTodo, false)
    }

    const handleDelete = (item:apiTodos) => {
        const listDeletedItem = (todoList.filter(todo => todo.id !== item.id))
        console.log("Delete in LIST: ", item)
        updateList(listDeletedItem, [item], true)
    }

    return(
        <div>
            <h2>{title}</h2>
            {todoList.length != completedTodos || completedTodos != 0 ? todoList.filter(todo => todo.completed === isComplete).map((todo) => (
                <TodoItem key={todo.id} todoItem={todo} onClick={handleState} onDelete={handleDelete}/>
            )) : 'No more todos' }
        </div>
    )
}

export default TodoList