import {_axios, _getHeader} from "../utils";
import {BASE_URL, CreateLockedSavings, GetLockedSavings, GetLockedSavingsInterest} from "../RouteLinks/RouteLinks";
import {checkResponse} from "../ApiUtils/ApiUtils";


export const getLockedInterestSavings = (payload, callback) =>{
    _axios.post(`${BASE_URL}/${GetLockedSavingsInterest}`,payload,{
        headers: _getHeader()
    })
        .then(res => {
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            checkResponse(err);
            callback(false, err.response);
        })
};

export const createLockedSavings = (payload, callback) =>{
    _axios.post(`${BASE_URL}/${CreateLockedSavings}`,payload,{
        headers: _getHeader()
    })
        .then(res => {
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            checkResponse(err);
            callback(false, err.response);
        })
};


export const getLockedSavings = (callback) =>{
    _axios.get(`${BASE_URL}${GetLockedSavings}`,{
        headers: _getHeader()
    })
        .then(res => {
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            checkResponse(err);
            callback(false, err.response);
        })
};