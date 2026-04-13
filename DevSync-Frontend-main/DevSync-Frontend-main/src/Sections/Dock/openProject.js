import { CircularProgress } from "@mui/material"
export default function OpenProject(props){
    return (

        <div className={`
        pb-14
        ${props.vis?"scale-100":"scale-0"}
        shadow-lg
        rounded-lg
        transition-all
        absolute outlin max-w-[500px] w-full min-h-[100px] bg-white`}>
            <div className="select-none text-blue-700 outlin py-2 px-4 mt-2 w-full text-3xl font-light">
                {/* your projects */}
                Your Projects
                
            </div>
            
            <div onClick={()=>props.setOpenVis(false)} className="outlin bg-[#b1b1b110] mx-4 rounded-lg p-2 max-h-[200px] overflow-scroll">

                {
                        !props.checking?(
                            (props.projects).length!==0?props.projects:(
                                <div className="flex justify-center items-center py-2 text-slate-400 select-none"> No Projects</div>
                            )
                        ):(          
                            <div className="text-center p-2">
                                <CircularProgress className="h-6 w-6 text-blue-700"/>
                            </div>
                        )
                }

            </div>
            <div className="select-none absolute outlin flex bottom-0 right-4 gap-6 ">
                {/* buttons */}
                <div onClick={()=>props.setOpenVis(false)} className="cursor-pointer hover:text-white hover:bg-blue-700 transition-all border-b-2 border-blue-700 px-4 py-1 m-2 ">
                    Close
                </div>
            </div>
        </div>
    )
}