import {AiOutlineUser} from "react-icons/ai"
import TeamItem from "./teamItem"

export default function About(){

    return(
        <div className="bgReveal outline relative h-full flex justify-between items-center">
            <div className="w-[40%] h-full flex justify-center items-center">
                <div className="outlin w-full px-28">
                    <div className="outlin text-5xl text-blue-700">
                        Team
                    </div>
                    <div className="">
                        <TeamItem name="Vinod Rathod" role="Backend Developer"/>
                        <TeamItem name="Rohith Nayak" role="Frontend Developer"/>
                        
                    </div>
                </div>
            </div>
            <div className="w-[40%] outlin h-full flex justify-center items-center">
                <div className="outlin text-9xl font-thin tracking-wider">
                    <div className="outlin">
                        <span className="outlin font-norma text-blue-700">
                            We
                        </span>
                        <span className="outlin pl-8">
                            built
                        </span>
                    </div>
                    <div>
                        this thing
                    </div>
                    <div className="outlin text-sm tracking-normal italic font-normal text-gray-500 text-center py-2">
                        & other cool stuffs too
                    </div>
                </div>
            </div>
            <div className="h-full w-full absolute pointer-events-none flex justify-center items-center">
                <div className="absolute outline rounded-full text-9xl p-4 text-white bg-blue-700">
                    <AiOutlineUser/>
                </div>
            </div>
            
        </div>
    )
}