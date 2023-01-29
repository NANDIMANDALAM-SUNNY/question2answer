import { Button, Card, CardContent, Grid, TextareaAutosize, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'

const AskMeAnything = ({doStuff,setInput,result,example,loading}) => {
  
  // if(result)
  console.log(loading)
  return (
    <>

    <Grid container spacing={2} marginTop={4}>
    <Grid item xs={0} md={3} lg={3}></Grid>
      <Grid item xs={12} md={3} lg={3}>
        <Box>
        <Typography variant='h6'  textAlign={'center'}>Example</Typography>
        <Card >
                <CardContent   >
                  <Box  >{example}</Box>
                </CardContent>
              </Card>
        </Box> 
      </Grid>
      <Grid item xs={12} md={3} lg={3}>
          <TextareaAutosize 
                style={{padding:'10px'}}
                aria-label="empty textarea"
                placeholder="Give some information about question"
                minRows={20}
                cols={50}
                onChange={(e) => setInput(e.target.value)}
                /> 
      </Grid>
    </Grid>
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
    >
      <Button sx={{marginTop:"20px",marginBottom:"20px"}} variant='contained' onClick={doStuff} >{loading ? "Loading...":"Submit"}</Button>
        <Grid item xs={3} md={5} lg={5} >
            <Typography textAlign={'center'}  maxWidth={800} >{result?.length > 0 ? result : ""}</Typography>
        </Grid>   
    </Grid> 
   
    </>
  )
}

export default AskMeAnything