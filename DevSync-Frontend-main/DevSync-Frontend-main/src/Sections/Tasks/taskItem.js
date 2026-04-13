import {LiaFolderOpen} from 'react-icons/lia'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function TaskItem(props){
    let [completed,setCompleted] = useState(props.isCompleted);
    let navigate = useNavigate();
    useEffect(()=>{
        setCompleted(props.isCompleted);
    },[props.isCompleted])
    return(
        <div className='cursor-pointer outlin rounded-xl bg-blue-600 my-2 p-4 flex gap-3 justify-between'>
            <div className='
                flex outlie w-fit items-center justify-center gap-4'>
                <div onClick={(e)=>{
                        if(completed)
                        {
                            axios.post(`${process.env.REACT_APP_BACKEND_URL}/task/update`,{
                                "projectID":props.projectID, 
                                "nodeID":props.nodeID,
                                "taskID":props.taskID,
                                "isCompleted":false, 
                            },{ headers: { Authorization:localStorage.getItem('jwtToken') } }).then(res=>{
                                props.assigned(val=>val+1);
                                props.completed(val=>val-1);
                                setCompleted(false);
                                e.target.classList.toggle("bg-white")
                            }).catch(e=>{
                                console.log(e);
                            })
                        }
                        else
                        {
                            axios.post(`${process.env.REACT_APP_BACKEND_URL}/task/update`,{
                                "projectID":props.projectID, 
                                "nodeID":props.nodeID,
                                "taskID":props.taskID,
                                "isCompleted":true, 
                            },{ headers: { Authorization:localStorage.getItem('jwtToken') } }).then(res=>{
                                props.assigned(val=>val-1);
                                props.completed(val=>val+1);
                                setCompleted(true);
                                e.target.classList.toggle("bg-white")
                                
                            }).catch(e=>{
                                console.log(e);
                            })
                        }
                    }} 
                    className={`${completed?"bg-white":""} outline transition-all cursor-pointer min-h-[15px] min-w-[15px]`}>

                </div>
                <div  className={`${completed?'line-through opacity-50':''}`}>
                    {props.task}
                </div>
            </div>
            <div onClick={()=>{
                navigate("/"+props.projectID);
            }} className='min-w-fit flex outlin items-center justify-center gap-2'>
                <div className='text-xl outlin'>
                    <LiaFolderOpen/>
                </div>
                <div className='outlin min-w-fit'>
                    {props.project}
                </div>
            </div>
        </div>
    )
}