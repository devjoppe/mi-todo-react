import {useState} from "react";
import TodoItem from "./components/TodoItem.tsx";
import {todoItem} from "./interface/todoInterface.tsx";

function App() {

    const [todoList, setTodoList] = useState<todoItem[]>([
        {id: 1, body: 'This is what I am supposed to do', state: false},
        {id: 2, body: 'Can I be finished with this today?', state: false},
        {id: 3, body: 'Vacuum all the floors!', state: true},
    ])

    const handleState = (item:todoItem) => {
        console.log("Klickeri klick", item)
    }

    return (
        <div className="container">
            <h2>Ongoing</h2>
            { todoList.map((todo) => (
                !todo.state && <TodoItem key={todo.id} todoItem={todo} onClick={handleState}/>
            )) }
            <h2>Done</h2>
            { todoList.map((todo) => (
                todo.state && <TodoItem key={todo.id} todoItem={todo} onClick={handleState} />
            )) }
        </div>
    )
}

export default App
