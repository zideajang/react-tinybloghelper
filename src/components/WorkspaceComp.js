import { useContext } from "react";
import HomePageContext from "../context/HomePageContext";
import ToolSetComp from "./ToolsetComp";
import BlogPostPreviewComp from "./BlogPostPreviewComp";


const WorkspaceComp = ()=>{
    return (
        <>
        <ToolSetComp/>
        <div className="box" style={{
            maxWidth:'720px',
            overflowY: 'auto', 
            height:'100vh'
        }}>
            <BlogPostPreviewComp/>
        </div>
        </>
    )
}

export default WorkspaceComp;