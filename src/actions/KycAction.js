import {_axios, _getHeader} from "../utils";
import {GetUserKYC} from "../RouteLinks/RouteLinks";
import {checkResponse} from "../ApiUtils/ApiUtils";



export const getUserKyc = (callback) =>{
    _axios.get(GetUserKYC,{
        headers: _getHeader()
    })
        .then(res => {
            callback(res.data.status == "success", res.data);
        })
        .catch(err => {

            // callback(false, err || "An Error Occurred");
            checkResponse(err);
            callback(false, err.response);
        })
};

export const storeUserKyc = (payload,callback) =>{
    _axios.post(GetUserKYC,payload,{
        headers: _getHeader()
    })
        .then(res => {
            callback(res.data.status == "success", res.data);
        })
        .catch(err => {

            // callback(false, err || "An Error Occurred");
            checkResponse(err);
            callback(false, err.response);
        })
};

