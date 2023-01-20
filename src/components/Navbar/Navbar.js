import * as React from 'react';
import { useEffect, useContext } from 'react';
import axios from 'axios';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { store } from '../../App';
import logo from './logo.png'

const settings = ['Logout'];

function Navbar() {
  const {token,profile,setProfile,setToken} = useContext(store)
  const navigate = useNavigate()
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const getProfile = async ()=>{
    try {
        await axios.get("https://question-qjn9.onrender.com/users/getProfile",{
        headers: { "jwt-token" : token }
      }).then(res=>setProfile(res.data.data))
    } catch (error) {
      console.log(error)
    }
  }

const handlelogout = () =>{
  setToken(localStorage.removeItem("jwt-token"))
  navigate('/login')
}
  useEffect(() => {
    getProfile()
  }, [token])


  return (
    <>
      {
        token && profile !== undefined ? <>
        <AppBar position="static">
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                <img src={logo} width="50px" sx={{ display: { xs: 'none', md: 'flex' } }} />
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  sx={{
                    ml: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 600,
                    
                    textDecoration: 'none',
                  }}
                >
                <Link to='/'>
                  Question2Answer
                </Link>
                </Typography>
                <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                <Typography
                  variant="h5"
                  noWrap
                  component="a"
                
                  sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  <Link to='/'>
                  Question2Answer
                </Link>
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                </Box>

                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="Remy Sharp" src={profile?.profile} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    
                      <MenuItem  onClick={handleCloseUserMenu}>
                        <Typography textAlign="center" onClick={handlelogout} >Logout</Typography>
                      </MenuItem>
                  </Menu>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
        </>:null
      }
    </>
  
  );
}
export default Navbar;