import React from "react";

interface IProps {
    changeEndPoint: (data:string) => void
}

const MenuButtons:React.FC<IProps> = ({changeEndPoint}) => {
    return (
        <div>
            <button onClick={() => {changeEndPoint('todos')}}>Show All</button>
            <button onClick={() => {changeEndPoint('todos?type=Work')}}>Filter Work</button>
            <button onClick={() => {changeEndPoint('todos?type=Personal')}}>Filter Personal</button>
        </div>
    )
}

export default MenuButtons