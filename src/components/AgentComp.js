import { useContext } from "react";
import HomePageContext from "../context/HomePageContext";



const AgentComp = ({agent,clickOnAgent})=>{
    const {
        currentAgent
    } = useContext(HomePageContext)

    return (
  <div class={`box ${currentAgent.name===agent.name?"has-background-primary-10 has-text-primary-10-invert":""}`} onClick={clickOnAgent(agent)}>
    <div className="is-flex pt-3 is-justify-content-center ">
        <figure class="image is-64x64 is-1by1 mb-3">
            <img
                className="is-rounded"
                src={agent.iconUrl}
                alt={agent.name}
                />
            </figure>
    </div>
      <p className="is-size-5 has-text-centered">{agent.name} <span></span></p>
      <br />
      <p className="is-size=7 is-hidden">{agent.description}</p>
</div>
    )
}

export default AgentComp;