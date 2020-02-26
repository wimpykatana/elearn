import { combineReducers } from "redux";
import courses from './coursesReducer';
import category from './categoryReducer';
import user from './userReducer';
import me from './meReducer';

export default combineReducers({
    me,
    user,
    courses,
    category
});