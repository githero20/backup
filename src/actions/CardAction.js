import {_axios, _getHeader} from "../utils";
import {
    GetUsersCards,
    InitiateTransactionEndpoint,
    verifyTransactionEndpoint
} from "../RouteLinks/RouteLinks";
import {checkResponse} from "../ApiUtils/ApiUtils";


export const initTransaction = (payload, callback) =>{
    _axios.post(InitiateTransactionEndpoint,payload,{
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


export const verifyTransaction = (payload, callback) =>{
    _axios.post(verifyTransactionEndpoint,payload,{
        headers: _getHeader()
    })
        .then(res => {
            callback(true, res.data.data);
        })
        .catch(err => {
            checkResponse(err);
            callback(false, err.response);
        })
};

export const getUserCards = (callback) => {
    _axios.get(GetUsersCards,{
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