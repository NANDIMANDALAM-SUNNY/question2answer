// import { Avatar } from "@material-ui/core";
import { Avatar, TextareaAutosize } from '@mui/material'
import React, { useContext, useEffect, useState } from "react";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HistoryIcon from '@mui/icons-material/History';
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import '../../css/viewquestion.css'
import {store} from '../../../../App'

const  MainQuestion = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [questionData, setQuestionData] = useState();
  const [answer, setAnswer] = useState("");
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState("");
  const {profile,token} = useContext(store)
const getSingleQuestion =async () =>{
  try {
    await axios
        .get(`https://question-qjn9.onrender.com/question/${id}`)
        .then((res) => 
        {
          console.log(res.data[0])
          setQuestionData(res.data[0])
        }
          )
  } catch (error) {
    console.log(error)
  }
}


  const handleAddAnswer = async () => {
   try {
    if(answer !== ""){
        const body = {
        question_id: id,
        answer: answer,
        user: profile._id,
        };
        await axios
          .post("https://question-qjn9.onrender.com/addanswer", body)
          .then(() => {
            alert("Answer added successfully");
            setAnswer("");
            getSingleQuestion();
          })
      }
   } catch (error) {
    console.log(error)
   }
    };

 
  
  const handleAddComment = async () => {
    if (comment !== "") {
      const body = {
        question_id: id,
        comment: comment,
        user: profile._id,
      };
      await axios.post(`https://question-qjn9.onrender.com/addcomment/${id}`, body)
      .then((res) => {
        setComment("");
        setShow(false);
        getSingleQuestion()
      });
    }

    setShow(true)
  };

  useEffect(() => {
    getSingleQuestion();

    if(token === null){
      navigate('/login')
    }
  }, [id]);


  return (
    <div className="view-main">
      <div className="main-container">
        <div className="main-top">
          <h2 className="main-question">{questionData?.title} </h2>
          <Link to="/addquestion">
            <button>Ask Question</button>
          </Link>
        </div>
        <div className="main-desc">
          <div className="info">
            <p>
              Asked
              <span>{new Date(questionData?.created_at).toLocaleString()}</span>
            </p>
            <p>
              Active<span>today</span>
            </p>
            <p>
              Viewed<span>{questionData?.views}</span>
            </p>
          </div>
        </div>
        <img src={questionData?.questionphoto} style={{width:"100%",marginTop:"20px"}} />
        <div className="all-questions">
          <div className="all-questions-container">
            <div className="question-answer">
                	<p>{questionData?.body}</p>
              <div className="author">
                <small>
                  asked {new Date(questionData?.created_at).toLocaleString()}
                </small>
                <div className="auth-details">
                  <Avatar  src={questionData?.userDetails[0]?.profile} />
                  <p>
                    {questionData?.userDetails[0]?.name
                      ? questionData?.userDetails[0]?.name
                      : "Natalia lee"}
                  </p>
                </div>
              </div>
              <div className="comments">
                <div className="comment">
                {questionData?.comments.length >0 ? <h2>Comments for this question</h2> : null}
                  {questionData?.comments &&
                    questionData?.comments.map((_qd) => (
                      <p key={_qd?._id}>
                        {_qd.comment}{" "}
                        
                        <span>
                          - {_qd.singleUserComments ? _qd.singleUserComments[0].name: "Nate Eldredge"}
                        </span>{" "}
                        {"    "}
                        <small>
                          {new Date(_qd.created_at).toLocaleString()}
                        </small>
                      </p>
                    ))}
                </div>
                <p onClick={() => setShow(!show)}>Add a comment</p>
                {show && (
                  <div className="title">
                    <TextareaAutosize
                      style={{
                        margin: "5px 0px",
                        padding: "10px",
                        border: "1px solid rgba(0, 0, 0, 0.2)",
                        borderRadius: "3px",
                        outline: "none",
                      }}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      type="text"
                      placeholder="Add your comment..."
                      rows={5}
                    />
                    <button
                      onClick={handleAddComment}
                      style={{
                        maxWidth: "fit-content",
                      }}
                    >
                      Add comment
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div  style={{ flexDirection: "column",  }} className="all-questions">
          <p
            style={{
              marginBottom: "20px",
              fontSize: "1.3rem",
              fontWeight: "300",
            }}
          >
           {questionData?.answerDetails.length}  Answers
           
          </p>
          {questionData?.answerDetails.map((_q,index) => (
            <>
              <div
                style={{borderBottom: "1px solid #eee"}}
                key={_q._id}
                className="all-questions-container"
              >
                <div className="all-questions-left">
                  <div className="all-options">
                    <p className="arrow">{index+1}</p>
                    <span>Answer</span>
                  </div>
                </div>
                <div className="question-answer">
                  {_q.answer}
                  <div className="author">
                    <small>asked {new Date(_q.created_at).toLocaleString()}</small>
                    <div className="auth-details">
                      <Avatar src={_q?.singleuserDetails[0]?.profile} />
                      <p>
                        {_q?.singleuserDetails[0]?.name
                          ? _q?.singleuserDetails[0]?.name
                          : "Natalia lee"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
      <div className="main-answer">
        <h3
          style={{
            fontSize: "22px",
            margin: "10px 0",
            fontWeight: "400",
          }}
        >
          Your Answer
        </h3>
        <TextareaAutosize
          value={answer}
          style={{width:"100%",padding:"10px"}}
          minRows={10}
          onChange={(e)=>setAnswer(e.target.value)}

        />
      </div>
      <button
        onClick={handleAddAnswer}
        style={{
          marginTop: "100px",
          maxWidth: "fit-content",
        }}
      >
        Post your answer
      </button>
    </div>
  );
}

export default MainQuestion;