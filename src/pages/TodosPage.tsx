import {NavLink} from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import {Outlet} from "react-router-dom";

const TodosPage = () => {
	console.log("Does it render?")
	return (
		<>
			<h1 className="mb-3">Todos</h1>
			<Nav fill variant="tabs" defaultActiveKey="/todos">
				<Nav.Item>
					<NavLink to="/todos" className="nav-link">List</NavLink>
				</Nav.Item>
				<Nav.Item>
					<NavLink to="/todos/create" className="nav-link">Create</NavLink>
				</Nav.Item>
			</Nav>
			<Outlet />
		</>
	)
}

export default TodosPage
