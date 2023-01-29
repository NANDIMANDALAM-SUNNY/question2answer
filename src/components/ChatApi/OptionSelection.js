import { Grid } from '@mui/material'
import React from 'react'
import { arrayItems } from './AiOptions'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const OptionSelection = ({arrayItems,selectOption ,setExampleStuff}) => {
const handleClick = (selectedOption,example)=>{
  selectOption(selectedOption)
  setExampleStuff(example);
}

  return (
    <>
      <Grid container  >
        {
          arrayItems.map((item) => {
            
          return (
            <>
            <Grid sx={{padding:"30px"}}  item xs={12} md={4} lg={4} >
              <Card  onClick={() => handleClick(item.option,item.example)}>
                <CardContent   >
                <Box sx={{display:"flex"}}>
                  <Box  sx={{display:"inline-block",
                              backgroundColor:`${item.bgColor}`,
                              padding:"8px",borderRadius:"10px",
                              marginRight:"10px",
                              color:"white"                              
                              }} >
                              {item.icon}
                              
                    </Box>
                    <Box>
                    <Typography sx={{fontWeight:"700",marginBottom:"10px"}} variant="p">{item.name}</Typography>
                    <Typography variant="body2">{item.description}</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            </>
          );
        })}
      </Grid>
    </>
  )
}

export default OptionSelection