import {AiOutlineUser,AiOutlineUserAdd} from 'react-icons/ai'
import { useEffect, useState } from 'react'
import CustomAutoComplete from './customAuto';
import axios from 'axios';
export default function Item(props){
    const [assignBox,setAssignBox] = useState(false);
    const [completed,setCompleted] = useState(props.isCompleted);
    const [isAssigned,setIsAssigned] = useState(props.isAssigned);
    const [assigned,setAssigned] = useState(props.assigned);
    const [name,setName] = useState('');
    let fetchDetails = ()=>{
        // before this check if jwt token even exist
          axios.get(`${process.env.REACT_APP_BACKEND_URL}/fetchDetails`,{ headers: { Authorization:localStorage.getItem('jwtToken') } }).then(res=>{
            setName(res.data.name);
            // console.log("no error name is " + res.data.name);
          }).catch(e=>{ 
            console.log(e);
          })
      }
   
    // should only be editable by the assigned.
    // if not assigned to anyone, should be editable 
    useEffect(()=>{
        fetchDetails();
    },[])
    // opacity-50 cursor-not-allowed and pointers-event-none in checkbox
    return(
        <div className={`${(name===assigned || !isAssigned)?'':'opacity-50 cursor-not-allowed'} flex gap-2 min-w-[400px] outlin p-3 items-center justify-between`}>
            <div className='flex gap-3 items-center justify-center'>
                <div onClick={()=>{
                    
                        if(!completed)
                        {
                            setCompleted(true);
                            props.setTasksDone(task=>++task);

                            axios.post(`${process.env.REACT_APP_BACKEND_URL}/task/update`,{
                                "projectID":props.projectID, 
                                "nodeID":props.nodeID,
                                "taskID":props.taskID,
                                "isCompleted":true,
                            },{ headers: { Authorization:localStorage.getItem('jwtToken') } }).then(res=>{
                                
                            }).catch(e=>{
                                console.log(e);
                                setCompleted(false);
                                props.setTasksDone(task=>--task);

                            })
                        }
                        else
                        {
                            setCompleted(false);
                            props.setTasksDone(task=>--task);
                            axios.post(`${process.env.REACT_APP_BACKEND_URL}/task/update`,{
                                "projectID":props.projectID, 
                                "nodeID":props.nodeID,
                                "taskID":props.taskID,
                                "isCompleted":false,
                            },{ headers: { Authorization:localStorage.getItem('jwtToken') } }).then(res=>{
                                
                            }).catch(e=>{
                                console.log(e);
                                setCompleted(true);
                                props.setTasksDone(task=>++task);

                            })
                        }

                    }} className={`${(name===assigned || !isAssigned)?'':'pointer-events-none'} min-h-[15px] cursor-pointer ${completed?"bg-blue-500":"outline"} transition-all min-w-[15px]`}>

                </div>
                <div className={`outlin transition-all ${completed?"line-through opacity-50":""} text-sm`}>
                    {props.task}
                </div> 
            </div>
            <div className='min-w-fit relative outlin flex  gap-1 items-center justify-center'>
                {!isAssigned && 
                    <div onClick={()=>setAssignBox(true)} className='cursor-pointer text-xl'>
                        <AiOutlineUserAdd/>
                    </div>
                }
                {assignBox && 
                    <CustomAutoComplete team={props.team}  nodeID={props.nodeID} projectID={props.projectID} taskID={props.taskID}  close={setAssignBox} isAssigned={setIsAssigned} setAssigned={setAssigned} />
                }
                {isAssigned &&
                    <div className='flex gap-1 items-center'>
                        <AiOutlineUser/>
                     {assigned}
                    </div>
                }
            </div>
        </div>
    )
}