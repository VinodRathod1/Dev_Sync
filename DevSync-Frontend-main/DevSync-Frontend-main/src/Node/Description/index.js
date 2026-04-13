export default function Description(props){
    let handleKey = (e)=>{ 
        props.setChange(true);
        props.changeDesc(e.target.innerText)
    }
    return (
        <div contentEditable 

        onKeyUp={handleKey}
        placeholder="Description.."
        className={`
        nodrag
        cursor-text
        text-xs outline-none
        my-2 italic
        `}
        style={{maxWidth:`${props.maxWidth}px`}}
        >
            {props.desc}
        </div>
    )
}