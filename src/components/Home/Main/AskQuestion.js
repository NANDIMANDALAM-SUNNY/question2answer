import { Box, Button, TextareaAutosize, TextField, Typography } from '@mui/material'
import '../css/askquestion.css'
import React, { useContext, useEffect, useState } from "react";
import { TagsInput } from "react-tag-input-component";
import {useNavigate } from 'react-router-dom'
import axios from "axios";
import { store } from '../../../App';
import FileBase64  from 'react-file-base64'



const AskQuestion = () => {
  const navigate = useNavigate()
  const {profile,token} = useContext(store)
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState([]);
  const [body,setBody]  = useState("")
  const [loading,setLoading] = useState(false)
  const [img,setImg] = useState("")
  const[file,setFile] = useState("")
  const handleChangeImage =async (e)=>{
   setImg(e.target.value, e.target.value);
 }
const handleAddQuestion =async (e) =>{
  e.preventDefault()
  if(title !=="" && body !=="" ){
    setLoading(true)
    const object ={
      user:profile._id,
      title,
      tag:tag,
      body,
      questionphoto:img
    }
    console.log(object)
    await axios.post("https://question-qjn9.onrender.com/addquestion", object)
    .then((res) => {
      // console.log(res.data);
      setLoading(false)
      alert("Question added successfully");
      navigate('/')
    })
    .catch((err) => {
      console.log(err);
    })
    
  }
}

useEffect(()=>{
  if(token === null){
    navigate('/login')
  }
})
  return (
   <>
     <Box className="add-question">
      <Box className="add-question-container">
        <Box className="head-title">
          <h1>Ask a public question</h1>
        </Box>
        <Box className="question-container">
          <Box className="question-options">
            <Box className="question-option">
              <Box className="title">
                <Typography >Title</Typography>
                <small>
                  Be specific and imagine you’re asking a question to another
                  person
                </small>
                <TextField
                  size="small"
                  sx={{m:2}}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="e.g Is there an R function for finding teh index of an element in a vector?"
                />
              </Box>
            </Box>
            <div className="question-option">
              <div className="title">
                <h3 style={{marginBottom:"15px"}} >Body</h3>
                <small style={{marginBottom:"15px"}} >
                  Include all the information someone would need to answer your
                  question
                </small>

                <Box  sx={{display:"flex"}} >
              <Box >
                <FileBase64 className='custom-file-input' type="file" name='img' multiple={false} onDone={({base64}) => setImg( base64)}  onChange={handleChangeImage}/>
              </Box>
              <Box>
                <img src={img} style={{marginLeft:"20px",width:"100px"}}/>

              </Box>
            </Box>

                <TextareaAutosize
                    style={{padding:'10px'}}
                    aria-label="empty textarea"
                    placeholder="Give some information about question"
                    // style={{ width: 200 }}
                    minRows={10}
                    value={body}
                  onChange={(e) => setBody(e.target.value)}

                  />
              </div>
            </div>
            <div className="question-option">
              <div className="title">
                <h3>Tags</h3>
                <small>
                  Add up to 5 tags to describe what your question is about
                </small>
                <TagsInput
                  value={tag}
                  onChange={setTag}
                  name="tags"
                  placeHolder="press enter to add new tag"
                />
              </div>
            </div>
          </Box>
        </Box>

        <Button variant="contained" onClick={handleAddQuestion} className="button">
         {
          loading ===false ? "Add your question" : "Adding your question ..."
         } 
        </Button>
      </Box>
    </Box>
   </>
  )
}

export default AskQuestion