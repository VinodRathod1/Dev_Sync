export default function ColorPalette(props){

    return (
        <div className="
        absolute flex flex-col gap-1
        right-full bottom-2
        ">
            <div onClick={()=>
                {props.color("red") 
                props.setChange(true)}
                } className="cursor-pointer w-[15px] h-[15px] bg-red-500 rounded-[100%]"></div>
            <div onClick={()=>{
                props.setChange(true);
                props.color("yellow")}} className="cursor-pointer w-[15px] h-[15px] bg-yellow-300 rounded-[100%]"></div>
            <div onClick={()=>{
                props.setChange(true);
                props.color("green")}} className="cursor-pointer w-[15px] h-[15px] bg-green-400 rounded-[100%]"></div>

        </div>
    )
}