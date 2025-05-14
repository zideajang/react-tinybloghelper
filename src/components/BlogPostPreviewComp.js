import { useContext, useEffect,useState } from "react"
import { fetchBlogFile } from "../api"
import HomePageContext from "../context/HomePageContext"
import Markdown from "react-markdown"

const BlogPostPreviewComp = ()=>{

    const {
        loading, setLoading,
        error, setError,
        blogFilePath,setBlogFilePath,
        blogContent,setBlogContent,
    } = useContext(HomePageContext)
    // useEffect(()=>{
    //     const fetchTextFile = async () => {
    //   try {
    //     setLoading(true);
    //     setError(null);
        
    //     const response = await fetchBlogFile(blogFilePath)
    //     console.log(response)
    //     setBlogContent(response);
    //   } catch (err) {
    //     setError(`加载文件失败: ${err.message}`);
    //     console.error('加载文件出错:', err);
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    // fetchTextFile();
    // },[blogFilePath])
    return(
        <>
        {blogContent && <Markdown style={{
            
        }}>{blogContent}</Markdown>}
        
        </>
    )
}

export default BlogPostPreviewComp