import React from 'react'
import { jwtDecode } from 'jwt-decode';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

//components






const apiUrl = "https://trackify-backend-kwws.onrender.com/"

// Checks for authentication before requests to protected urls

function Authorization() {

  //base config 

  const axiosInstance = axios.create({
    baseURL: apiUrl+'api/',
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
              const response = await axios.post(apiUrl+'api/refreshtoken/', {
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
      const response = await axios.post(apiUrl+'api/tokens.refresh/', {
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

export {Authorization}
