import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import profileReducer from "./profile-reducer"
import dialogsReducer from "./dialogs-reducer"
import usersReducer from "./users-reducer"
import authReducer from './auth-reducer';
import thunkMiddleware from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import appReducer from './app-reducer';
let reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
  form: formReducer,
});



// let store = createStore(reducers, applyMiddleware(thunkMiddleware))
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(reducers, applyMiddleware(thunkMiddleware))

//@ts-ignore
window.store = store
export default store