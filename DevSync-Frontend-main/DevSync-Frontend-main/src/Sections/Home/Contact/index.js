import { useEffect } from "react";
import { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import Carousel from "./carousel";
import ContactItem from "./contactItem";
export default function Contact(){

    const [selectedUser,setSelectedUser] = useState("rohith")
    const [userDetails,setUserDetails] = useState({});
    const contactDetails = {
        "rohith":{
            "name":"Rohith Nayak",
            "email":"rohithnayakece92@gmail.com",
            "phone": "+91 "+ 9100938059,
            "github":"rohith",
            "linkedin":"rohith"

        },
        "vinod":{
            "name":"Vinod Rathod",
            "email":"vinodgsvcp@gmail.com",
            "phone": "+91 "+ 9704143506,
            "github":"vinod",
            "linkedin":"vinod-149366235"
        },

    }
    useEffect(()=>{
        setUserDetails(contactDetails[selectedUser]);
    },[selectedUser])
    return(
        <div className="bgReveal outline relative h-full flex justify-between items-center">
            <div className="w-[40%] outlin h-full flex justify-center items-center">
                <div className="outlin w-full px-28">
                    <div className="outlin">
                        <ContactItem field="Email" fieldName={userDetails?.email}/>
                        <ContactItem field="Phone" fieldName={userDetails?.phone}/>
                        <ContactItem field="GitHub" fieldName={userDetails?.github} isURL url={"https://github.com/"+userDetails?.github}/>
                        <ContactItem field="LinkedIn" fieldName={userDetails?.linkedin} isURL url={"https://www.linkedin.com/in/"+userDetails?.linkedin}/>

                    </div>
                </div>
            </div>
            <div className="w-[40%] outlin h-full flex justify-center items-center">
                <div className="outlin text-9xl font-thin tracking-wider">
                    <div className="outlin">
                        {/* <span className="outlin font-normal text-blue-700">
                            We
                        </span> */}
                        Get in 
                    </div>
                    <div className="text-blue-700 flex justify-center items-center">
                        <span className="">
                            touch
                        </span>
                        <span className="text-7xl ml-6">
                            <FaPhoneAlt/>
                        </span>
                    </div>
                    <div className="outlin text-sm tracking-normal italic font-normal text-gray-500 text-center py-2">
                        we'd really love that
                    </div>
                </div>
            </div>
            <div className="h-full w-full absolute pointer-events-none flex justify-center items-center">
                <div className="pointer-events-auto">
                    <Carousel setUser={setSelectedUser} data={contactDetails}/>
                </div>
            </div>
        </div>
    )
}