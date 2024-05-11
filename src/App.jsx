import {useEffect} from 'react'
import {useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiClient from './url/index';
import Router from './routes';
import { userAction } from './store/slices/UserSlice';
import './App.css';
import Cookies from 'js-cookie'; 

function App() {
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  useEffect(()=>{
    const token = localStorage.getItem('token')

    if(token){
      dispatch(userAction.setToken(token))
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      //fetchUserData(token)
    }
   
    else{
      navigate('/login')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (<Router />);

}

export default App;