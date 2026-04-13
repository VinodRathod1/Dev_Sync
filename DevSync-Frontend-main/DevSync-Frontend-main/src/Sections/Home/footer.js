import { useRef } from "react"
import { useEffect } from "react";
import { useState } from "react"
import Navigator from "./navigator"
export default function Footer(props){
    const [selectedTab,setSelectedTab] = useState('intro')
    const tabNameRef = useRef(null);
    const tabDescRef = useRef(null);
    useEffect(()=>{
        if(tabNameRef.current && tabDescRef.current)
        {
            // tabNameRef.current.style.opacity=0;
            tabNameRef.current.classList.remove("bgReveal");
            tabDescRef.current.classList.remove("bgReveal");
            setTimeout(()=>{
                // tabNameRef.current.style.transitionDuration=".5s";
                // tabNameRef.current.style.transitionTimingFunction="ease";
                if(selectedTab==='intro')
                {
                    tabNameRef.current.innerHTML = "DevSync";
                    tabDescRef.current.innerHTML = "start simple, finish strong";

                }
                else if(selectedTab==='features')
                {
                    tabNameRef.current.innerHTML = "Features";
                    tabDescRef.current.innerHTML = "see what we offer";


                }
                else if(selectedTab==='about')
                {
                    tabNameRef.current.innerHTML = "About Us";
                    tabDescRef.current.innerHTML = "really wanna know us?";


                }
                else
                {
                    tabNameRef.current.innerHTML = "Contact";
                }
                // tabNameRef.current.style.opacity=1;
                // tabDescRef.current.style.opacity =1;
            tabNameRef.current.classList.add("bgReveal");
            tabDescRef.current.classList.add("bgReveal");


                
            },0)
        }   
    },[selectedTab])
    return (
        <div className="h-full border-t-[3px] border-blue-700 homeBgAnimate relative w-full flex justify-center items-center ">
            {/* <div className="pointer-events-none py-8 leading-none opacity-0 text-[100px] px-10 bg-white font-semibold text-blue-700 bottom-[0%]">
                Contact
            </div> */}
            <div className="text-[100px] py-8 leading-none flex flex-col justify-center items-center px-10 homeBgAnimate font-semibold text-blue-700 relative top-[-50%]">
                <div ref={tabNameRef} className="">
                    DevSync
                </div>
                <div ref={tabDescRef} className="text-sm text-gray-500 font-normal italic">
                    Start Simple, Finish Strong
                </div>
            </div>
            <Navigator setSelectedTab={setSelectedTab}/>
        </div>
    )
}