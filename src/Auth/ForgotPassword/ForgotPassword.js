import React, { useState } from 'react'
import {Box, Button, Card, CardContent, CardMedia, Grid, TextField, Typography} from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ForgotPassword = () => {
    const [email, setEmail] = useState("");
  const [notification,setNotification] = useState("")

    const handleSubmit =async ()=>{
          console.log(email)
          setEmail('')
        await axios.post(`https://question-qjn9.onrender.com/users/forgot-password`, {"email":email})
        .then((res) => {
            setNotification(res.data.message)
        }).catch((err) => {
            toast.error(err,{
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            })
            
        });
    }
    const notifications = (msg)=>{
      if(notification  == "Email Not Found"){
        toast.warning("Email Not Found", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
          setNotification("")
      }
      else if (notification == "Please check your email for to reset mail"){
        toast.success("Please check your email for to reset mail", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          });
      }
    }
notifications()

  return (
    <>





<Box
  display="flex"
  justifyContent="center"
  alignItems="center"
  minHeight="100vh"
>
 <Card>
 <CardMedia>
  <img src="https://static.vecteezy.com/system/resources/previews/002/098/231/original/man-forgot-password-to-login-concept-illustration-vector.jpg" style={{width:"300px",height:"250px"}}/>
 </CardMedia>
 <CardContent>
 <Typography>Forgot Password</Typography>
    <TextField value={email} onChange={(e)=>setEmail(e.target.value)}/>
    <Button onClick={handleSubmit}>Submit</Button>
 </CardContent>
 </Card>
</Box>
<ToastContainer />
    </>

  )
}

export default ForgotPassword