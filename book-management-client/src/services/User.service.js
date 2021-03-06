var request = require('request');
var APIConfig = require('../configs/APIConfig')
module.exports = {
    /**
     * Register service
     * @param : username, password, email, callback
     * @return : callback(err, response, body)
     */
    registerAPI : function (username, password, email, callback){
        let REGISTER_URI = APIConfig.API_URL + "auth/local/register";

        request.post({
            url : REGISTER_URI,
            form : {
                username : username,
                password : password,
                email : email
            }
        }, 
        (err, res, body) => {
            if(err || res.statusCode != 200){
                callback(new Error());
            } else {
                callback(null, JSON.parse(body));
            }
        })
    },

    /**
     * Login Service
     * @param : username, password, callback
     * @return : callback(err, response, body)
     */
    loginAPI : function (username, password, callback){
        let LOGIN_URI = APIConfig.API_URL + "auth/local";
        request.post({
            url : LOGIN_URI,
            form : {
                identifier : username,
                password : password
            },   
        },
        (err, res, body) => {
            if(err || res.statusCode != 200){
                callback(new Error());
            } else {
                callback(null, JSON.parse(body));
            }
        })
    }
}