import { useContext } from "react";
import { useForm } from "react-hook-form";

import HomePageContext from "../context/HomePageContext";
import { CiExport } from "react-icons/ci";
import { FaRegSave } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import { FaFileAlt } from "react-icons/fa";

const ToolSetComp= ()=>{
    const { handleSubmit, register, formState: { errors } } = useForm();
    const {
        user,
        isEditMode,
        setIsEditMode,
    } =useContext(HomePageContext)

    const onSubmit = (data) => {
        console.log("Form data:", data);
        data.userId = user.id
    };

    return (
        <>
        {true && 
        <div className="level">
            <div className="level-left">
                <div className="buttons">
                    <button className="button">
                        <span className="icon">
                            <CiExport/>
                        </span>
                        <span>导出</span>
                    </button>
                    <button className="button">
                        <span className="icon">
                            <FaRegSave/>
                        </span>
                        <span>保存</span>
                    </button>
                    <button className="button" onClick={(event)=>setIsEditMode(!isEditMode)}>
                        <span className="icon">
                            <AiFillEdit/>
                        </span>
                        <span>{`${isEditMode?"预览模式":"编辑模式"}`}</span>
                    </button>
                </div>
            </div>
                <div className="level-item">
            <form onSubmit={handleSubmit(onSubmit)}>
           
                    <div className="field has-addons">
                        <div className="control has-icons-left">
                            <input
                                className={`input ${errors.title ? 'is-danger' : ''}`} // 根据是否有错误添加 Bulma 的 is-danger 类
                                type="text"
                                placeholder="创建博客"
                                {...register("title", { required: "简历标题是必填项" })} // 注册 title 字段并添加必填验证
                            />
                            <span class="icon is-small is-left">
                                <FaFileAlt/>
                            </span>
                            {errors.title && <p className="help is-danger">{errors.title.message}</p>} {/* 显示错误消息 */}
                        </div>
                        <div className="control">
                            <button className="button" type="submit">
                                创建
                            </button>
                        </div>
                    </div>
               
                </form>
            </div>
        
    </div>}
    </>
    )
}
export default ToolSetComp;