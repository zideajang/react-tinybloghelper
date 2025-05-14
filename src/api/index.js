
import axios from 'axios';

// 设置 Axios 的 baseUrl
// const baseURL = '/api'; // 假设你的后端 API 服务的基础路径是 /api
const baseURL = process.env.REACT_APP_BASE_URL || '/api'; // 如果环境变量未设置，提供一个默认值

const instance = axios.create({
  baseURL: baseURL,
  timeout: 100000, // 可选: 设置请求超时时间 (毫秒)
  // headers: { 'Authorization': 'Bearer YOUR_AUTH_TOKEN' } // 可选: 设置全局请求头
});

/**
 * 获取 agent 列表
 * @returns {Promise<AxiosResponse>}
 */
export const getAgentList = async () => {
  return await instance.get('/api/agents');
};

// 获取 用户
export const getUser = async () => {
  console.log("getUser")
  return await instance.get('/api/users/2738b3a4-8928-417f-94ec-e6567a1092ff');
};

export const fetchBlogFile = async (filePath) => {
      try {
        // 使用 axios 获取文本文件内容
        const response = await instance.get(filePath, {
          responseType: 'text' // 确保以文本形式接收响应
        });
        
        return response.data;
      } catch (err) {
        return err
      } 
};

// 获取 user 
// GET/users/ {username}


// 获取 Agent 列表
//GET/agents

// 

// chat