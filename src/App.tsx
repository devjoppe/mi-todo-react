import {useEffect, useState} from "react";
import TodoCounter from "./components/TodoCounter.tsx";
import TodoList from "./components/TodoList.tsx";
import AddNewTodoForm from "./components/AddNewTodoForm.tsx";
import MenuButtons from "./components/MenuButtons.tsx";
import {getApiResource} from "./services/API.ts";

import {apiTodos} from "./interface/todoInterface.tsx";

function App() {

    const [completedTodos, setCompletedTodos] = useState(0)
    const[apiTodos, setApiTodos] = useState<apiTodos[] | null >()
    const[error, setError] = useState(null)
    const[isLoading, setIsLoading] = useState(true)
    const[endPoint, setEndPoint] = useState('todos')

    useEffect(() => {

        // Rensa data innan ny hämtning
        setApiTodos([])
        setIsLoading(true)

        // Klassisk fetch
        const getData = async () => {
            try {
                setApiTodos(await getApiResource(endPoint))
                setError(null)
            } catch (err:any) {
                setError(err.message)
                setApiTodos(null)
            } finally {
                setIsLoading(false)
            }
        }
        getData()
    }, [endPoint])

    useEffect(() => {
        if(!apiTodos) {
            return
        }
        setCompletedTodos(apiTodos.filter((todo: apiTodos) => todo.completed === true).length)
    }, [apiTodos])

    const changeEndPoint = (newEndPoint:string) => {
        setEndPoint(newEndPoint)
        console.log(newEndPoint)
    }

    const updateList = (handleState:object[]) => {
        setApiTodos(handleState)
    }

    const handleSubmit = (newSubmit:object) => {
        setApiTodos([...apiTodos, newSubmit])
    }

    return (
        <div className="container">
            {error && <div>An error occurred...</div>}
            <MenuButtons changeEndPoint={changeEndPoint}/>
            <h1>Limit 30</h1>
            <AddNewTodoForm newPost={handleSubmit} />
            {isLoading && <div>DATA IS LOADING...</div>}
            { apiTodos && !isLoading && <TodoCounter completedTodos={completedTodos} totalTodos={apiTodos.length}/> }
            { apiTodos && !isLoading &&<TodoList title={"Ongoing"} todoList={apiTodos} updateList={updateList} isComplete={false}/> }
            { apiTodos && !isLoading &&<TodoList title={"Completed"} todoList={apiTodos} updateList={updateList} isComplete={true}/> }
        </div>
    )
}

export default App
