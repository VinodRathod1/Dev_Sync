import { CircularProgress } from "@mui/material";
import { useEffect,useState } from "react";
import InviteItem from "./inviteItem"
export default function InviteBox(props){
        
        const [invites,setInvites] = useState([]);

        useEffect(()=>{
            setInvites([]);
            props.invites.forEach(inv=>{
                setInvites(invite=>[...invite,<InviteItem update={props.update} name={inv.author} project={inv.projectName} role={inv.role} projectID={inv.projectID}/>])
            })

        },[props.invites])

        

        return(
            <div className="bg-white z-10 text-base outlin shadow-xl py-8 border-b-2 border-blue-700 absolute top-full mt-4 min-w-[400px]">
                <div className="
                flex justify-center items-center mb-3
                text-3xl text-blue-700 p-2">
                    Invitations
                </div>
                <div className="max-h-[400px] rounded-lg mx-2 bg-[#f1f1f190] overflow-scroll">
                    {!props.checking?(invites.length!==0?invites:(
                        <div className="flex justify-center items-center py-4 text-slate-400 select-none"> No Invites</div>
                    )):(<div className="flex items-center justify-center p-3 ">
                        <CircularProgress className="h-6 w-6 text-blue-700"/>
                    </div>)}
                </div>
            </div>
        )
}