import {useEffect, useState} from "react";
import TodoCounter from "./components/TodoCounter.tsx";
import TodoList from "./components/TodoList.tsx";
import {todoItem} from "./interface/todoInterface.tsx";
import AddNewTodoForm from "./components/AddNewTodoForm.tsx";

import {apiTodos} from "./interface/todoInterface.tsx";

function App() {

    const [todoList, setTodoList] = useState<todoItem[]>([
        {id: 1, body: 'This is what I am supposed to do', state: false},
        {id: 2, body: 'Can I be finished with this today?', state: false},
        {id: 3, body: 'Vacuum all the floors!', state: true},
    ])
    const [completedTodos, setCompletedTodos] = useState(0)

    const[apiTodos, setApiTodos] = useState<apiTodos[] | null >()
    const[error, setError] = useState(null)
    const[isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch('https://dummyjson.com/todos')
                if (!response.ok) {
                    throw new Error(`This is an HTTP error: The status is ${response.status}`);
                }
                const todoData = await response.json()
                setApiTodos(todoData.todos)
                setError(null)
            } catch (err) {
                setError(err.message)
                setApiTodos(null)
            } finally {
                setIsLoading(false)
            }
        }
        getData()
    }, [])

    useEffect(() => {
        if(!apiTodos) {
            return
        }
        setCompletedTodos(apiTodos.filter((todo: apiTodos) => todo.completed === true).length)
    }, [apiTodos])

    const updateList = (handleState:object[]) => {
        setApiTodos(handleState)
    }

    const handleSubmit = (newSubmit:object) => {
        setApiTodos([...apiTodos, newSubmit])
    }

    console.log("Check the variable DATA: ", apiTodos)
    console.log("todoList: ", todoList)

    return (
        <div className="container">
            {error && <div>An error occurred...</div>}
            <AddNewTodoForm newPost={handleSubmit} />
            {isLoading && <div>DATA IS LOADING...</div>}
            { apiTodos && <TodoCounter completedTodos={completedTodos} totalTodos={apiTodos.length}/> }
            { apiTodos && <TodoList title={"Ongoing"} todoList={apiTodos} updateList={updateList} isComplete={false}/> }
            { apiTodos && <TodoList title={"Completed"} todoList={apiTodos} updateList={updateList} isComplete={true}/> }
        </div>
    )
}

export default App
