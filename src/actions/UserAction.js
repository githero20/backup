import {_axios, _getHeader, _getUser, _setUser} from "../utils";
import {
    BASE_URL,
    getFirstTimeUserEndpoint,
    getUserInfoEndpoint,
    getUserPointsEndpoint,
    getUserRoleEndpoint, storeFirstTimeLoginEndpoint
} from "../RouteLinks/RouteLinks";
import {checkResponse} from "../ApiUtils/ApiUtils";
import axios from "axios";

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
        })
};
export const getFirstTimeUser =  callback =>{
    _axios.get(getFirstTimeUserEndpoint,{
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
        })
};
export const storeFirstTimeLogin =  callback =>{
    _axios.get(storeFirstTimeLoginEndpoint,{
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

// export const getUserRole =  callback =>{
//     _axios.get(getUserRoleEndpoint,{
//         headers: _getHeader()
//     })
//         .then(res => {
//             if(callback){
//                 callback(true, res.data.data);
//             }
//         })
//         .catch(err => {
//             console.log("Err",JSON.stringify(err));
//             checkResponse(err);
//             callback(false, err.response);
//             // if(err.response) {callback(false, err.response.data.data || err.response.data.message);
//             //
//             // }
//         })
// };

export function getUserRole(token=null, callback) {


    let url = `${BASE_URL}${getUserRoleEndpoint}`;

    let header = {
        headers: {
            "Content-Type": "Application/json",
            "credentials": 'same-origin',
        }
    };

    if (token !== null) {
        header.headers['Authorization'] = 'Bearer ' + token;
    }

     axios.get(url, header).then(res => callback(true, res))
        .catch(err => callback(false, err.response))
}
