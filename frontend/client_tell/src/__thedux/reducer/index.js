import { combineReducers } from "redux";
import courses from './coursesReducer';
import category from './categoryReducer';
import user from './userReducer';
import forgotPwd from './forgotPwdReducer';
import search from './searchReducer';
import emiten from './emitenReducer';
import contact from './contactReducer';
import popup from './popupReducer';
import ratings from './ratingsReducer';

export default combineReducers({
    user,
    courses,
    forgotPwd,
    category,
    search,
    emiten,
    contact,
    ratings,
    popup
})
