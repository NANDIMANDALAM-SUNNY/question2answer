import { Avatar, Box } from "@mui/material";
import React, { useContext, useState } from "react";
import "../css/Allquestions.css";
import { Link } from "react-router-dom";
import { store } from "../../../App";
import axios from "axios";
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';


const  AllQuestions = ({ data }) => {
  const {setVotes,votes} = useContext(store)

  const handleClickVotes = async (msg) =>{
    
    try {
      await axios.get(`https://question-qjn9.onrender.com/updatevote/${data._id}/${msg}`)
      .then((res)=>console.log(res.data))
      setVotes(!votes)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="all-questions">
      <div className="all-questions-container">
        <div className="all-questions-left">
          <div className="all-options">
          <div className="all-option">
          <p className="arrow" onClick={()=>handleClickVotes("+")}  ><ThumbUpAltIcon /></p>
          </div>
          <div className="all-option">
              <p>{data?.votes}</p>
              <span>votes</span>
            </div>
          <div className="all-option" >
            <p className="arrow" onClick={()=>handleClickVotes("-")}  ><ThumbDownIcon /></p>
          </div>

            <div className="all-option">
              <p>{data?.answerDetails?.length}</p>
              <span>answers</span>
            </div>
            <div className="all-option">
              <small>{data?.views} views</small>
            </div>
          </div>
        </div>
        <div className="question-answer">
          <Link to={`/viewquestion/${data?._id}`}>{data.title}</Link>
          <div style={{maxWidth: "90%",backgroundColor:"#F6F6F6",height:"auto",borderRadius:"10px",padding:"10px"}} >
            <div>{data?.body.slice(0,160)}</div>
          </div>
            <img src={data?.questionphoto} style={{width:"100%",marginTop:"20px"}}/>
          <div style={{  display: "flex",  }} >
                {
                  data?.tags?.map((item)=>(
                    <p
                    style={{
                      margin: "10px 5px",
                      padding: "5px 10px",
                      backgroundColor: "#007cd446",
                      borderRadius: "3px",
                    }}
                    >
                      {item}
                    </p>
                  ))
                }
          </div>
          <div className="author">
            <small>Created At</small>
            <small>{new Date(data?.created_at).toLocaleString()}</small>
            <div className="auth-details">
              <Avatar src={data?.userDetails[0]?.profile} />
              <p>
                {data?.userDetails[0]?.name
                  ? data?.userDetails[0]?.name
                  : "Natalie lee"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllQuestions;