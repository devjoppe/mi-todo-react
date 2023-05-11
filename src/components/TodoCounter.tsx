import React from "react";

interface IProp {
    completedTodos: number,
    totalTodos: number
}

const TodoCounter: React.FC<IProp> = ({completedTodos, totalTodos}) => {
    return(
        <div>
            {completedTodos} av {totalTodos} avklarade.
        </div>
    )
}

export default TodoCounter