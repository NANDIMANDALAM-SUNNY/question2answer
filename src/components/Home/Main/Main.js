import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AllQuestions from './AllQuestions'
import '../css/main.css'
import axios from 'axios'
import { store } from '../../../App'

const Main = () => {

  const [questions,setQuestions] = useState([])
  const [sort,setSort] = useState(-1)
const {votes } = useContext(store)
  const fetchQuestions = async ( )=>{
    try {
      await axios.get(`https://question-qjn9.onrender.com/allquestions?sort=${sort}`).then((res) => {
        setQuestions(res.data);
        console.log(res.data)
      });
    } catch (error) {
      console.log(error)
    }
    
  }

  useEffect(()=>{
    fetchQuestions()
  },[sort,votes])

  return (
    <>
        <div className="main">
      <div className="main-container">
        <div className="main-top">
          <h2>All Questions</h2>
          <Link to="/addquestion">
            <button>Ask Question</button>
          </Link>

          {/* <a href="/add-question"> */}

          {/* </a> */}
        </div>
        <div className="main-desc">
          <p> {questions && questions.length} Questions </p>
          <div className="main-filter">
            <div className="main-tabs">
              <div className="main-tab">
                {/* <Link to="/">Newest</Link> */}
                <h5 onClick={()=>setSort(1)}  style={{cursor:"pointer"}} >Newest</h5>
              </div>
              <div className="main-tab">
              <h5 onClick={()=>setSort(-1)}  style={{cursor:"pointer"}} >Oldest</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="questions">
          {
            questions?.map((item)=>(
              <div className="question">
                <AllQuestions  data={item}/>
              </div>
            ))
          }
            {/* <div className="question">
          <AllQuestions />
          <AllQuestions />
          <AllQuestions />
          <AllQuestions />
          <AllQuestions />
          <AllQuestions />
          </div> */}
        </div>
      </div>
    </div>
    </>
  )
}

export default Main
