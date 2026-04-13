import { useState } from "react"
import { Link } from "react-router-dom";
export default function Navigator({
    setSelectedTab
}){
    const [selectedTab,setTab] = useState('intro');
    const scrollEffect = (id)=>{
        setTab(id);
        setSelectedTab(id);
        // let section = document.getElementById(id);
        // if(section)
        // {
        //     section.scrollIntoView({ behavior: 'smooth' });
        //     window.history.pushState(null, null, `#${id}`);
        // }
    }
    return(
        <div className=" z-10 absolute flex mt-10 shadow-lg">
            <Link to={"/"} onClick={()=>scrollEffect('intro')}  className={`text-2xl px-8 py-3 border-blue-700 ${selectedTab=='intro'?'border-b-2':''} transition-all hover:bg-gray-100 cursor-pointer`}>
                Home
            </Link>
            <Link to={"features"} onClick={()=>scrollEffect('features')} className={`text-2xl px-8 py-3 border-blue-700 ${selectedTab=='features'?'border-b-2':''} transition-all hover:bg-gray-100 cursor-pointer`}>
                Features
            </Link>
            <Link to={"about"} onClick={()=>scrollEffect('about')} className={`text-2xl px-8 py-3 border-blue-700 ${selectedTab=='about'?'border-b-2':''} transition-all hover:bg-gray-100 cursor-pointer`}>
                About Us
            </Link>
            <Link to={"contact"} onClick={()=>scrollEffect('contact')} className={`text-2xl px-8 py-3 border-blue-700 ${selectedTab=='contact'?'border-b-2':''} transition-all hover:bg-gray-100 cursor-pointer`}>
                Contact
            </Link>
        </div>
    )
}