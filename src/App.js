import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home';
import Register from './Auth/Register/Register'
import Login from './Auth/Login/Login'
import AskQuestion from './components/Home/Main/AskQuestion';
import ViewQuestion from './components/Home/Main/ViewQuestion/ViewQuestion';
import { createContext, useEffect, useState } from 'react';
import ConfirmAccount from './Auth/ConfirmAccount/ConfirmAccount';
import ForgotPassword from './Auth/ForgotPassword/ForgotPassword';
import ResetPassword from './Auth/ResetPassword/ResetPassword';

export const store = createContext();


function App() {
  const [token,setToken] = useState(localStorage.getItem('jwt-token'));
  const [profile,setProfile] = useState([])
  const [sort,setSort] = useState(-1)
  const [votes,setVotes] = useState(false)
 
 
  useEffect(() => {

  }, [])
  




  return (
    <>
    <store.Provider value={{token,setToken,profile,setProfile,sort,setSort,votes,setVotes}} >
        <Router>
            <Navbar />
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/addquestion' element={<AskQuestion />} />
              <Route exact path='/viewquestion/:id' element={<ViewQuestion />} />
              <Route exact path='/register' element={<Register /> } />
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/confirmAccount/:confirmationToken' element={<ConfirmAccount />} />
              <Route exact path='/forgot-password' element={<ForgotPassword /> } />
              <Route exact path='/resetpassword/:token' element={<ResetPassword /> } />
              
            </Routes>
        </Router>
    </store.Provider>

    </>
  );
}

export default App;
