import {useEffect, useState} from "react";
import {Todos} from "../types";
import * as TodosAPI from "../services/TodosAPI.ts";
import ListGroup from "react-bootstrap/ListGroup";
import {Link, useLocation} from "react-router-dom";
import {Alert} from "react-bootstrap";

const TodoGroup = () => {

    const [todos, setTodos] = useState<Todos>([])
    const [isDeleted, setIsDeleted] = useState(false)

    // Get todos from api
    const getTodos = async () => {
        const data = await TodosAPI.getTodos()
        setTodos(data)
    }

    // fetch todos when App is being mounted
    useEffect(() => {
        getTodos()
    }, [])

    const queryString = useLocation().search
    const queryParams = new URLSearchParams(queryString)
    const todoId = queryParams.get('id')

    useEffect(() => {
        if(todoId) {
            setIsDeleted(true)
            //setDeletedTodo(todoId)
        } else {
            return
        }
    }, [todoId])

    return(
        <>
            {isDeleted && <Alert variant="warning">Todo with ID {todoId} was deleted</Alert> }
            {todos.length > 0 && (
                <>
                    <h2>Ongoing</h2>
                    <ListGroup className="todolist mb-5">
                        {todos.filter(todo => !todo.completed).sort((a, b) =>
                            a.title.localeCompare(b.title)).map(todo => (
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
                    <h2>Completed</h2>
                    <ListGroup className="todolist">
                        {todos.filter(todo => todo.completed).sort((a, b) =>
                            a.title.localeCompare(b.title)).map(todo => (
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
                </>
            )}

            {todos.length === 0 && (
                <p>Yayyy, you have 0 todos to do</p>
            )}
        </>
    )
}

export default TodoGroup