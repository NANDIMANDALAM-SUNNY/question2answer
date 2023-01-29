import { Button, Grid, TextareaAutosize, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const AskMeAnything = ({doStuff,setInput,result}) => {
  console.log(result)
  return (
    <>
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item xs={3} sx={{marginTop:"40px"}}>
        <TextareaAutosize 
            style={{padding:'10px'}}
            aria-label="empty textarea"
            placeholder="Give some information about question"
            minRows={20}
            cols={50}
            onChange={(e) => setInput(e.target.value)}
            /> 
        </Grid>   
            <Button variant='contained' onClick={doStuff} >Submit</Button>
        <Grid item xs={3}>
            <Typography  >{result?.length > 0 ? result : ""}</Typography>
        </Grid>   
    </Grid> 
   
    </>
  )
}

export default AskMeAnything