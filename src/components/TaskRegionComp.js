import { useContext } from "react";
import UserRequestComp from "./UserRequestComp";
import HomePageContext from "../context/HomePageContext";

// icons
import { MdExpandMore } from "react-icons/md";
import { MdExpandLess } from "react-icons/md";
import { FaUpload } from "react-icons/fa";


import TaskNotificationComp from "./TaskNotificationComp";
import TaskToolSetComp from "./TaskToolSetComp";
import { FaPlayCircle } from "react-icons/fa";
import { FaPauseCircle } from "react-icons/fa";

const TaskRegionComp = ()=>{
    const {
        isExpandUserRequest,setIsExpandUserRequest,
        startAction
    } = useContext(HomePageContext);
    return (
        <>
        <div className="box">
        <div className="level">
            <div className="level-left">
                <span>用户需求</span>
                <div className="file">
                    <label className="file-label is-primary">
                        <input className="file-input" type="file" name="resume" />
                        <span className="file-cta">
                        <span className="file-icon">
                            <FaUpload/>
                        </span>
                        <span className="file-label">选择文件</span>
                        </span>
                    </label>
                </div>
                
            </div>
            <div className="level-item">
                <div className="field">
                    <div className="control">
                        <div className="buttons">
                            <button className="button is-success" 
                                onClick={(event)=>{startAction()}}>
                                    <span className="icon">
                                        <FaPlayCircle/>
                                    </span>
                                    <span>
                                启动
                                    </span>
                            </button>
                            <button className="button" onClick={(event)=>{startAction()}}>
                                <span className="icon">
                                    <FaPauseCircle/>
                                </span>
                                <span>
                                    暂停
                                </span>
                            </button>
                            <button className="button" onClick={(event)=>{startAction()}}>
                                前进
                            </button>
                            <button className="button" onClick={(event)=>{startAction()}}>
                                后退
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="level-right" 
                onClick={(event=>{setIsExpandUserRequest(!isExpandUserRequest)})}>
                    <div className="button">
                        <span className="icon">
                            {isExpandUserRequest?(<MdExpandLess/>):(<MdExpandMore/>)}
                        </span>
                    </div>
            </div>
        </div>
        </div>
        {
            isExpandUserRequest && <UserRequestComp/>
        }
        <TaskNotificationComp/>
                </>
    )
}

export default TaskRegionComp;