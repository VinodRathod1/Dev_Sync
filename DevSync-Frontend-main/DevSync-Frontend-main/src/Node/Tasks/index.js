import AddIcon from "../../AddIcon"
import Editable from "../Editable"
import { useRef,useState } from "react"
import Item from "./item";

export default function Tasks()
{
    const [content,setContent]=useState('')
    const [itemArr,setArr] = useState([]);
    let tasks=useRef(null);
    let handleAdd = e=>{
            // Write here to add to Tasks list.
            if(content.trim()!=='')
                setArr(itemArr=>[...itemArr,<Item text ={content} key={itemArr.length}/>])
    }
    let handleSubmit = e=>{
        // Write here to add to Tasks list.
        if(e.key==='Enter')
        {
            if(content.trim()!=='')
            setArr(itemArr=>[...itemArr,<Item text ={content} key={itemArr.length}/>])

            e.target.value='';
        }
}
    return ( 
        <div className="outline flex justify-center items-center">
            <div  
            onClick={()=>{tasks.current.classList.replace('hidden','flex')}}
            title="Add tasks"
            className="cursor-pointer outlin w-[25px] h-[25px] inline-block rounded-full bg-white">
                <AddIcon/>
            </div>
            <div ref={tasks} onMouseLeave={()=>{tasks.current.classList.replace('flex','hidden')}} className="hidden flex-col bg-white shadow-[0_0_3px_gray] rounded-lg p-3 items-center justify-center ml-5 min-w-[180px] max-w-[300px]  w-max min-h-[50px]">
                <div  className="outlin w-full gap-1 justify-between flex items-center">
                    {/* <Editable content={setContent} placeholder="Add tasks.." fontSize={12} maxWidth={200} /> */}
                    <input onKeyDown={handleSubmit} onChange={e=>setContent(e.target.value)} type="text" className="outline-none font-bold text-sm" placeholder="Add tasks"/>
                    <div onClick={handleAdd} className="cursor-pointer text-blue-700 hover:text-white relative outlin flex justify-center items-center h-[20px] w-[22px] rounded-[100%] transition-all bg-white hover:bg-blue-700">
                       <div className="w-[50%] outline outline-[1px]" ></div>
                       <div className="absolute h-[50%]  outline outline-[1px]" ></div>
                    </div>
                </div>
                <div className="outlin flex flex-col gap-2 w-full mt-2 text-[12px]">
                    {itemArr}
                </div>


            </div>
        </div>
    )
}