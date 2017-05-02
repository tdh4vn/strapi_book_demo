import {ActionTypes} from './constants';
import UserService from '../services/User.service';

export function loginRequest(){
    return {
        type : ActionTypes.ON_LOGIN
    }
}

export function loginSuccess(jwt, username){
    return {
        type : ActionTypes.ON_LOGIN_SUCCESS,
        payload : {
            username : username,
            token : jwt
        }
    }
}

export function loginFailed(){
    return {
        type : ActionTypes.ON_LOAD_BOOKS_FAILED
    }
}

export function registerRequest(){
    return {
        type : ActionTypes.ON_REGISTER,
    }
}

export function registerFailed(){
    return {
        type : ActionTypes.ON_REGISTER_FAILED
    }
}

export function registerSuccess(jwt, username, email){
    return {
        type :  ActionTypes.ON_REGISTER_SUCCESS,
        payload : {
            token : jwt,
            username : username,
            email : email
        }
    }
}

export function loginUser(username, password) {
    return function(dispatch){
        dispatch(loginRequest());
        return UserService.loginAPI(username, password, (err, body) => {
            if(err){
                dispatch(loginFailed());
            } else {
                dispatch(loginSuccess(body.jwt, body.username));
            }
        })
    }
}

export function registerUser(username, password, email){
    return function(dispatch){
        dispatch(registerRequest());
        return UserService.registerAPI(username, password, email, (err, body) => {
            
        })
    }
}