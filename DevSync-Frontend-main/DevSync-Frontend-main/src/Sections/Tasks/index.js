import {Doughnut} from 'react-chartjs-2' 
import {Chart as ChartJs,Tooltip,Title, ArcElement, Legend} from 'chart.js'
import TaskItem from './taskItem';
import { useState,useEffect } from 'react';
import axios from 'axios';
export default function Tasks(props){
    
    let [completed,setCompleted] = useState(0);
    let [assigned,setAssigned] = useState(0);
    let [tasksList,setTasksList] = useState([]);
    useEffect(()=>{
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/task/fetchByUser`,{ headers: { Authorization:localStorage.getItem('jwtToken') } })
      .then(res=>{
        let data = res.data.tasks;
        data.forEach(tsk=>{
          if(tsk.isCompleted)
          {
            setCompleted(count=>++count);
          }
          else
          {
            setAssigned(count=>++count);
          }
          setTasksList(tasks=>[...tasks,<TaskItem assigned={setAssigned} assignedTo={tsk.assignedTo} taskID={tsk.taskID} nodeID={tsk.nodeID} completed={setCompleted} projectID={tsk.projectID} task={tsk.title} project={tsk.projectName} isCompleted ={tsk.isCompleted}/>])
        })

      }).catch(e=>{
        console.log(e);
      })
    },[])
    const data = {
        labels: [
          'Assigned',
          'Completed',
        ],
        datasets: [{
          data: [assigned, completed],
          borderWidth:0,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 2
        }]
      };
      const options = {
        cutout:"70%" 
        // Adjust the cutout percentage here
      };
      ChartJs.register(Title,Tooltip,ArcElement)
    return (
        <div className="h-[100vh] entranceAnimate flex justify-center items-center">
            <div className="outlin  gap-2 text-white flex w-[80%] min-h-[400px] md:flex-col">
                <div className="w-full outlin max-h-[500px] overflow-scroll p-4 flex flex-col "> 
                    {tasksList}
                </div>
                <div className="relative md:h-[300px] md:mt-10 outlin w-[400px] md:w-full flex justify-center items-center">
                    <Doughnut className='cursor-pointer' data={data} options={options}/>
                    <div className='absolute text-[60px] pointer-events-none'>
                        {Math.floor((completed/(assigned+completed) || 0)*100)} %
                    </div>
                </div>
            </div>
        </div>
    )
}