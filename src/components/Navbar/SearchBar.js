import { TextField } from '@mui/material'
import React, { useState } from 'react'

const SearchBar = () => {
  const [search ,setSearch] = useState("")
  return (
    
    <>
      <TextField id="standard-basic" label="Standard" variant="standard" />
    </>
  )
}

export default SearchBar