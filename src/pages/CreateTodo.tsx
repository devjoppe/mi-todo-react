import AddNewTodoForm from "../components/AddNewTodoForm.tsx";
import {Todo} from "../types";
import * as TodosAPI from "../services/TodosAPI.ts";
import {useState} from "react";
import {Alert} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const CreateTodo = () => {

    const [isCompleted, setIsCompleted] = useState(false)

    const navigate = useNavigate()

    // Create a new todo in the API
    const addTodo = async (todo: Todo) => {
        try {
            await TodosAPI.createTodo(todo)
        } catch (err:any) {
            console.error(err.message)
        } finally {
            setIsCompleted(true)
            setTimeout(() => {
                navigate("/todos")
            }, 2000)
        }
        //getTodos()
        //When completed, go to the list page and display the new item.
    }

    return(
        <>
            { isCompleted &&
                <Alert variant="success">
                    The Todo was created
                </Alert>
                    }
            <AddNewTodoForm onAddTodo={addTodo} />
        </>
    )
}

 export default CreateTodo