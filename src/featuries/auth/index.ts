import {logIn, setIsLoggedIn, logOut} from './model/authReducer';
import {Login} from './ui/Login';

const authActions = {
    logIn, 
    setIsLoggedIn, 
    logOut
}
export {
    authActions,
    Login
}