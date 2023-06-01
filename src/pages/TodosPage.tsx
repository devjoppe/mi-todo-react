import {NavLink} from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import {Outlet} from "react-router-dom";

const TodosPage = () => {
	return (
		<>
			<h1 className="mb-3">Todos</h1>
			<Nav fill variant="tabs" className="mb-3">
				<Nav.Item>
					<Nav.Link as={NavLink} end to="/todos">List</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link as={NavLink} to="/todos/create" className="w-100 d-block">Create</Nav.Link>
				</Nav.Item>
			</Nav>
			<Outlet />
		</>
	)
}

export default TodosPage
