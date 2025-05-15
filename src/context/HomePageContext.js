import { createContext, useState, useEffect,useRef } from "react";
import { getUser,fetchAgents,getAgentList } from "../api";
import { ToastContainer, toast } from 'react-toastify';

const baseURL = process.env.REACT_APP_BASE_URL || '/api'; // 如果环境变量未设置，提供一个默认值


const HomePageContext = createContext({});


export const HomePageProvider = ({ children }) => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [notification, setNotification] = useState(null);

    
    // user
    const [user,setUser] = useState(null);
    const [isEditMode,setIsEditMode] = useState(false);

    // messages
    const [messages,setMessages] = useState([])

    // agent
    const [agents, setAgents] = useState([]);
    const [currentAgent, setCurrentAgent] = useState(null);

    // blog
    const [blogContent,setBlogContent] = useState(null);
    const [feedbackSummary,setFeedbackSummary] = useState(null);
    const [specificPoints,setSpecificPoints] = useState([]);

    // title
    const [title,setTitle] = useState('');
    const [topic,setTopic] = useState('');
    const [tags,setTags] = useState([]);
    const [references,setReferences] = useState([]);
    const [instructions,setInstructions] = useState([]);
    const [toneStyle,setToneStyle] = useState([]);
    const [targetAudience,setTargetAudience] = useState([]);

    // message
    const [newMessage, setNewMessage] = useState(null);
    const [response, setResponse] = useState(null);

    // isExpandUserRequest
    const [isExpandUserRequest,setIsExpandUserRequest] = useState(false);
    const [taskList,setTaskList] = useState([

        {name:"pending_assignment",content:" 待 Peter 分配给 Ava" },
        {name:"writing_in_progress",content:" Ava 正在撰写" },
        {name:"pending_editorial_review",content:" 等待 Emily 审核" },
        {name:"editing_in_progress",content:"Emily 正在审核" },
        {name:"pending_writer_revision",content:"等待 Ava 根据反馈修改" },
        {name:"revision_in_progress",      content:" Ava 正在修改" },
        {name:"pending_chief_final_review",  content:"等待 Peter 最终审核" },
        {name:"approved_for_publication",  content:" Peter 批准发布" },
        {name:"requires_further_human_intervention",  content:"需要人工介入决策" },
        {name:"rejected", content:"被拒绝" },
        {name:"published",content:" (如果系统还负责发布)" }
    ]);

    const getContentByName = (name) =>{
        const task = taskList.find(task => task.name === name);
        return task ? task.content : undefined;
        }

    const [blogFilePath,setBlogFilePath] = useState("/static/blogs/2738b3a4/2cabbea9.txt")
    const [tasks,setTasks] = useState([
        {name:"pending_assignment", agent:"Peter",content:" 待 Peter 分配给 Ava" },
    ]
    )

    const websocket = useRef(null);

    useEffect(() => {
        websocket.current = new WebSocket('ws://localhost:8000/ws');

        websocket.current.onopen = () => {
        toast('WebSocket 已经连接');
        };

        websocket.current.onclose = () => {
        toast('WebSocket 已断开');
        };

        websocket.current.onmessage = (event) => {
            try {
                const result = JSON.parse(JSON.parse(event.data))
                console.log(result)
                if(result.messageType === "action"){
                    if (result.agent.name === "Ava"){
                        setBlogContent(result.content)
                    }
                    if(result.agent.name === "Emily"){
                        // const 
                        const feedback = JSON.parse(result.content)
                        console.log(feedback)
                        setFeedbackSummary(feedback.feedback_summary)
                        setSpecificPoints(feedback.specific_points)
                    }


                    setCurrentAgent(result.agent)
                    setMessages((prevMessages)=>[...prevMessages,{
                        "role":"assistant",
                        "iconUrl":result.agent.iconUrl,
                        "name":result.agent.name,
                        "content":getContentByName(result.state)
                    }])

                    // human 进入环境
                        
                    websocket.current.send(JSON.stringify({
                        action:"create",
                        taskId:result.taskId,
                        state:result.next
                    }));

                    setTasks((preTasks)=>[...preTasks,
                        {
                            name:result.state,       
                            agent:result.agent.name,
                            content:getContentByName(result.state)
                        },
                    ])

                }

                
                // setMessages((prevMessages) => [...prevMessages, result]);
            } catch (error) {
            console.error("Error parsing modified JSON:", error);
            }
        };

        websocket.current.onerror = (error) => {
        console.error('WebSocket error:', error);
        };

        return () => {
        if (websocket.current && websocket.current.readyState === WebSocket.OPEN) {
            websocket.current.close();
        }
        };
    }, []);


   useEffect(() => {
        let isMounted = true; // 添加一个标志来处理组件卸载的情况

        const fetchAgents = async () => {
            setLoading(true);
            setError(null); // 重置错误状态

            try {
                const response = await getAgentList();
                if (isMounted) {
                    response.data.data.forEach(agent => {
                        agent.iconUrl = `${baseURL}${agent.iconUrl}`
                        return agent
                    });
                    setAgents(response.data.data); // 根据你的后端返回结构调整
                    setCurrentAgent(response.data.data[2])
                    setLoading(false);

                }
            } catch (err) {
                if (isMounted) {
                    setError(err);
                    setLoading(false);
                    console.error("获取 Agent 列表失败:", err);
                }
            }
        };

        const fetchUser = async () => {
            try {
                const userData = await getUser();
                if (isMounted) {
                    userData.data.iconUrl = `${baseURL}${userData.data.iconUrl}`
                    setUser(userData.data);
                    console.log("用户信息获取成功:", userData.data.name);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err);
                    console.error("获取用户信息失败:", err);
                }
            }
        };

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            await Promise.all([fetchAgents(), fetchUser()]);
            
            if (isMounted) {
                setLoading(false);
            }
        };

        fetchData();

        // cleanup function 在组件卸载时执行
        return () => {
            isMounted = false;
        };
    }, []); // 空依赖数组表示 effect 只在组件挂载和卸载时执行一次

    const startAction = async ()=>{
        
        if(websocket.current && websocket.current.readyState === WebSocket.OPEN){
            console.log("start action");
            toast.info("启动任务");
            websocket.current.send(JSON.stringify({
                action:"create",
                taskId:"",
                state:"pending_assignment"
            }));
        }
    }


    const sendMessage = async (data) => {

        setError(null);
        setResponse(null);

        try {
            setLoading(true)
            if (websocket.current && websocket.current.readyState === WebSocket.OPEN) {
                const humanMessage = {
                    userId:user.id,
                    agentId:currentAgent.id,
                    role:"user",
                    content:data.query
                }
                setMessages((prevMessages) => [...prevMessages, humanMessage]);
                websocket.current.send(JSON.stringify(humanMessage));
                setNewMessage(null);
                }

        } catch (err) {
            console.log(err)
            setError(err);
        } finally {
            setLoading(false);
        }
    };


    return (
        <HomePageContext.Provider value={{
            loading, setLoading,
            error, setError,
            notification, setNotification,
            isEditMode,setIsEditMode,

            blogFilePath,setBlogFilePath,
            blogContent,setBlogContent,

            agents, setAgents,
            currentAgent, setCurrentAgent,

            messages,setMessages,
            startAction,

            isExpandUserRequest,setIsExpandUserRequest,
            tasks,setTasks,

            title,setTitle,
            topic,setTopic,
            tags,setTags,
            references,setReferences,
            instructions,setInstructions,
            toneStyle,setToneStyle,
            targetAudience,setTargetAudience,

            feedbackSummary,setFeedbackSummary,
            specificPoints,setSpecificPoints,

            sendMessage


     }}>
        <ToastContainer />
            {children}
        </HomePageContext.Provider>
    )
}

export default HomePageContext;