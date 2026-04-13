import {AiOutlineUsergroupAdd} from 'react-icons/ai'
import { RxCross1 } from 'react-icons/rx'
import { useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
export default function SendInvite(props){

    let [userName,setUserName] = useState('');
    let [role,setRole] = useState('');
    let [adding,setAdding] = useState(false);
    let [error,setError] = useState(false);
    let location = useLocation();
    let handleSubmit = (e)=>{
        e.preventDefault();
        setAdding(true);
        setError(false);
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/invite/send`+location.pathname,{
            "toInvite":userName.trim(),
            "role":role.trim()
        },{ headers: { Authorization:localStorage.getItem('jwtToken') } }).then(res=>{
            props.setInviteVis(false)
            setAdding(false);
            setUserName('');
            setRole('');
        }).catch(e=>{
            console.log(e);
            setAdding(false);
            let error = e.response.status;
            if(error===404)
            {
                setError(true);
            }
        })
    }
    return (
        <div className={`absolute
        ${props.vis?"scale-100":"scale-0"}
        transition-all
        w-[400px]
        shadow-lg rounded-lg
        bg-white
        px-3 py-8
        `}>
            <div className="text-blue-700 flex justify-between px-3 text-2xl">
                Add to Team
                <div onClick={()=>props.setInviteVis(false)} className='flex items-center cursor-pointer '>
                    <RxCross1/>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="flex gap-4 justify-center items-center outlin px-4 mt-4">
                <input onChange={(e)=>{
                    setUserName(e.target.value)
                    setError(false);
                    }} required pattern="[' ']*[^' ']+[' ']*" className={`${error?'border-red-600':'border-blue-700'} outline-none w-1/2 border-b-2 px-2 py-1`} placeholder="email" type="text" />
                <input onChange={(e)=>{
                    setRole(e.target.value)
                    setError(false);
                    }} required className=" outline-none w-1/2 border-b-2 border-blue-700 px-2 py-1 " placeholder="role" type="text" />
                {
                    adding?(
                        <div className='flex justify-center items-center'>
                            <CircularProgress className='h-6 w-6 text-blue-700'/>
                        </div>
                    ):(
                        <button type='submit' className="flex justify-center items-center rounded-full p-[5px] cursor-pointer bg-blue-700 text-white text-2xl ml-4 ">
                            <AiOutlineUsergroupAdd/>
                        </button>
                    )
                }
            </form>
        </div>
    )
}