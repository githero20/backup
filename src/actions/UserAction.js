import {_axios, _getHeader, _getUser, _setUser} from "../utils";
import {getUserInfoEndpoint, getUserPointsEndpoint, getUserRoleEndpoint} from "../RouteLinks/RouteLinks";
import {checkResponse} from "../ApiUtils/ApiUtils";

export const getUserData =  callback =>{
    _axios.get(getUserInfoEndpoint,{
        headers: _getHeader()
    })
        .then(res => {
            if(callback){
                callback(true, res.data.data);
            }
        })
        .catch(err => {
            console.log("Err",JSON.stringify(err));
            checkResponse(err);
            callback(false, err.response);
            // if(err.response) {callback(false, err.response.data.data || err.response.data.message);
            //
            // }
        })
};

export const getUserPoints =  callback =>{
    _axios.get(getUserPointsEndpoint,{
        headers: _getHeader()
    })
        .then(res => {
            if(callback){
                callback(true, res.data.data);
            }
        })
        .catch(err => {
            console.log("Err",JSON.stringify(err));
            checkResponse(err);
            callback(false, err.response);
            // if(err.response) {callback(false, err.response.data.data || err.response.data.message);
            //
            // }
        })
};

export const getUserRole =  callback =>{
    _axios.get(getUserRoleEndpoint,{
        headers: _getHeader()
    })
        .then(res => {
            if(callback){
                callback(true, res.data.data);
            }
        })
        .catch(err => {
            console.log("Err",JSON.stringify(err));
            checkResponse(err);
            callback(false, err.response);
            // if(err.response) {callback(false, err.response.data.data || err.response.data.message);
            //
            // }
        })
};
