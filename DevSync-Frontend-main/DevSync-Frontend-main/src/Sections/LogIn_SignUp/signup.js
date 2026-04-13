import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton';
import TeamSVG from '../../Assets/team.svg';
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function SignUp(){
    const [passCheck,setPassCheck]=useState(false);
    const [userCheck,setUserCheck]=useState(false);
    const [load,setLoading]=useState(false);
    const navigate=useNavigate();
    let handleClick=(e)=>{
        setLoading(true);
        e.preventDefault();
        let username=e.target[0].value
        let name=e.target[2].value
        let email=e.target[4].value
        let password=e.target[6].value
        let confirmPass=e.target[8].value
        if(password!==confirmPass)
        {
            // password didn't match with confirmPassword;
            setPassCheck(true)
            setLoading(false);
        }
        else
        {
            // password matched
            setPassCheck(false);
            axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/signup`,{
                "name":name,
                "userName":username,
                "email":email,
                "password":password
            }).then(res=>{
                setLoading(false);
                let token=res.data.token;
                
                    // user credentials added to database.
                navigate("/login")
            }).catch(e=>{
                setLoading(false);
                console.log(e);
                let error = e.response.status;
                if(error = 400)
                {
                    setUserCheck(true);
                }
            })
        }

    }
    return (
        <div className="h-[100vh] flex justify-center items-center ">
            
            <img className='absolute z-[-1] h-[150px] bottom-0' src={TeamSVG} alt="" />
            <div className="outlin shadow-2xl bg-white  border-b-4 border-b-blue-700  w-[380px]">
                <div className="
                p-3 text-4xl
                md:text-3xl
                outlin flex mt-4 mb-4 text-blue-700  items-center justify-center">
                    Sign Up
                </div>
                <form 
                onSubmit={handleClick}
                className="outlin mx-8 p-2 flex justify-center px-4 flex-col gap-4 mb-12 ">
                    <TextField required onChange={()=>setUserCheck(false)} label="Username" variant="outlined" />
                    <TextField required  label="Full Name" variant="outlined" />
                    <TextField required error={userCheck} type="email" label="Email" variant="outlined" />
                    <TextField required  type="password" label="Password" variant="outlined" />
                    <TextField onChange={()=>setPassCheck(false)} required error={passCheck}  type="password" label="Confirm Password" variant="outlined" />
                    <LoadingButton loading={load} type='submit' className={`${!load?'!bg-blue-700':''}`} variant='contained'>Sign Up</LoadingButton>
                </form>
            </div>
        
        </div>
    )
}