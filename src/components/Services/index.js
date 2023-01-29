import React from 'react'
import { makeStyles } from '@mui/styles';
import { Box, Typography } from '@mui/material';
import { borderRadius } from '@mui/system';


const useStyles = makeStyles({
    servicesMain : {
        padding: "30px 10px",
        marginLeft: "50px",
        marginRight: "50px",
    },
    content:{
        border:"1px solid grey",
        borderRadius:"10px"
    },
    typography:{
        color:"#42424E"
    }
})

const Services = () => {
    const classes = useStyles();

  return (
    <>
        <Box className={classes.servicesMain}>
            <Box className={classes.content} >
                <Typography variant='h4' ml={3} mt={2}>Question2Answer service providers</Typography>
                <Typography className={classes.typography}  mb={1} mt={1} p={3}>The following websites and providers specialize in Question2Answer services and information. This information is provided as a free service to the community, and the listings are not endorsed. If you wish to be included here, please contact us.
                </Typography>
                <Typography variant='h4' ml={3} >Community Support </Typography>
                <Typography className={classes.typography}  mb={1} mt={1} p={3}>The Question2Answer Q&A site provides free support from the community. Check out these help posts to ensure you have the best chances of getting your questions answered
                </Typography>
            </Box>
        </Box>
    </>
  )
}

export default Services