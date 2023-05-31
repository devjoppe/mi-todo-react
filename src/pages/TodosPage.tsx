import Nav from "react-bootstrap/Nav";
import {Outlet} from "react-router-dom";

const TodosPage = () => {
	return (
		<>
			<h1 className="mb-3">Todos</h1>
			<Nav fill variant="tabs" defaultActiveKey="/todos">
				<Nav.Item>
					<Nav.Link href="/todos">List</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link href="/todos/create">Create</Nav.Link>
				</Nav.Item>
			</Nav>
			<Outlet />
		</>
	)
}

export default TodosPage
