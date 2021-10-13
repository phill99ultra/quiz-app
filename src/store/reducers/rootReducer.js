import { combineReducers } from "redux";
import quizReducer from './quiz.reducer';
import createReducer from './create.reducer';
import authReducer from "./auth.reducer";

export default combineReducers({
    quiz: quizReducer,
    create: createReducer,
    auth: authReducer
});