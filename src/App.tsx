import Container from 'react-bootstrap/Container'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Navigation from './components/Navigation'
import NotFound from './pages/NotFound'
import TodoPage from './pages/TodoPage'
import TodosPage from './pages/TodosPage'
import './assets/scss/App.scss'
import CreateTodo from "./pages/CreateTodo"
import TodoGroup from "./components/TodoGroup"
import EditTodo from "./pages/EditTodo"

const App = () => {
	return (
		<div id="App">
			<Navigation />
			<Container className="py-3">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/todos" element={<TodosPage />}>
						<Route index element={<TodoGroup />} />
						<Route path="create" element={<CreateTodo />} />
					</Route>
					<Route path="/todos/:id/edit" element={<EditTodo />} />
					<Route path="/todos/:id" element={<TodoPage />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Container>
		</div>
	)
}

export default App