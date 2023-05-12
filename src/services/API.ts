
export const getApiResource = async (endPoint:string) => {
    const response = await fetch(`https://dummyjson.com/${endPoint}`)
    if (!response.ok) {
        throw new Error(`This is an HTTP error: The status is ${response.status}`);
    }
    const todoData = await response.json()
    if(endPoint === 'todos/random') {
        return [todoData]
    } else {
        return todoData.todos
    }
}