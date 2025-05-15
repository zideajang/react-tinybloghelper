import { useContext } from "react"
import HomePageContext from "../context/HomePageContext"



const FeedBackComp = ()=>{
    const {
        feedbackSummary,setFeedbackSummary,
        specificPoints,setSpecificPoints,
    } = useContext(HomePageContext)

    const addSpecificPoint =()=>{
        setSpecificPoints()
    }
    return (
        <>
        <div className="level">
            <div className="buttons">
                <button className="button" onClick={(event)=>addSpecificPoint()}>添加</button>
                <button className="button is-link">提交</button>
            </div>
        </div>
        {feedbackSummary && 
            <form>
                <div className="field">
                    <label className="label">Emily 给出建议</label>
                    <div className="control">
                        <textarea 
                            className="textarea"
                            value={feedbackSummary}>
                        </textarea>
                    </div>
                </div>
            </form>
        }
        {specificPoints && 
            specificPoints.map((specificPoint,idx)=>(
                <div className="box">
                    <div className="field" key={`point-${idx}`}>
                        <div className="level">
                            <div className="level-left">
                                    <label className="label">{`问题点 ${idx}`}</label>
                            </div>
                            <div className="level-right">
                                <button className="delete"></button>
                            </div>
                        </div>
                        <div className="control">
                            <input type="text" className="input" disabled value={specificPoint.point}/>

                        </div>
                        <div className="field">
                            <input type="text"  className="input" value={specificPoint.suggestion}/>
                        </div>
                    </div>
                </div>
            ))
        }

        </>
    )
}

export default FeedBackComp