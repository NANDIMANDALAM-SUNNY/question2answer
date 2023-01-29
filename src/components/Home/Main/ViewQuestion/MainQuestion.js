// import { Avatar } from "@material-ui/core";
import { Avatar, Backdrop, Box, Button, Fade, Modal, TextareaAutosize, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from "react";
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HistoryIcon from '@mui/icons-material/History';
import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import '../../css/viewquestion.css'
import {store} from '../../../../App'
import { url } from '../../../../config/config';
import {
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
  LinkedinShareButton,
  LinkedinIcon,
  EmailShareButton,
  EmailIcon,
} from 'react-share';
import { makeStyles } from '@mui/styles';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


const useStyles = makeStyles(() => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

  },
  paper: {
    zIndex:1000
  },
  icon:{
    marginLeft:"auto",
    marginTop:"10px",
    display:"flex",
    // flexDirection:"column",
    fontSize:"30px",
    
  },
  formControl: {
    margin: "10px",
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: "20px",
    
  },
}));


const  MainQuestion = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [questionData, setQuestionData] = useState();
  const [answer, setAnswer] = useState("");
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState("");
  const {profile,token} = useContext(store)
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
const getSingleQuestion =async () =>{
  try {
    await axios
        .get(`${url}question/${id}`)
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
          .post(`${url}addanswer`, body)
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
      await axios.post(`${url}addcomment/${id}`, body)
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
  
  const [isCopied, setIsCopied] = useState(false);
const handleCopy = ()=>{
  console.log(window.location.href)
  

}
  return (
    <Box className="view-main">
      <Box className="main-container">
        <Box className="main-top">
          <Typography variant='h2' className="main-question">{questionData?.title} </Typography>
          <Link to="/addquestion">
            <Button  variant="contained"  onClick={()=>navigate("/addquestion")} >Ask Question</Button>
          </Link>
        </Box>
        <Box className="main-desc">
          <Box className="info">
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
            <Button onClick={handleOpen}  ><ShareIcon /></Button>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
                >
                <Fade in={open}>
                  <div className={classes.paper}>
                  <ContentCopyIcon 
                    style={{fontSize:"60px !important",
                    position:"relative",
                    backgroundColor:"#89CFF0",
                    padding:"10px",
                    borderRadius:"50%",
                   right:"10px"
                   }}
                   onClick={handleCopy}
                    />
                    <WhatsappShareButton
                      // url={srcDoc}
                      // quote={srcDoc}
                      hashtag={'#Coding'}
                    >
                      <WhatsappIcon size={40} round={true} />
                    </WhatsappShareButton>
                 

                    <TelegramShareButton
                        //  url={srcDoc}
                        // quote={srcDoc}
                        hashtag={'#Coding'}
                    >
                    <TelegramIcon size={40} round={true} />
                    </TelegramShareButton>
                    <LinkedinShareButton
                        // url={srcDoc}
                        // quote={srcDoc}
                        hashtag={'#Coding'}
                    >
                      <LinkedinIcon size={40} round={true} />
                    </LinkedinShareButton>

            </div>
                </Fade>
              </Modal>
          </Box>
        </Box>
        <img src={questionData?.questionphoto} style={{width:"50%",height:"50%",marginTop:"20px"}} />
        <Box className="all-questions">
          <Box className="all-questions-container">
            <Box className="question-answer">
                	<p>{questionData?.body}</p>
              <Box className="author">
                <small>
                  asked {new Date(questionData?.created_at).toLocaleString()}
                </small>
                <Box className="auth-details">
                  <Avatar  src={questionData?.userDetails[0]?.profile} />
                  <Typography variant='p'>
                    {questionData?.userDetails[0]?.name
                      ? questionData?.userDetails[0]?.name
                      : "Shalem Raju"}
                  </Typography>
                </Box>
              </Box>
              <Box className="comments">
                <Box className="comment">
                {questionData?.comments.length >0 ? <h2>Comments for this question</h2> : null}
                  {questionData?.comments &&
                    questionData?.comments.map((_qd) => (
                      <Typography variant='p' key={_qd?._id}>
                        {_qd.comment}{" "}
                        
                        <span>
                          - {_qd.singleUserComments ? _qd.singleUserComments[0].name: "Nate Eldredge"}
                        </span>{" "}
                        {"    "}
                        <small>
                          {new Date(_qd.created_at).toLocaleString()}
                        </small>
                      </Typography>
                    ))}
                </Box>
                <Typography variant='p' onClick={() => setShow(!show)}>Add a comment</Typography>
                {show && (
                  <Box className="title">
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
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
        <Box  style={{ flexDirection: "column",  }} className="all-questions">
          <Typography variant='p'
            style={{
              marginBottom: "20px",
              fontSize: "1.3rem",
              fontWeight: "300",
            }}
          >
           {questionData?.answerDetails.length}  Answers
           
          </Typography>
          {questionData?.answerDetails.map((_q,index) => (
            <>
              <Box
                style={{borderBottom: "1px solid #eee"}}
                key={_q._id}
                className="all-questions-container"
              >
                <Box className="all-questions-left">
                  <Box className="all-options">
                    <Typography variant='p' className="arrow">{index+1}</Typography>
                    <span>Answer</span>
                  </Box>
                </Box>
                <Box className="question-answer">
                  {_q.answer}
                  <Box className="author">
                    <small>asked {new Date(_q.created_at).toLocaleString()}</small>
                    <Box className="auth-details">
                      <Avatar src={_q?.singleuserDetails[0]?.profile} />
                      <p>
                        {_q?.singleuserDetails[0]?.name
                          ? _q?.singleuserDetails[0]?.name
                          : "Natalia lee"}
                      </p>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </>
          ))}
        </Box>
      </Box>
      <Box className="main-answer">
        <Typography variant='h3'
          style={{
            fontSize: "22px",
            margin: "10px 0",
            fontWeight: "400",
          }}
        >
          Your Answer
        </Typography>
        <TextareaAutosize
          value={answer}
          style={{width:"100%",padding:"10px"}}
          minRows={10}
          onChange={(e)=>setAnswer(e.target.value)}

        />
      </Box>
      <button
        onClick={handleAddAnswer}
        style={{
          marginTop: "100px",
          maxWidth: "fit-content",
        }}
      >
        Post your answer
      </button>
    </Box>
  );
}

export default MainQuestion;