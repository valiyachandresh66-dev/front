import axios from 'axios';
import React, { useState } from 'react'
import { BASE_URL } from './Config/Api';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
    const [name  , setName] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("")
    const navigate = useNavigate();

    const handlelogin = async(e) =>{
        e.preventDefault();
        const data = {email , password}

        try {
        
        const res = await axios.post(`${BASE_URL}/api/v1/user/login`, data)

         if(res.data.success){
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("userid", res.data.user._id)
            console.log(localStorage);
            
            toast.success('Login SuccessFully')
            navigate('/home')
            // const token = localStorage.setItem()

         }
        
            
        } catch (error) {
            toast.error('Login Failed')
            
        }

    }
  return (
    <div>
        <ToastContainer/>

        <form action="" onSubmit={handlelogin}>
            <input type="text" placeholder='Enter Your Email' value={email} onChange={(e)=>setEmail(e.target.value)} />

        <input type="text" placeholder='Enter Your Password' value={password} onChange={(e)=>setPassword(e.target.value)} />

    <button type='submit'>Submit</button>
        </form>
        
    </div>
  )
}

export default Login