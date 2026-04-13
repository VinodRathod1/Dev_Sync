import { useEffect } from 'react'
import {Handle,Position} from 'reactflow'
import Node from '../Node'
export default  function CustomNode(props){

    return (
        <div>
            <Handle className='opacity-0' type='target' id="top" position={Position.Top}/>
                <Node team={props.data.teamList} color={props.data.color} nodeID={props.id} title={props.data.title} desc={props.data.desc} />
            <Handle className='h-[15px] w-[15px] absolute bottom-0  rounded-full outline-none shadow-lg bg-white border-4 border-blue-700' type='source' id="bottom" position={Position.Bottom}/>
        </div>
    )
}