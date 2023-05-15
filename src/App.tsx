import {useCallback, useEffect, useState} from "react";

import TodoCounter from "./components/TodoCounter.tsx";
import TodoList from "./components/TodoList.tsx";
import AddNewTodoForm from "./components/AddNewTodoForm.tsx";
import MenuButtons from "./components/MenuButtons.tsx";
import {getTodos, saveTodo, updateTodo, deleteTodo} from "./services/Api.ts";

import {apiTodos} from "./interface/todoInterface.tsx";

function App() {

    const [completedTodos, setCompletedTodos] = useState(0)
    const[apiTodos, setApiTodos] = useState<apiTodos[] | null >([])
    const[error, setError] = useState(null)
    const[isLoading, setIsLoading] = useState(true)
    const[endPoint, setEndPoint] = useState('todos')

    const getData = useCallback(async () => {

        console.log("********** API LOADING DATA *************")

        // Cleaning data -> Problem: is that I am changing the apiTodos and therefore creating a loop
        setApiTodos([])
        setIsLoading(true)

        // This could be simplified - Move to the api-function
        try {
            setApiTodos(await getTodos(endPoint))
            setError(null)
        } catch (err:any) {
            setError(err.message)
            setApiTodos(null)
        } finally {
            setIsLoading(false)
        }

    }, [endPoint])


    useEffect(() => {
        console.log("############ useEffect #################")
        getData().then(() => { console.log("Fetch from useEffect completed")})
    }, [getData])

    useEffect(() => {
        if(!apiTodos) {
            return
        }
        setCompletedTodos(apiTodos.filter((todo: apiTodos) => todo.completed === true).length)
    }, [apiTodos])

    const changeEndPoint = (newEndPoint:string) => {
        setEndPoint(newEndPoint)
    }

    // These function below should be run in the todoList component. Just rendering the list items, not the whole app.
    const updateList = (handleState:apiTodos[], itemTodo:apiTodos[], isDelete:boolean) => {
        setApiTodos(handleState)
        console.log("APP todo Item: ", itemTodo)
        if(!isDelete) {
            console.log("UPDATE")
            updateTodo(itemTodo).then(()=> {
                console.log("Update complete!")
                getData().then(() => { console.log("Get new DB data")})
            })
        }
        if(isDelete) {
            deleteTodo(itemTodo).then(()=> {
                console.log("Delete complete!")
                getData().then(() => { console.log("Get new DB data")})
            })
        }
    }


    const handleSubmit = (newSubmit:object) => {
        setApiTodos([...apiTodos, newSubmit])
        saveTodo(newSubmit).then(()=> {
            console.log("Save complete!")
            getData().then(() => { console.log("Get new DB data")})
        })
    }

    return (
        <div className="container">
            {error && <div>An error occurred...</div>}
            <MenuButtons changeEndPoint={changeEndPoint}/>
            <h1>Limit 30</h1>
            <AddNewTodoForm newPost={handleSubmit} />
            { isLoading && <div>DATA IS LOADING...</div> }
            { apiTodos && !isLoading && (
                <>
                    <TodoCounter completedTodos={completedTodos} totalTodos={apiTodos.length}/>
                    <TodoList title={"Ongoing"} todoList={apiTodos} updateList={updateList} isComplete={false}/>
                    <TodoList title={"Completed"} todoList={apiTodos} updateList={updateList} isComplete={true}/>
                </>
                )}
        </div>
    )
}

export default App
