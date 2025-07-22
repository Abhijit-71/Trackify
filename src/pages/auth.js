import React from 'react'
import { jwtDecode } from 'jwt-decode';
import './auth.css'
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

//components










//Login view


function Login() {

  //form input fields of form

  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const navigate = useNavigate();

  //onsubmit user logs in

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.username || !formData.password){
        alert("Please fill both the fields.");
        return;
    }
    try{
        // replace the url and get the access token
        const login = await axios.post('http://127.0.0.1:8000/api/login/' , formData);
        localStorage.setItem('tokens' , JSON.stringify(login.data));
        alert("Login Successfull !!");
        navigate("/dashboard");
    } catch (error) {
        if(error.response?.status === 400){
          alert("Invalid Credentials !!");
        } else {
          alert("Server Error !!");
        }
    }
    
  };  

  // all html for  login page rendering

  return (
    <div className='main-login'>
        <form onSubmit={handleSubmit} className='form-login'>

         <h2>Login Here</h2>

         <div className='login-comp'>
          <input name='username' type="text" placeholder="Username" value={formData.username} onChange={handleChange} id="username" />

          <input name='password' type="password" placeholder="Password" value={formData.password} onChange={handleChange} id="password" />

          <a href=''>Forgot password ?</a>

          <button className='button_auth' type='submit' >Log In</button>
          
         </div>

         <div className="other">
          <div className='line' style={{display: "flex" , alignItems: "center" , gap: "10px"}}>
            <hr style={{flex: 1}}/><p> OR </p><hr style={{flex: 1}}/>
          </div>
          <div className='socials'>
          </div>
         </div>

         <div className='register-user'>
           <p>Don't have an account ? <a href='/register'>Register</a></p>
         </div>
        </form>
    </div>
  )
}








//Register View

function Register() {

  // same input fields

  const [formData, setFormData] = useState({ username: "", password: "" , email:"" });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const navigate = useNavigate();
   

  // handles submit

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.username || !formData.password){
        alert("All fields are required.");
        return;
    }
    try{

        const register = await axios.post('http://127.0.0.1:8000/api/register/' , formData);
        alert(register.data.message)
        navigate("/login")
        
    } catch (error) {
        alert(JSON.stringify(error.response.data , null , null).replace(/[{}]/g, '').replace(/,/g, '\n').replace(/:/g, ' : ').replace(/"/g, '').trim())
    }
    
  };

  //html for rendering page

  return(
    <div className='main-register'>
        <form onSubmit={handleSubmit} className='form-register'>

         <h2>Register Here</h2>

         <div className='register-comp'>
          <input name='username' type="text" placeholder="Username" value={formData.username} onChange={handleChange} id="username" />

          <input name='password' type="password" placeholder="Password" value={formData.password} onChange={handleChange} id="password" />
          <input name='password2' type="password2" placeholder=" Confirm password" value={formData.password2} onChange={handleChange} id="password" />
          <input name='email' type='email' placeholder='Email' value={formData.email} onChange={handleChange} id='email' />

          <button className='button_auth' type='submit' >Register User</button>
          
         </div>

         <div className="other">
          <div className='line' style={{display: "flex" , alignItems: "center" , gap: "10px"}}>
            <hr style={{flex: 1}}/><p>OR</p><hr style={{flex: 1}}/>
          </div>
          <div className='socials'>
          </div>
         </div>

         <div className='login-user'>
           <p>Already registered ? <a href='/login'>Login</a></p>
         </div>
        </form>
    </div>

  )

}











// Checks for authentication before requests to protected urls

function Authorization() {

  //base config 

  const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',
  });

  const navigate = useNavigate()

  // axios interceptor (request) call befor every request

  axiosInstance.interceptors.request.use(
    async (config) => {

      let tokens = JSON.parse(localStorage.getItem('tokens'));

      if(!tokens){
        return config;
      };

      if (tokens?.access) {
        if (jwtDecode(tokens.access).exp * 1000 < Date.now()) {
          if (tokens.refresh) {
            try {
              const response = await axios.post('http://127.0.0.1:8000/api/refreshtoken/', {
                refresh: tokens.refresh,
              });
              localStorage.setItem('tokens', JSON.stringify(response.data));
              config.headers['Authorization'] = `Bearer ${response.data.access}`;
            } catch (error) {
              // if tokens.refresh post fails (refresh token expires)
              localStorage.removeItem('tokens');
              alert('user logged out !!')
              // removes all tokens and alerts with redirect to login page
              navigate('/login');
            }
          };
        } else {
          config.headers['Authorization'] = `Bearer ${tokens.access}`;
        };
      };
      return config; // returns config can be called later
    },
    (error) => Promise.reject(error)
  );

  return axiosInstance;
}



// checks for authentication of user
/*async function IsAuthenticated(){
  const token = localStorage.getItem('access-tokens');
  const tokens.refresh = localStorage.getItem('refresh-tokens');
  if (!token && !tokens.refresh) return false;
  try{
    if(jwtDecode(token).exp * 1000 > Date.now()){
      return true
    };
    if(tokens.refresh){
      const response = await axios.post('http://127.0.0.1:8000/api/tokens.refresh/', {
        refresh: tokens.refresh,
      });
      token = response.data.access;
      localStorage.setItem('access-tokens', token);
      return true;
    };
    return false
  }catch {
    localStorage.removeItem('access-tokens');
    localStorage.removeItem('refresh-tokens');
    return false;
  }
}
// should be called in useEffect hook */




//Exports all function

export {Login, Register , Authorization}
