import {useEffect, useState} from "react";
import TodoCounter from "./components/TodoCounter.tsx";
import TodoList from "./components/TodoList.tsx";
import {todoItem} from "./interface/todoInterface.tsx";
import AddNewTodoForm from "./components/AddNewTodoForm.tsx";

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

    const updateList = (handleState:[]) => {
        console.log("Check state: ", handleState)
        setTodoList(handleState)
    }

    const handleSubmit = (newSubmit:object) => {
        setTodoList([...todoList, newSubmit])
    }

    return (
        <div className="container">
            <AddNewTodoForm newPost={handleSubmit} />
            <TodoCounter completedTodos={completedTodos} totalTodos={todoList.length}/>
            <TodoList title={"Ongoing"} todoList={todoList} updateList={updateList}/>
            <TodoList title={"Completed"} todoList={todoList} updateList={updateList}/>
        </div>
    )
}

export default App
