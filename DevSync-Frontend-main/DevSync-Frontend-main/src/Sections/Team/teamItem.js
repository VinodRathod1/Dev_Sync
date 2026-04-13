import {AiOutlineUser} from 'react-icons/ai';
export default function TeamItem(props){

    return (
        <div className="my-1 outlin flex justify-between px-4 py-1">
            <div className="flex outlin gap-3 ">
                <div className='flex items-center justify-center text-lg'>
                    <AiOutlineUser/>
                </div>
                <div className=''>
                    {props.name}
                </div>
            </div>
            <div className="flex">
                <div className="outlin ml-3 text-gray-400 ">
                    {props.role}
                </div>
            </div>
        </div>
    )
}