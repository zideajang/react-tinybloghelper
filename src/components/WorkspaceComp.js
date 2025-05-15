import { useContext } from "react";
import HomePageContext from "../context/HomePageContext";
import ToolSetComp from "./ToolsetComp";
import BlogPostPreviewComp from "./BlogPostPreviewComp";
import FeedBackComp from "./FeedBackComp";

const WorkspaceComp = ()=>{
    const {
        feedbackSummary,
        setFeedbackSummary,
        specificPoints,
        setSpecificPoints
    } = useContext(HomePageContext)
    return (
        <>
        <ToolSetComp/>
        <div className="box" style={{
            maxWidth:'720px',
            overflowY: 'auto', 
            height:'100vh'
        }}>
            {feedbackSummary && <FeedBackComp/>}
            <BlogPostPreviewComp/>
        </div>
        </>
    )
}

export default WorkspaceComp;