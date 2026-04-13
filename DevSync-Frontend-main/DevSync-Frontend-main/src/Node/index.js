import Editable from "./Editable"
import Description from "./Description"
import SaveChanges from "./saveChange";
import { useEffect, useRef,useState } from "react"
import Tasks from "./Tasks_v2";
import ColorPalette from "./colorPalette";
import { useLocation } from "react-router-dom";
import axios from "axios";
export default function Node(props){
    let [isActive,setIsActive] = useState(true); 
    let [title,setTitle] = useState(props.title);
    let [desc,setDesc] = useState(props.desc);
    let [color,setColor] = useState(props.color);
    let [hov,setHov] = useState(false);
    const [change,setChange] = useState(false);
    let location = useLocation();

    async function updateDetails(){
         
       return  axios.post(`${process.env.REACT_APP_BACKEND_URL}/project/edit`+location.pathname,{
            "nodeID":props.nodeID,
            "description":desc,
            "title":title,
            "color":color
        },{ headers: { Authorization:localStorage.getItem('jwtToken') } }).then(res=>{

            console.log(res.data)
            return true;
        }).catch(e=>{
            console.log(e);
            return false;
        })

    }

    return (
        <div
        onMouseLeave={()=>{
            setHov(false);
        }}
        onMouseEnter={()=>{
            setHov(true)
        }}
        className="outlin relative flex items-center justify-center outlin w-fit">
            
            {hov && <ColorPalette setChange={setChange} color={setColor}/>}
            {change && <SaveChanges setChange={setChange} handleUpdate={updateDetails}/>}
            <div className={`
            outlin
            m-2 min-h-[50px] min-w-[150px] inline-block
            p-4
            shadow-lg
            rounded-md
            ${isActive?"opacity-100":"opacity-60"}
            ${color==="white"?"bg-white text-black":""}
            ${color==="yellow"?"bg-yellow-300":""}
            ${color==="red"?"bg-red-500 text-white":""}
            ${color==="green"?"bg-green-400":""}
            `}>
                <Editable setChange={setChange} changeTitle={setTitle} title={props.title} placeholder="Title" fontSize={20} maxWidth={150}/>
                <Description setChange={setChange} changeDesc={setDesc} desc={props.desc} maxWidth={150}/>
            </div>
            <div className="absolute left-[100%] top-1">
                <Tasks team={props.team} nodeID={props.nodeID} setActive={setIsActive}/>
            </div>
        </div>
    )
}
Node.defaultProps = {
    color : "white"
}