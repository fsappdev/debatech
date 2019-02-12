import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import publicReducer from './publicReducer';
import postReducer from './postReducer';

export default combineReducers({
   public: publicReducer,
   auth: authReducer,
   errors: errorReducer,
   profile: profileReducer,
   post: postReducer
});