import {TbSubtask} from 'react-icons/tb'
import Item from './item.js'
import {useEffect, useState} from 'react'
import {RiAddCircleLine} from 'react-icons/ri'
import CircularProgressWithLabel from './progress.js'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
export default function Tasks(props){

    const [vis,setVis] = useState(false);
    const [tasksDone,setDone] = useState(0);
    const [task,setTask] = useState('');
    const [taskList,setTaskList] = useState([]);
    const [adding,setAdding] = useState(false);
    const location = useLocation();

    useEffect(()=>{
        // fetch tasks for this project id and node id from the backend and update taskList:
        
        let projectId = location.pathname.substring(1);
        setTaskList([])
        setDone(0);
        axios.post( `${process.env.REACT_APP_BACKEND_URL}/task/fetchByID`,{
            projectID:projectId,
            nodeID:props.nodeID
        },{ headers: { Authorization:localStorage.getItem('jwtToken') } }).then(res=>{
            let data = res.data.tasks;
            data.forEach(dat=>{
                if(dat.isCompleted===true)
                {
                    setDone(count=>++count);
                }
                setTaskList(list=>[...list,<Item projectID={projectId} team={props.team} nodeID={props.nodeID} taskID={dat.taskID}  setTasksDone={setDone} isCompleted={dat.isCompleted} task={dat.title} isAssigned={dat.isAssigned} assigned={dat.assignedTo}/>])
            })
        }).catch(e=>{
            console.log(e);
        })

    },[])
    let handleTaskAdd = (e)=>{
        e.preventDefault();
        if(task!=='')
        {
            setAdding(true);

            // first send this to backend and then update
            let projectId = location.pathname.substring(1);
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/task/create`,{
                title:task, 
                projectID:projectId, 
                nodeID:props.nodeID, 
                taskID:taskList.length+1,
                isAssigned:false,
                isCompleted:false, 
                assignedTo:"Unassigned"

            },{ headers: { Authorization:localStorage.getItem('jwtToken') } }).then(res=>{
                
                setTaskList(list=>[...list,<Item team={props.team} nodeID={props.nodeID} taskID={taskList.length+1} projectID={projectId}  setTasksDone={setDone} isCompleted={false} task={task} isAssigned={false} assigned="Unassigned"/>])
                setAdding(false);


            }).catch(e=>{
                console.log(e);
                setAdding(false);
            })
        }
    }
    useEffect(()=>{
    
        if(tasksDone===taskList.length && taskList.length!==0)
        {
            props.setActive(false);
            // all the tasks are completed.
            // get all id of this node and send to backend, update, set active to all of its child using edge table
            
        }
        else
        {
            props.setActive(true);
        }
    },[tasksDone,taskList])
    return (
        <div className="outlin relative flex justify-center items-center ">
            <div onClick={()=>setVis(!vis)} className='text-4xl text-gray-400 hover:text-black cursor-pointer'>
                <TbSubtask/>
            </div>
            <div className='absolute top-[50px] outlin'>
               <CircularProgressWithLabel value={(tasksDone/taskList.length || 0)*100}/>
            </div>
           {<div className={`${vis?'':'hidden'} outlin px-4 absolute left-[100%] top-0`}>
                <div className=' flex flex-col rounded-lg shadow-xl  bg-white p-4 '>
                    <form onSubmit={handleTaskAdd} className='flex min-w-[400px] justify-evenly outlin items-center my-3 gap-3 w-full'>
                            {/* <TextField  onChange={(e)=>setTask(e.target.value)} required className='nodrag ' label="add task" variant='outlined'/> */}
                            <input onChange={(e)=>setTask(e.target.value)} required placeholder='add task'  className='nodrag placeholder:opacity-50 placeholder:text-black   placeholder:font-light px-3 py-2 border-[1px] w-full outline-none bg-inherit' type="text" />
                            {/* <FreeSolo assigned={setAssigned}/> */}
                            {/* <input required placeholder='assign user'  className='h-full placeholder:opacity-50 placeholder:text-black  placeholder:font-light px-2 py-1 border-[1px] w-[120px] outline-none bg-inherit ' type="text" /> */}
                        
                            {!adding?(
                            <button type='submit' className='bg-blue-700 text-white text-4xl rounded-full flex justify-center items-center'>
                                <RiAddCircleLine/>
                            </button>):(
                                <div className=''>
                                    <CircularProgress className='text-blue-700 h-8 w-8'/>
                                </div>
                            )}
                    </form>
                    <div className='bg-[#ebebebb5] rounded-lg px-2  text-black '>
                        {taskList}
                    </div>

                </div>
            </div>}

        </div>
    )
}