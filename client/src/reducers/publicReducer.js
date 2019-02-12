import { GET_PUBLIC_PROFILE } from '../actions/types';

const initialState = {
   publicprofile: null,
   loading: false
}


export default function (state = initialState, action) {
   switch (action.type) {
      case GET_PUBLIC_PROFILE:
         return {
            ...state,
            publicprofile: action.payload,
            loading: false
         }
      default:
         return state;
   }
}