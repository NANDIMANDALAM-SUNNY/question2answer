import React, {useEffect, useState} from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import { motion } from "framer-motion";



  const styles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: "#fff",
    color: "#000",
    textAlign: "center",
    borderRadius: "20px",
    padding: "30px 30px 70px",
  }

const ModalPopup = ({open,setOpen}) => {
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [quote,setQuote] = useState([])
    const getRandomQuote = async (items)=>{
      await setQuote(items[Math.floor(Math.random()*items.length)])
    }
    const fetchQuote = async () =>{
      try {
        await axios.get(`https://type.fit/api/quotes`)
        .then(res=>getRandomQuote(res.data))
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(()=>{
      fetchQuote()
    },[])
  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <motion.div
        >
        <Box  sx={styles}>
          <Typography variant='h5' id="modal-modal-title"  component="h2">
            {quote.text}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {quote.author}
          </Typography>
        </Box>
        </motion.div>
      </Modal>
  </Box>
  )
}

export default ModalPopup