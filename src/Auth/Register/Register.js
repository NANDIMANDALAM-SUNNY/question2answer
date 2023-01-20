import React,{useContext, useState} from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Container, Typography, Link, Box, Divider, Icon, Button } from "@mui/material";
import styled from "@emotion/styled";
import { useFormik } from "formik";
 import { signUpSchema } from "../FormsValidations/SignupForm";
import {
  IconButton,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import axios from 'axios';
import { motion } from "framer-motion";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { store } from '../../App'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FileBase64  from 'react-file-base64'
import './register.css'


const RootStyle = styled("div")({
  background: "rgb(249, 250, 251)",
  height: "100vh",
  display: "grid",
  placeItems: "center",
});

const HeadingStyle = styled(Box)({
  textAlign: "center",
});

const ContentStyle = styled("div")({
  maxWidth: 480,
  padding: 25,
  margin: "auto",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  background: "#fff",
});

let easing = [0.6, -0.05, 0.01, 0.99];
const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.6, ease: easing },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};
const animate = {
  opacity: 1,
  y: 0,
  transition: {
    duration: 0.6,
    ease: easing,
    delay: 0.16,
  },
};
const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
   const [notification,setNotification] = useState("")
    const {token,setToken} = useContext(store);
  const [img,setImg] = useState("")
  const[file,setFile] = useState("")
    const handleChangeImage =async (e)=>{
     setImg(e.target.value, e.target.value);
   }
    const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit,} = useFormik({
    initialValues: {
      name:"",
      email: '',
      password:""
    },
    validationSchema: signUpSchema,
    onSubmit :async (values,action)=>{
      await  axios.post("https://question-qjn9.onrender.com/users/register",{...values,"profile":img})
        .then((res)=>{
          setToken(res.data.data)
          setNotification(res.data.message)
          setTimeout(() => {
               navigate('/login')
               }, 3000);
        })
        .catch((err)=>{
          toast.error("Error", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
        })
        action.resetForm()
    },
    onChange:(values)=>{
        console.log(values)
    }
  });
 

    const notifications = (msg)=>{
   if(notification  == "User Already Exists"){
     toast.warning("User Already Exists", {
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
    else if (notification == "Success"){
      toast.success("Please check your mail to confirm", {
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
 

  }
notifications()


    if(token){
    localStorage.setItem('jwt-token',token);
    navigate('/')
  } 
  return (
    <>
      <RootStyle>
      <Container maxWidth="sm">
        <ContentStyle>
          <HeadingStyle component={motion.div} {...fadeInUp}>
            <img src="https://pbs.twimg.com/profile_images/640443440694587392/aZ71qoMS_400x400.png" style={{width:"200px"}}/>
          </HeadingStyle>
          <Box
          component={motion.div}
          animate={{
            transition: {
              staggerChildren: 0.55,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
            component={motion.div}
            initial={{ opacity: 0, y: 40 }}
            animate={animate}
          >
          <TextField
           fullWidth
           label="Full Name"
           id="name"
           type="text"
           onChange={handleChange}
           placeholder="Enter your Full Name"
           onBlur={handleBlur}
           value={values.name}
           />
            {errors.name && touched.name && <p style={{fontSize:"bold",color:"red"}} >{errors.name}</p>}
            <Box  sx={{display:"flex"}} >
              <Box >
                <FileBase64 className='custom-file-input' type="file" name='img' multiple={false} onDone={({base64}) => setImg( base64)}  onChange={handleChangeImage}/>
              </Box>
              <Box>
                <img src={img} style={{marginLeft:"20px",width:"100px"}}/>

              </Box>
            </Box>
            <TextField
               fullWidth
               type="email"
               label="Email Address" 
               onChange={handleChange}
               id="email"
              placeholder="Enter your email "
              onBlur={handleBlur}
              value={values.email}
            />
              {errors.email && touched.email && <p style={{fontSize:"bold",color:"red"}} >{errors.email}</p>}
            <TextField
              fullWidth
              type={showPassword ? "text" : "password"}
              label="Password"
              id="password"
              onBlur={handleBlur}
              value={values.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <RemoveRedEyeIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
             {errors.password && touched.password && (<p style={{fontSize:"bold",color:"red"}}>{errors.password}</p>)}                           
          </Box>

          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={animate}
          >
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ my: 2 }}
            >

              <Link
                component={RouterLink}
                variant="subtitle2"
                to="/forgot-password"
                underline="hover"
              >
                Forgot password?
              </Link>
            </Stack>

              <Button
                fullWidth
                size="large"
                onClick={handleSubmit}
                variant="contained"
                >
                  Login
              </Button>
          </Box>
        </Box>




          <Typography
            component={motion.p}
            {...fadeInUp}
            variant="body2"
            align="center"
            sx={{ mt: 3 }}
          >
            Already having an account?{" "}
            <Link variant="subtitle2" component={RouterLink} to="/login">
              Sign up
            </Link>
          </Typography>
        </ContentStyle>
      </Container>
    </RootStyle>
    <ToastContainer />
    </>
  )
}

export default Register