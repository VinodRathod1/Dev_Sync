import {AiOutlineFolderOpen,AiOutlineUserAdd, AiOutlineSave, AiOutlineFileAdd, AiFillFileAdd, AiFillSave,AiOutlineLink} from 'react-icons/ai'
import {HiOutlineUserGroup} from 'react-icons/hi'
import axios from 'axios'
import ProjectItem from './projectItem'
import { useState } from 'react'
export default function Dock(props){

    return (
        <div className="
        absolute
        pointer-events-none
        select-none
        w-full bottom-10 sm:bottom-20 flex justify-center items-center">
            <div className="
            items-center
            pointer-events-auto
            bg-white flex border-b-[2px] 
            border-blue-700
            p-2 gap-5
            shadow-xl
            ">
                <div onClick={
                    ()=>{
                        props.setOpenVis(true)
                        props.fetchProject();
                    }} className='hover:scale-110 transition-all cursor-pointer outlin flex justify-center items-center text-3xl'>
                    <AiOutlineFolderOpen/>
                </div>
                <div onClick={()=>props.setNewVis(true)} className='hover:scale-110 transition-all cursor-pointer outlin flex justify-center items-center text-3xl'>
                    <AiOutlineFileAdd/>
                </div>
                <div onClick={props.handleSave} className='hover:scale-110 transition-all cursor-pointer outlin flex justify-center items-center text-3xl'>
                    <AiOutlineSave/>
                </div>
                <div onClick={()=>props.setInviteVis(true)} className='hover:scale-110 transition-all cursor-pointer outlin flex justify-center items-center text-3xl'>
                    <AiOutlineUserAdd/>
                </div>
                <div onClick={()=>{props.setTeamVis(true)}} className='hover:scale-110 transition-all cursor-pointer outlin flex justify-center items-center text-3xl'>
                    <HiOutlineUserGroup/>
                </div>
            </div>
            
        </div>
    )
}