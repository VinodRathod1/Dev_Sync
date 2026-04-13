import Temp from "../../React Flow/index.js";
import Dock from "../Dock";
import OpenProject from "../Dock/openProject";
import ProjectTitle from "../Dock/projectTitle";
import Team from "../Team";
import { useState } from "react";
import NewProject from "../misc/newProject";
import Invites from "../Invite";
import SendInvite from "../misc/sendInvite";
import { useLocation,useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import ProjectItem from "../Dock/projectItem.js";
import {BsArrowLeft} from 'react-icons/bs'
export default function ProjectPage(props){
    const location = useLocation();
    const navigate = useNavigate();
    const [openVis,setOpenVis] = useState(false);
    const [newVis,setNewVis] = useState(false);
    const [teamVis,setTeamVis] = useState(false);
    const [inviteVis,setInviteVis] = useState(false);
    const [projectTitle,setProjectTitle] = useState("Untitled Project");
    const [edges,setEdges] = useState([]);
    const [nodes,setNodes] = useState([]);
    const [projectID,setProjectID]= useState('');
    const [projects,setProjects] = useState([]);
    const [team, setTeam] = useState([]);
    const [checking,setChecking] = useState(true)
    let fetchProject = ()=>{
        setProjects([])
        setChecking(true);
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/project/view`,{ headers: { Authorization:localStorage.getItem('jwtToken') } }).then(res=>{
            let projects = res.data.projects;
            for(let i=0;i<projects.length;i++)
            {
                setProjects(pr=>[...pr,<ProjectItem key={i} projectId={projects[i].ID} name={projects[i].name} owner={projects[i].owner} creationDate="05-11-2023"/>])
            }
            setChecking(false);
        })
    }
    let handleSave = ()=>{

        let tempNodes = [];
        let tempEdges = [];
        for(let i=0;i<nodes.length;i++)
        {
            tempNodes.push(
                    {
                        "id":nodes[i].id,
                        "projectID":projectID,
                        "position":[nodes[i].position.x,nodes[i].position.y],
                        "title":nodes[i].data.title,
                        "description":nodes[i].data.desc,
                        "color":nodes[i].data.color
                    }
                )
        }
        for(let i=0;i<edges.length;i++)
        {
            tempEdges.push([edges[i].id,edges[i].source,edges[i].target]);
        }

        axios.post(`${process.env.REACT_APP_BACKEND_URL}/project/save`,{
            "name":projectTitle,
            "isNew":false,
            "projectID":projectID,
            "edgeList":tempEdges,
            "nodes":tempNodes
        },{ headers: { Authorization:localStorage.getItem('jwtToken') } }).then(res=>{
            console.log(res);
        }).catch(e=>{
            console.log(e)
        })
    }
    useEffect(()=>{
        setNodes([]);
        setEdges([])
        setProjectID('');
        if(location.pathname==="/new")
        {
            setNewVis(true);
        }
        else
        {
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/project/open`+location.pathname,{ headers: { Authorization:localStorage.getItem('jwtToken') } }).then(res=>{
                
                setProjectID(location.pathname.substring(1));
                let data = res.data;
                setProjectTitle(data.name);
                let nodeData = data.nodes;
                let edgeData = data.edgeList;
                setTeam(data.usersPerm);
                nodeData.forEach(node=>{
                    setNodes(nodes=>[...nodes,{id:`${node.id}`,type:"special",position:{x:node.position[0],y:node.position[1]},data:{

                        title:node.title,
                        desc:node.description,
                        teamList:data.usersPerm,
                        color:node.color,
                        name:props.name
                    }}])
                })
                edgeData.forEach(edge=>{
                    setEdges(edges=>[...edges,{id:`${edge[0]}`,type:"default",source:`${edge[1]}`,target:`${edge[2]}`}])
                })
            }).catch(e=>{
                console.log(e)
            })
        }
    },[location.pathname])

  
    return (
    <div className="overflow-hidden relative w-[100vw] h-[100vh] flex justify-center items-center">
        <div onClick={()=>navigate("/profile")} className="absolute top-10 left-10 text-4xl z-[100] cursor-pointer rounded-full p-2 text-white bg-blue-700 ">
            <BsArrowLeft/>
        </div>
        <ProjectTitle title={projectTitle}/>
        <Temp team={team} setEdges={setEdges} setNodes={setNodes} edges={edges} nodes={nodes}/>
        <Dock fetchProject={fetchProject} handleSave={handleSave} setInviteVis={setInviteVis} setOpenVis = {setOpenVis} setNewVis={setNewVis} setTeamVis={setTeamVis}/>
        <OpenProject checking={checking} projects={projects} vis={openVis} setOpenVis={setOpenVis}/>
        <Team team={team} vis={teamVis} setTeamVis={setTeamVis}/>
        <NewProject vis={newVis} setNewVis={setNewVis}/>
        <Invites/>
        <SendInvite vis={inviteVis} setInviteVis={setInviteVis}/>
    </div>
    )
}