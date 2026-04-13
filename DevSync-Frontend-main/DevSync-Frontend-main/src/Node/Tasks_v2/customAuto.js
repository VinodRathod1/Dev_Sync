import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useState,useRef, useEffect } from "react";
import {AiOutlineUserAdd,AiOutlineClose} from 'react-icons/ai'
import { useLocation } from "react-router-dom";
export default function CustomAutoComplete(props){

    let [isSelected,setIsSelected] = useState(false);
    let [selected,setSelected] = useState('');
    let [userDivs,setUserDivs]=useState([]);
    let inputRef = useRef(null);
    let location = useLocation();
    let [users,setUsers] = useState([]);
    let [userMap,setUserMap] = useState(new Map());
    let [adding,setAdding] = useState(false);
    useEffect(()=>{
        const newMap = new Map(userMap);
        (props.team).forEach(mem=>{
            newMap.set(mem[0],mem[1]);
            setUsers(user=>[...user,mem[0]]);
        })
        setUserMap(newMap);
    },[props.team])
    let handleChange = e=>{
        setIsSelected(false);
        setSelected('');
        let input = e.target.value;
        setUserDivs([]);
        for(let i=0;i<users.length;i++)
        {
            if(users[i].toLowerCase().includes(input.toLowerCase()))
            {
                setUserDivs(list=>[...list,<div key={i} onClick={(e)=>{
                    setIsSelected(true);
                    setSelected(e.target.innerHTML);
                    inputRef.current.value = e.target.innerHTML;
                }} className="transition-all cursor-pointer px-6 py-3 hover:bg-blue-700 hover:text-white">{users[i]}</div>])
            }
        }
    }
    let handleAdd = ()=>{
        if(isSelected)
        {
            // make a call to the backend here only.
            setAdding(true);
            let projectId = location.pathname.substring(1);
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/task/assign`,{
                projectID:projectId, 
                nodeID:props.nodeID, 
                taskID:props.taskID,
                assignedTo:userMap.get(selected)
            },{ headers: { Authorization:localStorage.getItem('jwtToken') } }).then(res=>{

                props.isAssigned(true);
                props.setAssigned(selected);
                props.close(false);
                setAdding(false);

            }).catch(e=>{
                console.log(e);
                setAdding(false);
            })
        }
    }
    return(
        <div className="z-10 shadow-xl absolute py-3 rounded-xl bg-white w-[240px]">
            <div className="flex outlin px-4">
                <input ref={inputRef} onChange={handleChange} className="nodrag outline-none bg-inherit w-full placeholder:italic  p-2 " placeholder="search user" type="text"/>
                {adding?(
                    <div className="outlin flex justify-center items-center ">
                        <CircularProgress className="h-6 w-6 text-green-600"/>
                    </div>
                ):(<div onClick={handleAdd} className="outlin rounded-xl text-green-600 hover:bg-slate-100 transition-all cursor-pointer px-2 ml-2 flex items-center justify-center text-2xl">
                    <AiOutlineUserAdd/>
                </div>)}
                <div onClick={()=>props.close(false)} className="outlin rounded-xl bg-white hover:bg-slate-100 text-red-500 transition-all cursor-pointer px-2 ml-2 flex items-center justify-center text-2xl">
                    <AiOutlineClose/>
                </div>

            </div>
            {!isSelected && 
                <div className="outlin overflow-clip rounded-xl absolute top-full mt-2 w-full bg-white  shadow-lg flex flex-col ">
                    {userDivs}
                </div>
            }
        </div>
    )
}