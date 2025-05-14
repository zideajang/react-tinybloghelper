import { useContext } from "react"
import HomePageContext from "../context/HomePageContext"
import { getCurrentDateFormatted } from "../common/helper";
const baseURL = process.env.REACT_APP_BASE_URL || '/api';


const TaskNotificationComp = ()=>{
    const {
        tasks
    } = useContext(HomePageContext)
    return (
        <>
        {tasks && tasks.map((currentTask,idx)=>(

            <div className="notification" key={`task-${idx}`}>
                <article class="media">
                    <figure class="media-left">
                        <p class="image is-64x64">
                        <img src={`${baseURL}/static/${currentTask.agent}.jpg`} alt="task" />
                        </p>
                    </figure>
                    <div class="media-content">
                        <div class="content">
                        <p>
                            <strong className="is-size-5">{currentTask.agent}
                                </strong> <small className="tag">
                                    {getCurrentDateFormatted()}</small> <small></small>
                            <br />
                            {currentTask.content}
                        </p>
                        </div>
                        </div>
                </article>
            </div>
        ))}
        </>
    )
}

export default TaskNotificationComp;