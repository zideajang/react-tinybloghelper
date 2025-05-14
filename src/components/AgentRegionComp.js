import { useContext } from "react";
import HomePageContext from "../context/HomePageContext";
import ToolSetComp from "./ToolsetComp";
import AgentListComp from "./AgentListComp";
import ChatInputComp from "./ChatInputComp";
import MessageListComp from "./MessageListComp";


const AgentRegionComp = ()=>{
    return (
        <div className="is-flex is-flex-direction-column" 
                    style={{
                        height:"100vh"
                    }}>
                    <div>
                        <AgentListComp/>
                    </div>
                    <div className="is-flex-grow-1" style={{
                        marginBottom:'-10px'
                    }}>
                        <MessageListComp/>
                    </div>
                    <div style={{
                        transform: 'translateY(-100px)'
                    }}>
                        <ChatInputComp/>
                    </div>
                </div>
    )
}

export default AgentRegionComp;