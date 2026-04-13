import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { useEffect,useState } from 'react';
import {AiOutlineClose} from 'react-icons/ai'
import { useLocation,useNavigate } from 'react-router-dom'
export default function NewProject(props){

    let navigate = useNavigate();
    let location = useLocation();
    let [projectName,setProjectName] = useState('');
    let [creating,setCreating] = useState(false);
    let handleClose=(e)=>{
        if(location.pathname==="/new")
        {
            navigate("/profile");
        }
        else
        {
            props.setNewVis(false)
        }
    }
    let handleSubmit = (e)=>{

        setCreating(true);
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/project/save`,{
            "name":projectName,
            "isNew":true,
        },{ headers: { Authorization:localStorage.getItem('jwtToken') } }).then(res=>{
            let url = res.data.projectID;
            setCreating(false);
            props.setNewVis(false);
            navigate("/"+url);

        }).catch(e=>{
            setCreating(false);
            console.log(e);
        })
    }
    return (
        <div className={`
        ${props.vis?"scale-100":"scale-0"}
        shadow-lg
        py-6
        rounded-lg
        transition-all
        absolute outlin max-w-[300px] w-full min-h-[100px] bg-white`}>
           <div className="flex items-center justify-between outlin mb-2 px-4 py-2 text-lg text-blue-700 ">
            Create New Project
            <div onClick={handleClose} className='mx-2 text-2xl cursor-pointer'>
                <AiOutlineClose/>
            </div>
           </div>
           <form onSubmit={handleSubmit} className="flex outlin justify-center">
            <input onChange={e=>setProjectName(e.target.value)} required placeholder="Untitled Project" className="p-2 outline-none border-b-2 border-blue-700" type="text" name="" id="" />
            {creating?(
            <div className='ml-4 flex items-center justify-center'>
                <CircularProgress className='text-blue-700 h-8 w-8 '/>
            </div>):(
            <button type='submit' className="flex justify-center items-center ml-4 px-2 bg-blue-700 text-white rounded-sm cursor-pointer">
                Create
            </button>)}
           </form>
        </div>
    )
}