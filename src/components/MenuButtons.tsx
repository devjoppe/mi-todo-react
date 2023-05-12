import React from "react";

interface IProps {
    changeEndPoint: (data:string) => void
}

const MenuButtons:React.FC<IProps> = ({changeEndPoint}) => {
    return (
        <div>
            <button onClick={() => {changeEndPoint('todos/random')}}>Get Random Todo</button>
            <button>Change B</button>
        </div>
    )
}

export default MenuButtons