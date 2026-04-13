import { useEffect,useState } from "react";

export default function Carousel(
    {
        data,
        setUser
    }
){
    const [contactItems,setItems] = useState([]);
    const [inView,setInView] = useState(Object.keys(data)[0])
    const handleScroll = (e)=>{
    
       let wrapper = e.target;
       let child = e.target.children;
       for(let i = 0 ; i <child.length;i++)
       {
            let position = (child[i].getBoundingClientRect().top - wrapper.getBoundingClientRect().top)
            if(position>=30&& position<=70)
            {
                //  in view 
                child[i].classList.remove('text-gray-400','font-extralight');
                child[i].classList.add('text-black', 'font-semibold');
                console.log(child[i].id)
                setInView(child[i].id);
                setUser(child[i].id);
            }
            else
            {
                child[i].classList.remove('text-black', 'font-semibold');
                child[i].classList.add('text-gray-400','font-extralight');

            }
       }
    }
    useEffect(()=>{
        setItems([]);
        for(let contact in data)
        {
            setItems((prev)=>[...prev,
            <div id={contact} key={contact} className={`outlin ${inView===contact?'text-black font-semibold':'text-gray-400 font-extralight'}  min-h-[50px] transition-all duration-[300ms] px-10 flex justify-center items-center`}>
                {data[contact].name}
            </div>
        ])
        }
    },[data])
    return (
        <div className="relative">
            <div className="absolute top-0 blurEffect w-full z-10 min-h-[50px] px-10">
                {/* DIV FOR BLURR EFFECT TOP */}
            </div>
            <div className="absolute bottom-0 rotate-180 blurEffect w-full z-10 min-h-[50px] px-10">
                {/* DIV FOR BLURR EFFECT BOTTOM */}
            </div>
            <div onScroll={handleScroll} className="outlin cursor-default h-[150px] outlin w-fit text-4xl relative flex flex-col overflow-scroll"> 
                <div className="outlin min-h-[50px] px-10 flex justify-center items-center">
                    {/* BUFFER DIV TOP */}
                </div>
                {contactItems}
                <div className="outlin  min-h-[50px] px-10 flex justify-center items-center">
                    {/* BUFFER DIV BOTTOM */}
                </div>
            </div>
        </div>
    )
}