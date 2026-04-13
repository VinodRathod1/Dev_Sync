export default function ProjectTitle(props){

    return (
        <div className="
        z-[10]
        top-10
        pointer-events-none
        absolute
        select-none
        w-full flex justify-center items-center">
            <div className="
            pointer-events-auto
            items-center
            min-w-[150px]
            justify-center
            bg-white flex border-b-[2px] 
            border-blue-700
            p-2
            shadow-xl
            ">
                <div className='text-2xl px-2'>
                    {props.title}
                </div>
            </div>
            
        </div>
    )
}