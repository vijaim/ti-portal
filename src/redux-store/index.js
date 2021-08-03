import SignInReducer from '../component/signin/signin-reducer'
import { combineReducers } from 'redux'

const RootReducer = combineReducers({
  signIn: SignInReducer
})

export default RootReducer
