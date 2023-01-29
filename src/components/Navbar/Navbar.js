import React,{useContext, useEffect} from 'react';
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
import { store } from '../../App';
import { useNavigate } from 'react-router-dom';
import { url } from '../../config/config';
import axios from 'axios';
import logo from './logo.png'
import { TextField } from '@mui/material';



const settings = ['Logout'];


const Navbar = () => {
  const {token,profile,setProfile,setToken,search,setSearch} = useContext(store)
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
        await axios.get(`${url}users/getProfile`,{
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
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
                <MenuItem  > 
                <TextField 
                  id="standard-basic" 
                  label="Search Question" 
                  variant="standard" 
                  value={search} 
                  onChange={(e)=>setSearch(e.target.value)} 
                  sx={{color:"white"}} 
                  />
                </MenuItem>
            </Menu>
          </Box>
          <img  onClick={()=>navigate("/")} src={logo} width="50px" sx={{ display: { xs: 'none', md: 'flex' } }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
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
            
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex',justifyContent:'center' } }}>
            <TextField 
              id="standard-basic" 
              label="Search Question" 
              variant="standard" 
              value={search} 
              onChange={(e)=>setSearch(e.target.value)} 
              sx={{color:"white"}} 

              />
          </Box>
          <Typography sx={{cursor:"pointer"}} onClick={()=>navigate('/trysomethingnew')} >Try SomeThing New</Typography>
          <Typography sx={{cursor:"pointer"}} onClick={()=>navigate('/services')} >Services</Typography>
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

                <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center" onClick={handlelogout} >Logout</Typography>
                </MenuItem>
            
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </> : null
    }
    </>
  );
}
export default Navbar;
