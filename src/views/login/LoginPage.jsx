import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { userAction } from '../../store/slices/UserSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiClient from '../../url/index';
import classNamees from './LoginPage.module.css';
import hibretlogo from '../../assets/hibretlogo.png';
import dashenlogo from '../../assets/DashenLogo.png';
import emoje from '../../assets/emoji.png';
import Cookies from 'js-cookie';
import {buttonAction} from '../../store/slices/ButtonSpinerSlice'


const LoginPage = () => {
  const isLoading = useSelector((state) => state.btn.isLoading);
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({ email: '', password: '', errNotify: '' })
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const changeHandler = (e) => {
    const { name, value } = e.target
    setCredentials(prevValues => {
      return { ...prevValues, [name]: value }
    })
    if (e.target.value) {
      setErrors(prevErrors => {
        return { ...prevErrors, [name]: '' }
      })
    }
  }
  const validate = (values) => {
    const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
    const errorValues = {}
    if (!values.email.trim()) {
      errorValues.email = 'email is required'
    }
    else if (!regexExp.test(values.email)) {
      errorValues.email = 'invalid email address'
    }
    if (!values.password) {
      errorValues.password = 'password is required'
    }
    else if (values.length > 15) {
      errorValues.password = 'password must not be greater than 15 characters'
    }
    return errorValues
  }
  
  const saveUserData = (data) =>{
        apiClient.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        localStorage.setItem("token", data.token);
        dispatch(userAction.setToken(data.token))
        dispatch(userAction.setIsAuthenticated(true))
        console.log('sa data',data)
  }
  const loginHandler = async (e) => {
    e.preventDefault();
    setErrors(validate(credentials))
    if(!errors.email && !errors.password){
    try {
      const response = await apiClient.post('auth/login', credentials);
      const token = response.data.token;
      localStorage.setItem('token', token);
      Cookies.set('token', token); 
      console.log(response);
      saveUserData(response.data)
      navigate('/farmersList');
    } catch (error) {
      // Handle errors
      console.error('Error occurred:', error);
    }
  };
}
  return (
    <div className="flex items-center w-full h-screen flex-wrap lg:justify-center">
      <div
        className="flex flex-col overflow-hnameden  bg-violet  rounded-md shadow-lg max md:flex-row md:flex-1 lg:flex-1"
      >

        <div className=" pt-3 text-white h-screen bg-gradient-to-b from-ad to-ab md:w-100 md:flex-wrap md:flex md:flex-col md:items-center md:justify-evenly">


          <img className="px-10" src={dashenlogo} alt="hibret logo" height={20} />

          <p className=" text-sm text-center font-bold text-gray-300 absolute bottom-0 pb-4 sm:text-center"> 
            powered by lersha
          </p>
        </div>
        <div className="p-4 lg:w-1/3 mx-auto my-20 md:w-1/4 bg-white flex flex-col justify-center rounded-md">
          <div className="flex flex-col gap-1 font-sans mb-3 w-full items-baseline h-15">
            <h3 className="text-xl font-semibold text-gray-700 flex items-start h-full">Welcome 👋</h3>
            <label className="text-sm  text-gray-500 flex items-start">Sign in to your account</label>

          </div>
          <form className="flex flex-col space-y-5">
            <div className="flex flex-col space-y-1">
              <label className="text-sm pt-3 text-gray-500 flex items-start">Email</label>
              <input
                type="email"
                name="email"
                value={credentials.email}

                onChange={changeHandler}

                autoFocus
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-sm  text-gray-500">Password</label>
                <a href="#" className="text-sm  hover:underline focus:text-blue-800">Forgot Password?</a>
              </div>
              <input
                type="password"
                name="password"
                value={credentials.password}

                onChange={changeHandler}

                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="remember"

                className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
              />
              <label className="text-sm font-semibold text-gray-500">Remember me</label>
            </div>
            <div>
              <button
                type="submit"
                
                className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-gradient-to-b from-ad to-ab md:w-90 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                onClick={loginHandler}>
                Sign in
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}
export default LoginPage