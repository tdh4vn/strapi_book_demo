import {ActionTypes} from '../actions/constants';
import {createReducer} from '../utils';

const initialState = {
    token : null,
    username : null,
    email : null,
    isAuthenticated : false,
    isAuthenticating : false,
    isRegisting : false,
    isRegistered : false,
    statusText : null
};

export default createReducer(initialState, {
    [ActionTypes.ON_LOGIN] : (state, payload) => {
        return Object.assign({}, state, {
            token : null,
            username : null,
            email : null,
            isAuthenticated : false,
            isAuthenticating : true,
            statusText : 'Logging'
        })
    },
    [ActionTypes.ON_LOGIN_SUCCESS] : (state, payload) => {
        return Object.assign({}, state, {
            token : payload.jwt,
            username : payload.username,
            email : payload.email,
            isAuthenticated : true,
            isAuthenticating : false,
            statusText : 'Login success'
        })
    },
    [ActionTypes.ON_LOGIN_FAILED] : (state, payload) => {
        return Object.assign({}, state, {
            token : null,
            username : null,
            email : null,
            isAuthenticated : false,
            isAuthenticating : false,
            statusText : 'Login failed'
        })
    },
    [ActionTypes.ON_REGISTER] : (state, payload) => {
        return Object.assign({}, state, {
            token : null,
            username : null,
            email : null,
            isRegisting : true,
            isRegistered : false,
            statusText : 'Registing'
        })
    },
    [ActionTypes.ON_REGISTER_SUCCESS] : (state, payload) => {
        return Object.assign({}, state, {
            token : payload.jwt,
            username : payload.username,
            email : payload.email,
            isRegisting : false,
            isRegistered : true,
            isAuthenticated : true,
            statusText : 'Register success'
        })
    },
    [ActionTypes.ON_REGISTER_FAILED] : (state, payload) => {
        return Object.assign({}, state, {
            isRegisting : false,
            statusText : 'Login failed'
        })
    }
});




