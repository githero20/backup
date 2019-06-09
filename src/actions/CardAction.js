import {_axios} from "../utils";
import {
    GetUsersCards,
    InitiateTransactionEndpoint,
    verifyTransactionEndpoint
} from "../RouteLinks/RouteLinks";


export const initTransaction = (payload, callback) =>{
    console.log("body", payload);
    _axios.post(InitiateTransactionEndpoint,payload)
        .then(res => {
            console.log("Res",res);
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            console.log("Err",err);
            callback(false, err.response.data.data || err.response.data.message);
        })
};


export const verifyTransaction = (payload, callback) =>{
    _axios.post(verifyTransactionEndpoint,payload)
        .then(res => {
            console.log("Res",res);
            callback(true, res.data.data);
        })
        .catch(err => {
            console.log("Err",JSON.stringify(err));
            console.log("Err",err);
            callback(false, err.response.data.message);
        })
};

export const getUserCards = (callback) => {
    _axios.get(GetUsersCards)
        .then(res => {
            // console.log("Res",res);
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            // console.log("Err",err);
            callback(false, err.response.data.message);
        })
};