import AgentRegionComp from "../components/AgentRegionComp";
import TaskRegionComp from "../components/TaskRegionComp";
import WorkspaceComp from "../components/WorkspaceComp";
import { HomePageProvider } from "../context/HomePageContext";


const HomePage = ()=>{
    return (
        <HomePageProvider>
            <div className="mt-6 ml-3 mr-3">
                <div className="columns">
                    <div className="column is-one-third">
                        <WorkspaceComp/>
                    </div>
                    <div className="column">
                        <TaskRegionComp/>
                    </div>
                    <div className="column">
                        <AgentRegionComp/>
                    </div>
                </div>
            </div>
        </HomePageProvider>
    )
}

export default HomePage