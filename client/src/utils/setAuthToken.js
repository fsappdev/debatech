import axios from 'axios';

const setAuthToken = token => {
   if (token) {
      //aplicamos a cada peticion
      axios.defaults.headers.common['Authorization'] = token;
   } else {
      //borramos el header auth
      delete axios.defaults.headers.common['Authorization'];
   }
};

export default setAuthToken;
