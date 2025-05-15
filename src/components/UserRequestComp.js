import { useContext } from "react";
import { useForm } from 'react-hook-form';

import HomePageContext from "../context/HomePageContext";
import { FaEdit } from "react-icons/fa";
import { VscSymbolKeyword } from "react-icons/vsc";
const baseURL = process.env.REACT_APP_BASE_URL || '/api'; // 如果环境变量未设置，提供一个默认值


// class UserRequest(BaseModel):
// userId:str
// topic: str
// keywords: Optional[List[str]] = None
// target_audience: str
// desired_tone_style: str
// specific_instructions: Optional[str] = None
// # 初始请求者信息 (可能是 human user ID)
// requester_id: Optional[str] = None


const UserRequestComp = ()=>{

    const { register, handleSubmit, watch,formState: { errors },getValues  } = useForm();

    const {
        user,
        title,setTitle,
        topic,setTopic,
        tags,setTags,
        references,setReferences,
        instructions,setInstructions,
        toneStyle,setToneStyle,
        targetAudience,setTargetAudience,
        notification, setNotification

    } = useContext(HomePageContext);

    const handleUserRequestSubmit = async (data)=>{
        console.log("Form data submitted:", data);

        // --- Existing state updates (you might move these inside the fetch .then block
        //     if you only want to update state on successful server response) ---
        setTopic(data.topic);
        // The frontend splits keywords and target_audience for local state display,
        // but the raw string data is sent to the backend as per the form.
        const keywordTags = data.kewords.split(/\s*,\s*/).filter(tag => tag.trim() !== ''); // Split and remove empty tags
        setTags(keywordTags);

        const targetAudienceList = data.target_audience.split(/\s*,\s*/).filter(audience => audience.trim() !== ''); // Split and remove empty audience entries
        setTargetAudience(targetAudienceList);

        // instructions
        setInstructions(data?.specific_instructions.split(/\s*,\s*/).filter(instruction => instruction.trim() !== ''))
        // ---------------------------------------------------------------------

        // --- Implement fetching data to the backend ---
        const apiUrl = `${baseURL}/api/blog/basicinfo`; // Construct the full API URL

        try {
            const response = await fetch(apiUrl, {
                method: 'POST', // Specify the method
                headers: {
                    'Content-Type': 'application/json', // Tell the server the body is JSON
                    // Add any other headers needed, e.g., Authorization token
                    // 'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify(data), // Convert the JavaScript object to a JSON string
            });

            if (!response.ok) {
                // Handle HTTP errors (e.g., 400, 404, 500)
                const errorData = await response.json(); // Attempt to parse error body
                console.error('API request failed:', response.status, errorData);
                // You might want to show an error message to the user
                setNotification(`提交失败: ${errorData.message || '未知错误'}`);
            } else {
                // Handle successful response
                const result = await response.json();
                console.log('API response success:', result);
                // You might want to show a success message or redirect the user
                setNotification('提交成功！');

                // If you moved the state updates, do them here:
                // setTopic(result.data.topic); // Assuming backend returns processed data
                // setTags(result.data.keywords); // Assuming backend returns processed data
                // setTargetAudience(result.data.target_audience); // Assuming backend returns processed data
                // setInstructions(result.data.specific_instructions); // Assuming backend returns processed data
                // setToneStyle(result.data.desired_tone_style); // Assuming backend returns processed data

            }
        } catch (error) {
            // Handle network errors (e.g., server unreachable)
            console.error('API request failed:', error);
            setNotification(`提交过程中发生网络错误: ${error.message}`);
        }
        // --------------------------------------------
    }
/**
避免术语轰炸：首次使用专业术语时需简单解释（如："API（应用程序编程接口）"）,使用日常比喻：将技术概念比作日常生活事物（如："数据库就像图书馆的书架系统"）,短句为王：平均句长控制在15-20字，避免嵌套从句,主动语态："系统会自动保存" 而非 "数据将被系统自动保存"
 */
    return (
        <>
        {topic && <div className="box">
            <div className="content">
                <ul>
                    {topic &&<li><strong>博客标题</strong>: {topic}</li>}
                    {tags.length > 0 &&<li> <strong>关键字</strong>{tags.map((tag,idx)=>(<span key={`tag-${idx}`} className="tag mr-2">{tag}</span>))}</li>}
                    {targetAudience.length >0 && <><strong>面向人群</strong><ul>
                        {targetAudience.map((audience,idx)=>(
                            <li key={`audience=${idx}`}>{audience}</li>
                        ))}
                        </ul></>}

                    {toneStyle && <li><strong>风格</strong>: {toneStyle}</li>}
                    {instructions && <li><strong>指令说明</strong>: {instructions.map((instruction,idx)=>(
                        <li key={`instruction-${idx}`}>{instruction}</li>
                    ))}</li>}
                    {/* 如果 references 状态有值，也可以在这里显示 */}
                    {/* {references && <li><strong>参考资料</strong>: {references}</li>} */}
                    {/* 补全的代码到这里结束 */}
                </ul>
            </div>
        </div>}
        <div className="box">
            <form onSubmit={handleSubmit(handleUserRequestSubmit)}>
                {/* topic */}
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">标题</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <p className="control is-expanded has-icons-left">
                            {/* Register Topic Input */}
                            <input className="input"
                                type="text"
                                placeholder="请给博客输入一个标题"
                                {...register("topic", { required: "题目是必填项" })} 
                                />
                            <span className="icon is-small is-left">
                                <FaEdit/>
                            </span>
                            </p>
                             {/* 显示错误信息 */}
                            {errors.topic && <p className="help is-danger">{errors.topic.message}</p>}
                        </div>
                    </div>
                </div>

                <div className="tags">

                </div>
                {/* 关键字 */}
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">关键字</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <p className="control is-expanded has-icons-left">
                            {/* Register keywords Input */}
                            <input className="input"
                                type="text"
                                placeholder="输入博客关键字以，间隔"
                                {...register("kewords", { required: "输入博客关键字" })} 
                                />
                            <span className="icon is-small is-left">
                                <VscSymbolKeyword/>
                            </span>
                            </p>
                            {/* 显示错误信息 */}
                            {errors.kewords && <p className="help is-danger">{errors.kewords.message}</p>}
                        </div>
                    </div>
                </div>

                {/* target_audience */}
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">面向人群</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <p className="control is-expanded has-icons-left">
                            {/* Register Topic Input */}
                            <input className="input"
                                type="text"
                                placeholder="请给博客面向人群，不同人群以逗号间隔"
                                {...register("target_audience", { required: "题目是必填项" })} 
                                />
                            <span className="icon is-small is-left">
                                <FaEdit/>
                            </span>
                            </p>
                             {/* 显示错误信息 */}
                            {errors.target_audience && <p className="help is-danger">{errors.target_audience.message}</p>}
                        </div>
                    </div>
                </div>

                {/* desired_tone_style TODO 可以转换为 select 控件 */}
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">风格</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <p className="control is-expanded has-icons-left">
                            {/* Register Topic Input */}
                            <input className="input"
                                type="text"
                                placeholder="请给博客多个风格以逗号间隔"
                                {...register("desired_tone_style", { required: "题目是必填项" })} 
                                />
                            <span className="icon is-small is-left">
                                <FaEdit/>
                            </span>
                            </p>
                            {/* 显示错误信息 */}
                            {errors.desired_tone_style && <p className="help is-danger">{errors.desired_tone_style.message}</p>}
                        </div>
                    </div>
                </div>

                {/* specific_instructions TODO 可以转换为 select 控件 */}
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">指令说明</label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <p className="control ">
                            {/* Register Topic Input */}
                            <textarea className="textarea"
                                type="textarea"
                                
                                placeholder="请给博客输入一个或者多个指令，以逗号间隔"
                                {...register("specific_instructions", { required: "题目是必填项" })} 
                                >
                            </textarea>
                            </p>
                            {/* 显示错误信息 */}
                            {errors.specific_instructions && <p className="help is-danger">{errors.specific_instructions.message}</p>}
                        </div>
                    </div>
                </div>
                <div className="field">
                    <button className="button is-success" type="submit">
                        提交
                    </button>
                </div>
            </form>

        </div>
        </>
    )

}

export default UserRequestComp;