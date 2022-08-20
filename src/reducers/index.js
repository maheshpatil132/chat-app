import { combineReducers } from "redux";
import UserReducer from "./userSlice";
import Addhim from "./add";
const rootReducer = combineReducers({UserReducer , Addhim})

export default rootReducer