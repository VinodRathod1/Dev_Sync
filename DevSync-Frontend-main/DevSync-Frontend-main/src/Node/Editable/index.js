export default function Editable(props){
    let handleKey = (e)=>{ 
        props.setChange(true);
        props.changeTitle(e.target.innerText)
    }
    return(
        <div className="w-full">
            <div contentEditable

            onKeyUp={handleKey}
            style={{maxWidth:`${props.maxWidth}px`,fontSize:`${props.fontSize}px`}}
             className=
             {`
                nodrag
                outline-none box-border
                font-bold
                cursor-text
            `} placeholder={props.placeholder}>
                {props.title}
             </div>
        </div>
    )
}
