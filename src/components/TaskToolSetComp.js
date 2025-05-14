import { useContext } from "react";
import { IoPlayCircleSharp } from "react-icons/io5";
import { IoPlayBackCircle } from "react-icons/io5";
import { IoPlayForwardCircle } from "react-icons/io5";
import { IoPauseCircle } from "react-icons/io5";


const TaskToolSetComp = ()=>{
    return (
        <div className="box">
            <div className="buttons">
                <button className="button is-success">
                    <span className="icon">
                        <IoPlayCircleSharp/>
                    </span>
                    <span>启动</span>
                </button>
            </div>
        </div>
    )
}

export default TaskToolSetComp;