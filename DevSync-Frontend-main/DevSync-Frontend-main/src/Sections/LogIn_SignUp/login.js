import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TeamSVG from '../../Assets/team.svg';
import axios from 'axios';
export default function Login(props){

    const [passCheck,setPassCheck]=useState(true);
    const [userCheck,setUserCheck]=useState(true);
    const [load,setLoading]=useState(false);
    const navigate=useNavigate();

    let handleClick=(e)=>{
        console.log("click handeled")
        setLoading(true);
        setUserCheck(true);
        setPassCheck(true);
        e.preventDefault();
        let email=e.target[0].value
        let password=e.target[2].value
        
        // verifying from server if user exists: 
        axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/login`,{
            "email":email,
            "password":password
        }).then(res=>{
            setLoading(false);
            let token=res.data.token;
            // save this token in cookies or something
            localStorage.setItem("jwtToken",token);
            axios.get(`${process.env.REACT_APP_BACKEND_URL}/fetchDetails`,{ headers: { Authorization:localStorage.getItem('jwtToken') } }).then(res=>{
                let details=res.data;
                props.setName(details.name);
                props.setEmail(details.email)
                props.setUserName(details.userName);
                props.setLog(true);
                navigate("/profile");
            }).catch(e=>{
                console.log(e)
            })
        }).catch(e=>{
            setLoading(false);
            let error = e.response.status;
            console.log(error);
            if(error === 400)
            {
                setUserCheck(false);
            }
            else if(error === 401)
            {
                setPassCheck(false);
            }
            else
            {
                console.log(error);
            }
        })
    }
    return (
        <div className=" h-[100vh] flex justify-center items-center">
            
            <img className='absolute h-[150px] bottom-0' src={TeamSVG} alt="" />
            <div className="outlin  bg-white shadow-2xl  border-b-4 border-b-blue-700  w-[400px]">
                <div className="
                p-3 text-4xl
                outlin flex mt-8 mb-4  text-blue-700  items-center justify-center">
                    Log In
                </div>
                <form  
                onSubmit={handleClick}
                 className="outlin mx-8 p-2 flex justify-center px-4 flex-col gap-4  mb-12">
                    <TextField required  error={!userCheck} onChange={()=>setUserCheck(true)} label="email" variant="outlined" />
                    <TextField required onChange={()=>setPassCheck(true)} error={!passCheck} type="password" label="Password" variant="outlined" />
                    <LoadingButton loading={load}  className={`${!load?'!bg-blue-700':''}`} type='submit' variant='contained'>Log In</LoadingButton>
                    <div 
                    onClick={()=>navigate("/signup")}
                     className='text-sm outlin text-right cursor-pointer hover:underline'>
                    ...sign up instead?
                    </div>
                </form>
                
            </div>
        
        </div>
    )
}