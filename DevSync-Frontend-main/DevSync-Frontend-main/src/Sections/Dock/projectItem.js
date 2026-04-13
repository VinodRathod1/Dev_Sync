import {LiaFolderOpen} from 'react-icons/lia'
import {AiOutlineUser} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
export default function ProjectItem(props){

    let navigate = useNavigate();

    let handleClick = ()=>{
        navigate("/" + props.projectId)
    }

    return (
        <div onClick={handleClick} className="cursor-pointer select-none outlin my-1 py-1 px-2 flex justify-between">
            <div className="flex outlin gap-2">
                <div className='flex justify-center  items-center text-xl'>
                    <LiaFolderOpen/>
                </div>
                <div className=''>
                    {props.name}
                </div>
            </div>
            <div className="flex gap-5 select-none">
                <div className='flex items-center justify-center gap-1'>
                    <AiOutlineUser/>
                    {props.owner}
                </div>
                <div className=''>
                    {props.creationDate}
                </div>
            </div>
        </div>
    )
}