import KUTE from 'kute.js';
import { useEffect, useState} from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
export default function Slider(props){
    
    let navigate = useNavigate();
    let location = useLocation();
    let homePath = "M0 -23H1512V-7.5L946.756 20.5176C902.213 22.7255 860.919 44.4943 833.928 79.9971C794.753 131.526 717.247 131.526 678.072 79.9971C651.081 44.4943 609.787 22.7255 565.244 20.5176L0 -7.5L0 -23Z";
    let profilePath = "M-148 -23H1364V-7.5L798.756 20.5176C754.213 22.7255 712.919 44.4943 685.928 79.9971V79.9971C646.753 131.526 569.247 131.526 530.072 79.9971V79.9971C503.081 44.4943 461.787 22.7255 417.244 20.5176L-148 -7.5L-148 -23Z";
    let tasksPath = "M151 -23H1663V-7.5L1097.76 20.5176C1053.21 22.7255 1011.92 44.4943 984.928 79.9971V79.9971C945.753 131.526 868.247 131.526 829.072 79.9971V79.9971C802.081 44.4943 760.787 22.7255 716.244 20.5176L151 -7.5L151 -23Z";
    let animateProfile = ()=>{
        KUTE.to("#navbar",{path:profilePath},{easing: "easingBackOut"}).start();
        KUTE.to("#home",{attr:{fill:"white"}}).start();
        KUTE.to("#tasks",{attr:{fill:"white"}}).start();
        KUTE.to("#profile",{attr:{fill:"black"}}).start();
        KUTE.to("#navbar",{attr:{fill:"white"}}).start();

        if(!props.checking && props.isLoggedIn===false)
        {
            navigate("/login");
        }
        else if(!props.checking && props.isLoggedIn)
        {
            navigate("/profile");
        }
    }
    let animateHome = (path)=>{
        KUTE.to("#navbar",{path:homePath},{easing: "easingBackOut"}).start();
        KUTE.to("#home",{attr:{fill:"white"}}).start();
        KUTE.to("#tasks",{attr:{fill:"black"}}).start();
        KUTE.to("#profile",{attr:{fill:"black"}}).start();
        // KUTE.to("#navbar",{attr:{fill:"white"}}).start();
        KUTE.to("#navbar",{attr:{fill:"#1D4ED8"}}).start();
        navigate(path);

    }
    let animateTasks = ()=>{
        KUTE.to("#navbar",{path:tasksPath},{easing: "easingBackOut"}).start();
        KUTE.to("#home",{attr:{fill:"white"}}).start();
        KUTE.to("#tasks",{attr:{fill:"black"}}).start();
        KUTE.to("#profile",{attr:{fill:"white"}}).start();
        KUTE.to("#navbar",{attr:{fill:"white"}}).start();
        if(!props.checking && props.isLoggedIn===false)
        {
            navigate("/login");
        }
        else if(!props.checking && props.isLoggedIn)
        {
            navigate("/tasks");
        }
    }
    useEffect(()=>{
        
        if(location.pathname==="/" || location.pathname==="/about" || location.pathname==="/features" || location.pathname==="/contact")
        {
            animateHome(location.pathname);
        }
        else if(location.pathname==="/profile")
        {
            animateProfile();
        }
        else if(location.pathname==="/tasks")
        {
            animateTasks();
        }
        else
        {
            // how do i unmount this component if locationpath name is something else
            return ()=>{};
        }
    },[location.pathname,props.isLoggedIn,props.checking])
    // Bhot paseena nikla hai ismpe , alag se component banake save karlena.
    return(
        <>
        {location.pathname === "/" || location.pathname === "/profile" || location.pathname === "/tasks" || location.pathname==="/about" || location.pathname==="/features" || location.pathname==="/contact"?
        (<svg className='z-[10] fixed w-[100%] h-[120px] md:h-auto ' viewBox="0 0 1512 183" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path id='navbar' d={homePath} fill="#1D4ED8"/> 
            <path id='home' d="M760.551 52.7583C759.482 51.7472 757.809 51.7472 756.74 52.7583L743.302 65.4626C742.471 66.2486 742 67.3423 742 68.4864V83.9369C742 86.235 743.863 88.0982 746.161 88.0982H750.323C752.621 88.0982 754.484 86.235 754.484 83.9369V77.0012C754.484 76.2352 755.105 75.6142 755.871 75.6142H761.42C762.186 75.6142 762.807 76.2352 762.807 77.0012V83.9369C762.807 86.235 764.67 88.0982 766.968 88.0982H771.13C773.428 88.0982 775.291 86.235 775.291 83.9369V68.4864C775.291 67.3423 774.82 66.2486 773.988 65.4626L760.551 52.7583Z" fill="#FEFEFE"/>
            <rect className='cursor-pointer' onClick={()=>{animateHome("/")}} width="57.8589" height="57.7181" transform="translate(730 41.8442)" fill="white" fillOpacity="0.00"/>
            <g  id='profile' fill='black'>
                <path d="M613.873 54.618C612.309 52.9297 610.125 52 607.715 52C605.291 52 603.1 52.9241 601.543 54.6019C599.97 56.2983 599.203 58.6037 599.383 61.0932C599.74 66.0046 603.477 69.9999 607.715 69.9999C611.952 69.9999 615.683 66.0054 616.045 61.0948C616.228 58.6278 615.456 56.3272 613.873 54.618Z" />
                <path d="M621.857 87.9998H593.572C593.202 88.0046 592.835 87.9268 592.499 87.7721C592.162 87.6174 591.865 87.3896 591.627 87.1054C591.105 86.481 590.894 85.6284 591.05 84.7662C591.728 81.0039 593.845 77.8435 597.172 75.6248C600.127 73.6553 603.871 72.5713 607.715 72.5713C611.558 72.5713 615.302 73.6561 618.257 75.6248C621.584 77.8427 623.701 81.0031 624.379 84.7654C624.535 85.6276 624.324 86.4802 623.802 87.1046C623.565 87.389 623.267 87.6169 622.931 87.7717C622.594 87.9266 622.228 88.0045 621.857 87.9998Z" />
            </g>
            <rect className='cursor-pointer'  onClick={animateProfile} width="57.8589" height="57.7181" transform="translate(579 41.8442)" fill="white" fillOpacity="0.00"/>
            <path id='tasks' d="M909.2 73.6H902C901.523 73.6 901.065 73.7896 900.727 74.1272C900.39 74.4648 900.2 74.9226 900.2 75.4C900.2 75.8774 900.39 76.3352 900.727 76.6728C901.065 77.0104 901.523 77.2 902 77.2H909.2C909.677 77.2 910.135 77.0104 910.473 76.6728C910.81 76.3352 911 75.8774 911 75.4C911 74.9226 910.81 74.4648 910.473 74.1272C910.135 73.7896 909.677 73.6 909.2 73.6ZM916.4 55.6H914.276C913.905 54.5496 913.217 53.6398 912.309 52.9953C911.4 52.3508 910.314 52.0031 909.2 52H905.6C904.486 52.0031 903.4 52.3508 902.491 52.9953C901.583 53.6398 900.895 54.5496 900.524 55.6H898.4C896.968 55.6 895.594 56.1689 894.582 57.1816C893.569 58.1943 893 59.5678 893 61V82.6C893 84.0322 893.569 85.4057 894.582 86.4184C895.594 87.4311 896.968 88 898.4 88H916.4C917.832 88 919.206 87.4311 920.218 86.4184C921.231 85.4057 921.8 84.0322 921.8 82.6V61C921.8 59.5678 921.231 58.1943 920.218 57.1816C919.206 56.1689 917.832 55.6 916.4 55.6ZM903.8 57.4C903.8 56.9226 903.99 56.4648 904.327 56.1272C904.665 55.7896 905.123 55.6 905.6 55.6H909.2C909.677 55.6 910.135 55.7896 910.473 56.1272C910.81 56.4648 911 56.9226 911 57.4V59.2H903.8V57.4ZM918.2 82.6C918.2 83.0774 918.01 83.5352 917.673 83.8728C917.335 84.2104 916.877 84.4 916.4 84.4H898.4C897.923 84.4 897.465 84.2104 897.127 83.8728C896.79 83.5352 896.6 83.0774 896.6 82.6V61C896.6 60.5226 896.79 60.0648 897.127 59.7272C897.465 59.3896 897.923 59.2 898.4 59.2H900.2V61C900.2 61.4774 900.39 61.9352 900.727 62.2728C901.065 62.6104 901.523 62.8 902 62.8H912.8C913.277 62.8 913.735 62.6104 914.073 62.2728C914.41 61.9352 914.6 61.4774 914.6 61V59.2H916.4C916.877 59.2 917.335 59.3896 917.673 59.7272C918.01 60.0648 918.2 60.5226 918.2 61V82.6ZM912.8 66.4H902C901.523 66.4 901.065 66.5896 900.727 66.9272C900.39 67.2648 900.2 67.7226 900.2 68.2C900.2 68.6774 900.39 69.1352 900.727 69.4728C901.065 69.8104 901.523 70 902 70H912.8C913.277 70 913.735 69.8104 914.073 69.4728C914.41 69.1352 914.6 68.6774 914.6 68.2C914.6 67.7226 914.41 67.2648 914.073 66.9272C913.735 66.5896 913.277 66.4 912.8 66.4Z" fill="black"/>
            <rect className='cursor-pointer'  onClick={animateTasks}  width="57.8589" height="57.7181" transform="translate(878 41.8442)" fill="white" fillOpacity="0.00"/>
        </svg>) : null
        }
        </>


    )
}







