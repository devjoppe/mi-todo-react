import {Link, useNavigate, useParams} from "react-router-dom";
import * as TodosAPI from "../services/TodosAPI.ts";
import {useEffect, useState} from "react";
import {Todo} from "../types";
import Button from "react-bootstrap/Button";

const EditTodo = () => {

    const [todo, setTodo] = useState<Todo|null>(null)
    const [newTodoTitle, setNewTodoTitle] = useState('')
    const { id } = useParams();

    const navigate = useNavigate()

    const getTodo = async (id: number) => {
        // call TodosAPI
        const data = await TodosAPI.getTodo(id)
        setTodo(data)
        setNewTodoTitle(data.title)
    }

    const handleSubmit = async (e:any) => {
        e.preventDefault()
        // Update a todo in the api
        if(todo && todo.id != null ) {
            await TodosAPI.updateTodo(todo.id, {
                title: newTodoTitle
            })
            navigate(`/todos/${todo.id}`, {
                state: {
                    message: `Todo with ID ${todo.id} was successfully updated`
                }
            })
        }
    }

    useEffect(() => {
        getTodo(Number(id))
    }, [id])

    return(
        <div>
            <form onSubmit={handleSubmit} className="mb-3">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Todo title"
                        onChange={e => setNewTodoTitle(e.target.value)}
                        value={newTodoTitle}
                    />

                    <button
                        disabled={!newTodoTitle.trim()}
                        type="submit"
                        className="btn btn-success"
                    >Update</button>
                </div>
            </form>
            <Link to="/todos">
                <Button variant='secondary' onClick={() => navigate(-1)}>&laquo; Go back</Button>
            </Link>
        </div>
    )
}

export default EditTodo