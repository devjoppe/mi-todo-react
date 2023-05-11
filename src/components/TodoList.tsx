import React, {useEffect, useState} from "react";
import TodoItem from "./TodoItem.tsx";
import {todoItem} from "../interface/todoInterface.tsx";

interface IProp {
    title: string,
    todoList: todoItem[]
    updateList: (object:todoItem[]) => void
    isComplete: boolean
}

const TodoList: React.FC<IProp> = ({title, todoList, updateList, isComplete}) => {

    console.log("FROM COMPONENT: ", todoList)

    const [completedTodos, setCompletedTodos] = useState(0)

    useEffect(() => {
        const checkCompleted = todoList.filter(todo => todo.state === true)
        setCompletedTodos(checkCompleted.length)

    }, [todoList])

    const handleState = (item:todoItem) => {
        const updateTodo = todoList.map((todo) => todo.id === item.id ? {...todo, state: true} : todo )
        updateList(updateTodo)
    }

    const handleDelete = (item:todoItem) => {
        const listDeletedItem = (todoList.filter(todo => todo.id !== item.id))
        updateList(listDeletedItem)
    }

    return(
        <div>
            <h2>{title}</h2>
            {todoList.length != completedTodos || completedTodos != 0 ? todoList.filter(todo => todo.state === isComplete).map((todo) => (
                <TodoItem key={todo.id} todoItem={todo} onClick={handleState} onDelete={handleDelete}/>
            )) : 'No more todos' }
        </div>
    )
}

export default TodoList