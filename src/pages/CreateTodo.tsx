import AddNewTodoForm from "../components/AddNewTodoForm.tsx";
import {Todo} from "../types";
import * as TodosAPI from "../services/TodosAPI.ts";

const CreateTodo = () => {

    // Create a new todo in the API
    const addTodo = async (todo: Todo) => {
        await TodosAPI.createTodo(todo)
        //getTodos()
        //When completed, go to the list page and display the new item.
    }

    return(
        <>
            <AddNewTodoForm onAddTodo={addTodo} />
        </>
    )
}

 export default CreateTodo