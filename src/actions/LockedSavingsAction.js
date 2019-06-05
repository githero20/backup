import {_axios} from "../utils";
import {BASE_URL, CreateLockedSavings, GetLockedSavingsInterest} from "../RouteLinks/RouteLinks";


export const getLockedInterestSavings = (payload, callback) =>{
    console.log("body", payload);
    _axios.post(`${BASE_URL}/${GetLockedSavingsInterest}`,payload)
        .then(res => {
            console.log(res);
            console.log(res.data.data);
            callback(true, res.data.data);
        })
        .catch(err => {
            callback(false,err);
        })
};

export const createLockedSavings = (payload, callback) =>{
    console.log("body", payload);
    _axios.post(`${BASE_URL}/${CreateLockedSavings}`,payload)
        .then(res => {
            console.log("Res",res);
            callback(true, res.data.data);
        })
        .catch(err => {
            console.log("Err",err);
            callback(false, err);
        })
};