import {MdDone} from 'react-icons/md'
import {RxCross2} from 'react-icons/rx'
export default function SaveChanges(props){

    async function handleUpdate(){

        
        props.setChange(false);
        let check  = await props.handleUpdate();
        if(!check)
            props.setChange(true);
    }
    return (
        <div className="
        absolute bottom-full right-2
        flex gap-1
        text-xl cursor-pointer
        ">
            <div onClick={handleUpdate} className='text-green-500 transition-all hover:text-white hover:bg-green-500'><MdDone/></div>
            <div onClick={()=>props.setChange(false)} className='text-red-500 transition-all hover:text-white hover:bg-red-500'><RxCross2/></div>
        </div>
    )
}