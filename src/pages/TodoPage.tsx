import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import {Link, useLocation, useNavigate, useParams} from 'react-router-dom'
import { Todo } from '../types'
import * as TodosAPI from '../services/TodosAPI'
import {Alert} from "react-bootstrap";

const TodoPage = () => {
	const [todo, setTodo] = useState<Todo|null>(null)
	const { id } = useParams()
	const todoId = Number(id)

	const navigate = useNavigate()
	const location = useLocation()

	// Get todo from API
	const getTodo = async (id: number) => {
		// call TodosAPI
		const data = await TodosAPI.getTodo(id)
		setTodo(data)
	}

	useEffect(() => {
		getTodo(todoId)
	}, [todoId])

	if (!todo) {
		return (<p>Loading...</p>)
	}

	const toggleTodo = async (todo: Todo) => {
		if (!todo.id) {
			return
		}

		// Update a todo in the api
		await TodosAPI.updateTodo(todo.id, {
			completed: !todo.completed
		})

		getTodo(todo.id)
	}

	// Delete a todo in the api
	const deleteTodo = async (todo: Todo) => {
		if (!todo.id) {
			return
		}

		// Delete todo from the api
		await TodosAPI.deleteTodo(todo.id)

		navigate(`/todos/?id=${todo.id}`)
	}

	return (
		<>
			<h1>{todo.title}</h1>

			{location.state && <Alert variant="success">{location.state.message}</Alert> }

			<p><strong>Status:</strong> {todo.completed ? 'Completed' : 'Not completed'}</p>

			<div className="mb-3 d-block">
				<Button className="me-3" onClick={() => toggleTodo(todo)} variant={todo.completed ? 'warning' : 'success'}>Set as {todo.completed ? 'Not completed' : 'Completed'}</Button>
				<Link to={`/todos/${todo.id}/edit`}><Button className="me-3" variant="warning">Edit</Button></Link>
				<Button onClick={() => deleteTodo(todo)} variant="danger">Delete</Button>
			</div>
			<Link to="/todos">
				<Button variant='secondary'>&laquo; All todos</Button>
			</Link>
		</>
	)
}

export default TodoPage
