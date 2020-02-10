import auth from "./auth/reducer";
import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

const createReducer = () =>
  combineReducers({
    auth,
    router: routerReducer
  });

export default createReducer;
