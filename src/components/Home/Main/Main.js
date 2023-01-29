import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AllQuestions from './AllQuestions'
import '../css/main.css'
import axios from 'axios'
import { store } from '../../../App'
import { url } from '../../../config/config'
import { Box, Button, Typography } from '@mui/material'
import ModalPopup from './ModalPopup'

const Main = () => {
  const navigate = useNavigate()
 
  const [questions,setQuestions] = useState([])
  const {votes,search,token } = useContext(store)
  const [sort,setSort] = useState(-1)

  const fetchQuestions = async ( )=>{
    try {
      await axios.get(`${url}allquestions?sort=${sort}`).then((res) => {
        setQuestions(res.data);
      });
    } catch (error) {
      console.log(error)
    }
    
  }
  
  const [open, setOpen] = useState(true);
useEffect(()=>{
  fetchQuestions()
  if(token === null){
    navigate('/login')
  }
  setTimeout(() => {
    setOpen(false)
  }, 10000);
},[votes,sort])


  return (
    <>
    <ModalPopup open={open} setOpen={setOpen}/>
    <Box className="main">
      <Box className="main-container">
        <Box className="main-top">
          <Typography variant='h2'>All Questions</Typography>
            <Button variant='contained' onClick={()=>navigate("/addquestion")} >Ask Question</Button>
        </Box>
        <Box className="main-desc">
          <p> {questions && questions.length} Questions </p>
          <Box className="main-filter">
            <Box className="main-tabs">
              <Box className="main-tab">
                <h5 onClick={()=>setSort(1)}  style={{cursor:"pointer"}} >Oldest</h5>
              </Box>
              <Box className="main-tab">
              <h5 onClick={()=>setSort(-1)}  style={{cursor:"pointer"}} >Newest</h5>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box className="questions">
          {
            questions?.filter(searchItem =>searchItem.title.toLowerCase().includes(search.toLowerCase()))
              
              ?.map((item)=>(
              <div className="question">
                <AllQuestions  data={item}/>
              </div>
            ))
          }
        </Box>
      </Box>
    </Box>
    </>
  )
}

export default Main
