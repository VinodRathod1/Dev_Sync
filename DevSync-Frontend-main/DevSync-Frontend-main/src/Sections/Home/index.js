import About from "./About/about";
import Footer from "./footer";
import { Outlet } from "react-router-dom";
export default function Home(props){

    return (
        <>
            <div className="h-[80vh] homeBgAnimate">
                {/* <div id="intro" className="h-[80%] bg-red-200">
                    Intro
                </div>
                <div id="features" className="h-[80%] bg-blue-200">
                    Feature
                </div>
                <div id="about" className="h-[80%] bg-green-20">
                    <About/>
                </div>
                <div id="contact" className="h-full bg-purple-200">
                    Contact
                </div> */}

                <Outlet/>
            </div>
            <div className="h-[20vh]">
                <Footer/>
            </div>
        </>
    )
}