import { useCallback, useEffect, useMemo, useRef } from "react";
import { ReactFlow,useNodesState,useEdgesState, addEdge, Background,applyNodeChanges,applyEdgeChanges, ReactFlowProvider, StraightEdge, StepEdge, } from "reactflow" 
import 'reactflow/dist/style.css';
import CustomNode from "./custom";
import AddIcon from "../AddIcon";
import { useReactFlow } from "reactflow";
import {useState} from 'react';
let id = 1;
const getId = () => `${id++}`;
function Check(props){

    let HEIGHT = window.innerHeight;
    let WIDTH = window.innerWidth;

    const [nodes,setNodes] = useState(props.initialNodes)
    const [edges,setEdges] = useState(props.initialEdges)
    const onNodesChange = useCallback(
      (changes) => {
        setNodes((nds) => applyNodeChanges(changes, nds))
        props.setNodes((nds) => applyNodeChanges(changes, nds))

      },
      [],
    );
    const onEdgesChange = useCallback(
      (changes) => {
        setEdges((eds) => applyEdgeChanges(changes, eds))
        props.setEdges((eds) => applyEdgeChanges(changes, eds))

      },
      [],
    );
    useEffect(()=>{
      setNodes(props.initialNodes);
      for(let i=0;i<props.initialNodes.length;i++)
      {
        if(props.initialNodes[i].id>=id)
        {
          id = props.initialNodes[i].id + 1;
        }
      }

    },[props.initialNodes])
    useEffect(()=>{
      setEdges(props.initialEdges);
    },[props.initialEdges])

    const reactFlowWrapper = useRef(null);
    const connectingNodeId = useRef(null);
    const nodeType = useMemo(()=>({special:CustomNode}),[])
    const { project } = useReactFlow();
    let onConnect = useCallback(
        (connection)=>{
            setEdges(edg=>addEdge(connection,edg))
            props.setEdges(edg=>addEdge(connection,edg))
    },[setEdges])
    let addNode = ()=>{
      let newID= getId();
        setNodes(nods =>[...nods, { id:newID,type:"special",data:{title:'',desc:'',teamList:props.team,color:'white'}, position: { x:WIDTH/2 - 100, y: HEIGHT/2 -100}}])
        props.setNodes(nods =>[...nods, { id:newID,type:"special",data:{title:'',desc:'',teamList:props.team,color:'white'}, position: { x:WIDTH/2 - 100, y: HEIGHT/2 -100}}])

    }
    const onConnectStart = useCallback((_, { nodeId }) => {
        connectingNodeId.current = nodeId;
      }, []);
      const onConnectEnd = useCallback(
        (event) => {
          const targetIsPane = event.target.classList.contains('react-flow__pane');
    
          if (targetIsPane) {
            // we need to remove the wrapper bounds, in order to get the correct position
            const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
            const id = getId();
            const newNode = {
              id,
              type:"special",
              data:{title:'',desc:'',teamList:props.team,color:'white'},
              // we are removing the half of the node width (75) to center the new node
              position: project({ x: event.clientX - left - 75, y: event.clientY - top })
            };
            
            setNodes((nds) => nds.concat(newNode));
            props.setNodes((nds) => nds.concat(newNode));
            setEdges((eds) => eds.concat({ id, source: connectingNodeId.current, target: id,type:"default"}));
            props.setEdges((eds) => eds.concat({ id, source: connectingNodeId.current, target: id,type:"default"}));

          }
        },
        [project]
      );
    return(
        <div ref={reactFlowWrapper} className=" h-full w-full outline">
           <ReactFlow  
           nodeTypes={nodeType} 
           defaultEdgeOptions={{animated:true}} 
           nodes={nodes} 
           edges={edges} 
           onNodesChange={onNodesChange} 
           onEdgesChange={onEdgesChange} 
           onConnect={onConnect}
           onConnectStart={onConnectStart}
           onConnectEnd={onConnectEnd}

           >
                <Background variant="dots"/>
            </ReactFlow>
            <div onClick={addNode} className="absolute bottom-10 sm:bottom-20 right-10 z-[10] bg-white outlin rounded-[100%] w-[50px] h-[50px]">
                <AddIcon/>
            </div>
            
        </div>
    )

}
export default function Temp(props){

  return (
    <ReactFlowProvider>
        <Check  team={props.team} setEdges={props.setEdges} setNodes={props.setNodes} initialEdges={props.edges} initialNodes={props.nodes}/>
    </ReactFlowProvider>
    )
}