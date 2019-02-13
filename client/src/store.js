import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const composedMiddlewares = window._REDUX_DEVTOOLS_EXTENSION_
   ? compose(applyMiddleware(...middleware), window._REDUX_DEVTOOLS_EXTENSION_())
   : applyMiddleware(...middleware);
const store = createStore(
   rootReducer,
   initialState,
   /* compose(applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
   )  */
   composedMiddlewares
);

export default store;


