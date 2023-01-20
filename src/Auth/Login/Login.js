import React,{useContext, useState} from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Container, Typography, Link, Box, Divider, Icon, Button } from "@mui/material";
import styled from "@emotion/styled";
import { useFormik } from "formik";
import { loginSchema } from "../FormsValidations/LoginForm";
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
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
  const [notification,setNotification] = useState("")
  const {token,setToken} = useContext(store);

    const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit,} = useFormik({
    initialValues: {
      email: '',
      password:""
    },
    validationSchema: loginSchema,
    onSubmit :async (values,action)=>{
      console.log("Hello")
      await  axios.post("https://question-qjn9.onrender.com/users/login",values)
        .then((res)=>{
          setToken(res.data.data)
          setNotification(res.data.message)
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
    if(notification  == "Invalid Credentials"){
      toast.warning(notification, {
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
    else if (notification == "Authentication Failed"){
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
        setNotification("")
    }
    else if (notification == "Please Verify Your Account"){
      toast.error(notification, {
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
    else if (notification == "Logged in Succesfully"){
      toast.success(notification, {
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
            Don’t have an account?{" "}
            <Link variant="subtitle2" component={RouterLink} to="/register">
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

export default Login