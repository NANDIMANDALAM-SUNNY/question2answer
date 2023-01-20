import { Typography ,Box, Button} from '@mui/material'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const ConfirmAccount = () => {
const [confirm,setConfirm] = useState("")
const {confirmationToken} = useParams()
const navigate = useNavigate()
const confirmAccount = async ()=>{
   await axios.get(`https://question-qjn9.onrender.com/users/confirmAccount/${confirmationToken}`)
   .then((res)=>{
    console.log(res.data.message)
    setConfirm(res.data.message)
   })

}
    useEffect(() => {
        confirmAccount()
    }, [])
    // if(confirm ==="Success" || confirm ==="User Already Verified") { navigate("/login")}
   
    
console.log(confirm)
  return (
    <>
       <Box
         display="flex"
         justifyContent="center"
         alignItems="center"
         minHeight="100vh"
        >
        {
            confirm === "Success"? (<Typography>Your account has been confirmed</Typography>)
            :confirm==="User Already Verified" ?(<Typography>Your account has already confirmed</Typography>)
            :confirm==="Error"?(<Typography>Internal Server Error</Typography>)
            :null
        }
        <Button onClick={()=>navigate('/login')} >CLick here to login</Button>
        </Box>
    </>
  )
}

export default ConfirmAccount