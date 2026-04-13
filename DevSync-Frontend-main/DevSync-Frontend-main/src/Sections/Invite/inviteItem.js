import {MdDone} from 'react-icons/md'
import {RxCross2} from 'react-icons/rx'
import {GrUserAdd} from 'react-icons/gr'
import axios from 'axios'
export default function InviteItem(props){

    let handleAccept=()=>{
        axios.post( `${process.env.REACT_APP_BACKEND_URL}/invite/accept/`+props.projectID,{
            "action":true
        },{ headers: { Authorization:localStorage.getItem('jwtToken') } }).then(res=>{
            props.update();
        }).catch(e=>{
            console.log(e)
        })
    }
    let handleReject=()=>{
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/invite/accept/`+props.projectID,{
            "action":false
        },{ headers: { Authorization:localStorage.getItem('jwtToken') } }).then(res=>{
            props.update();
        }).catch(e=>{
            console.log(e)
        })
    }
    return (
        <div className="px-3 mx-2 py-2 outlin my-2 flex justify-between items-center text-sm">
            <div className='text-xl mr-3'> 
                <GrUserAdd/>
            </div>
            <div className="outlin select-none">
                <div className="font-bold inline">{props.name}</div> has invited you to join
                <div className="font-bold inline"> {props.project} </div>
            </div>
            <div className='flex ml-6 text-2xl outlin items-center justify-center gap-2'>
                <div onClick={handleAccept} className='hover:text-white hover:bg-green-600 cursor-pointer hover:scale-110 transition-all'>
                    <MdDone/>
                </div>
                <div onClick={handleReject} className='hover:text-white hover:bg-red-600 cursor-pointer hover:scale-110 transition-all'>
                    <RxCross2/>
                </div>
            </div>
        </div>
    )
}