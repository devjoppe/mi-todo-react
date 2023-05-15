import axios from "axios";

import {apiTodos} from "../interface/todoInterface.tsx";

const BASE_URL = 'http://localhost:3000'

// Get All Todos, or based on the Endpoint
export const getTodos = async (endPoint:string) => {
    const response = await axios.get(`${BASE_URL}/${endPoint}`)
    // Todo: Check Axios error handling
    if (!response) {
        throw new Error(`This is an HTTP error: The status is ${response}`);
    }
    return response.data
}

// Save new Data to the DB
// Todo: Check Error handling
export const saveTodo = async (newTodo:apiTodos) => {
    console.log("Körs save? ", newTodo)
    await axios.post(`${BASE_URL}/todos`, newTodo)
        .then(function (response) {
            console.log(response);
        })
}

// Update data
export const updateTodo = async (itemTodo:apiTodos[]) => {
    console.log("Körs update: ", itemTodo[0].id, updateTodo)
    await axios.patch(`${BASE_URL}/todos/${itemTodo[0].id}`, itemTodo[0])
        .then(function (response) {
            console.log(response);
        })
}

// Delete data
export const deleteTodo = async (itemTodo:apiTodos[]) => {
    console.log("Delete: ", itemTodo)
    await  axios.delete(`${BASE_URL}/todos/${itemTodo[0].id}`, {data: itemTodo[0]})
        .then(function (response) {
            console.log(response);
        })
}