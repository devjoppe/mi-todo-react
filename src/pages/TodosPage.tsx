import {NavLink} from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import {Outlet} from "react-router-dom";

const TodosPage = () => {
	console.log("Does it render?")
	return (
		<>
			<h1 className="mb-3">Todos</h1>
			<Nav fill variant="tabs" defaultActiveKey={1} className="mb-3">
				<Nav.Item>
					<Nav.Link eventKey={1}>
						<NavLink to="/todos" className="w-100 d-block">List</NavLink>
					</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link eventKey={2}>
						<NavLink to="/todos/create" className="w-100 d-block">Create</NavLink>
					</Nav.Link>
				</Nav.Item>
			</Nav>
			<Outlet />
		</>
	)
}

export default TodosPage
