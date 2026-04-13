import "./App.css"
import {Route,Routes} from 'react-router-dom'
import Login from "./Sections/LogIn_SignUp/login";
import SignUp from "./Sections/LogIn_SignUp/signup";
import ProjectPage from "./Sections/Project Page";
import Slider from "./Sections/misc/slider";
import Tasks from "./Sections/Tasks";
import Home from "./Sections/Home";
import Profile from "./Sections/Profile";
import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import About from "./Sections/Home/About/about";
import Features from './Sections/Home/Features'
import Contact from './Sections/Home/Contact'
function App() {
  let [email,setEmail] = useState('');
  let [name,setName] = useState('');
  let [userName,setUserName] = useState('');
  let [isLoggedIn,setIsLoggedIn] = useState(false);
  let [isChecking,setIsChecking] = useState(true);
  let navigate = useNavigate();
  let handleSignOut = ()=>{
    localStorage.removeItem('jwtToken');
    setIsLoggedIn(false);
    setEmail('');
    setName('');
    setUserName('');
    navigate('/');
  }
  let fetchDetails = async ()=>{
    // before this check if jwt token even exist
      setIsChecking(true);
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/fetchDetails`,{ headers: { Authorization:localStorage.getItem('jwtToken') } }).then(res=>{
        console.log("i was run")
        setIsLoggedIn(true);
        setEmail(res.data.email);
        setName(res.data.name);
        setUserName(res.data.userName);
        setIsChecking(false);
        return true;
      }).catch(e=>{ 
        console.log(e);
        setIsChecking(false);
        return false;
      })
  }
  useEffect(()=>{
    fetchDetails();
  },[])
  return ( 
    <>
    <Slider checking={isChecking} isLoggedIn={isLoggedIn}/>
    <Routes>
      <Route path="/" element={<Home/>}>
        <Route path="about" element={<About/>}/>
        <Route path="features" element={<Features/>}/>
        <Route path="contact" element={<Contact/>}/>

      </Route>
      <Route path="/profile" element={<Profile logOut={handleSignOut} details={fetchDetails} isLoggedIn={isLoggedIn} name={name} email={email} userName={userName}/>}/>
      <Route path="/tasks" element={<Tasks/>}/>
      <Route path="/:pid" element={<ProjectPage />}/>
      <Route path="/login" element={<Login setLog={setIsLoggedIn} setUserName={setUserName} setEmail={setEmail} setName={setName}/>}/>
      <Route path = "/signup" element={<SignUp/>}/>
    </Routes>
    </>
  );
}

export default App;
