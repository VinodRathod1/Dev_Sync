import { useRef } from "react"
export default function Item(props){
    let labelDiv = useRef(null);

    let handleCheck = (e)=>{
        if(e.target.checked)
        {
            // Task done.
            labelDiv.current.style.color = 'gray';
            labelDiv.current.style.opacity = '0.6';
            labelDiv.current.style.textDecoration = 'line-through';
        }
        else{
            // Task not done.
            labelDiv.current.style.color = 'black';
            labelDiv.current.style.opacity = '1';
            labelDiv.current.style.textDecoration = 'none'


        }
    }
    return (
        <div ref={labelDiv} className="flex outlin items-center">
            <input onClick={handleCheck} type="checkbox" className="outlin"/>
            <div className="outlin inline-block mx-2">
            {props.text}
            </div>
        </div>
    )
}