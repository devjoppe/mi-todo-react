import {useEffect, useState} from "react";
import {Todos} from "../types";
import * as TodosAPI from "../services/TodosAPI.ts";
import ListGroup from "react-bootstrap/ListGroup";
import {Link} from "react-router-dom";

const TodoGroup = () => {

    const [todos, setTodos] = useState<Todos>([])

    // Get todos from api
    const getTodos = async () => {
        const data = await TodosAPI.getTodos()
        setTodos(data)
    }

    /*
    // Delete a todo in the api
    const deleteTodo = async (todo: Todo) => {
        if (!todo.id) {
            return
        }

        // Delete todo from the api
        await TodosAPI.deleteTodo(todo.id)

        // Get all the todos from the api
        getTodos()
    }

    // Toggle the completed status of a todo in the api
    const toggleTodo = async (todo: Todo) => {
        if (!todo.id) {
            return
        }

        // Update a todo in the api
        await TodosAPI.updateTodo(todo.id, {
            completed: !todo.completed
        })

        // Get all the todos from the api
        getTodos()
    }
    */

    // fetch todos when App is being mounted
    useEffect(() => {
        getTodos()
    }, [])

    return(
        <>
            {todos.length > 0 && (
                <ListGroup className="todolist">
                    {todos.map(todo => (
                        <ListGroup.Item
                            action
                            as={Link}
                            key={todo.id}
                            className={todo.completed ? 'done' : ''}
                            to={`/todos/${todo.id}`}
                        >
                            {todo.title}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}

            {todos.length === 0 && (
                <p>Yayyy, you have 0 todos to do</p>
            )}
        </>
    )
}

export default TodoGroup