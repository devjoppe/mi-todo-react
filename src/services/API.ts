
export const getApiResource = async (endPoint:string) => {
    const response = await fetch(`http://localhost:3000/${endPoint}`)
    if (!response.ok) {
        throw new Error(`This is an HTTP error: The status is ${response.status}`);
    }
    const todoData = await response.json()
    return todoData
}