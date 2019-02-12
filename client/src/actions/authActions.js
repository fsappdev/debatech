import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER } from './types';


//register User
export const registerUser = (userData, history) => dispatch => {
   /* return {
      type: TEST_DISPATCH,
      payload: userData
   } */

   axios
      .post('./api/users/register', userData)
      .then(res => history.push('/login'))
      .catch(err => dispatch({
         type: GET_ERRORS,
         payload: err.response.data
      })
      );
};

//Login - get user token
export const loginUser = userData => dispatch => {
   axios.post('/api/users/login', userData)
      .then(res => {
         //guardar a LS 
         const { token } = res.data;
         //set el token al LS
         localStorage.setItem('jwtToken', token);
         //token al header auth
         setAuthToken(token);
         //decodificamos el token para tener los datos del user
         const decoded = jwt_decode(token);
         //set current user
         dispatch(setCurrentUser(decoded));
      })
      .catch(err =>
         dispatch({
            type: GET_ERRORS,
            payload: err.response.data
         })
      );
};

//set el user loggeado
export const setCurrentUser = (decoded) => {
   return {
      type: SET_CURRENT_USER,
      payload: decoded
   };
};
//desloguear
export const logoutUser = () => dispatch => {
   localStorage.removeItem('jwtToken');
   //removemos el auth header para futuras peticiones
   setAuthToken(false);
   //seteamos el current user a {}
   dispatch(setCurrentUser({}))
}