import {useEffect, useState} from "react";
import TodoItem from "./components/TodoItem.tsx";
import {todoItem} from "./interface/todoInterface.tsx";
import AddTodo from "./components/AddTodo.tsx";
import uniqid from 'uniqid';

function App() {

    const [todoList, setTodoList] = useState<todoItem[]>([
        {id: 1, body: 'This is what I am supposed to do', state: false},
        {id: 2, body: 'Can I be finished with this today?', state: false},
        {id: 3, body: 'Vacuum all the floors!', state: true},
    ])
    const [completedTodos, setCompletedTodos] = useState(0)

    useEffect(() => {
        const checkCompleted = todoList.filter(todo => todo.state === true)
        setCompletedTodos(checkCompleted.length)
    }, [todoList])

    const handleState = (item:todoItem) => {
        // Map over the Array, check if the ID, if Yes then use the item and set the state to true.
        const updateTodo = todoList.map((todo) =>
        todo.id === item.id ? {...todo, state: true} : todo )
        setTodoList(updateTodo)
    }

    const handleDelete = (item:todoItem) => {
        // Filter through the array and if the ID dont match, do not set it in the list.
        setTodoList(todoList.filter(todo => todo.id !== item.id))
        console.log(todoList)
    }

    const handleSubmit = (newSubmit:string) => {
        console.log(newSubmit)
        // Using a module to get an unique Id (call me lazy!)
        const newId = uniqid()
        console.log(newId)
        const newTodo = {
            id: newId,
            body: newSubmit,
            state: false
        }
        setTodoList([...todoList, newTodo])
    }

    console.log(todoList)

    return (
        <div className="container">
            <AddTodo newPost={handleSubmit} />
            <h2>Ongoing</h2>
            {todoList.length != completedTodos ? todoList.map((todo) => (
                !todo.state && <TodoItem key={todo.id} todoItem={todo} onClick={handleState} onDelete={handleDelete}/>
            )) : 'No more todos' }
            <h2 className="mt-5">Done</h2>
            {completedTodos} av {todoList.length} avklarade.
            <hr />
            { completedTodos != 0 ? todoList.map((todo) => (
                todo.state && <TodoItem key={todo.id} todoItem={todo} onClick={handleState} onDelete={handleDelete} />
            )) : 'No completed todos' }
        </div>
    )
}

export default App
