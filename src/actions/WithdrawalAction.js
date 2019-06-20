import {_axios} from "../utils";
import {
    CreateWithdrawalSettings,
    GetWithdrawal,
    GetWithdrawalPenalty,
    GetWithdrawalSettings,
    MakeWithdrawal,
} from "../RouteLinks/RouteLinks";
import {checkResponse} from "../ApiUtils/ApiUtils";


export const getWithdrawalList = (callback) =>{
    _axios.get(GetWithdrawal)
        .then(res => {
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            console.log("Err", JSON.stringify(err));
            console.log("Err", err);
            checkResponse(err);
            callback(false, err.response);
            // if(err.response){
            //     callback(false, err.response.data.message || "AN Error Occurred");
            // }
        })
};


export const getWithdrawalPenalty = (callback) => {
        _axios.get(`${GetWithdrawalPenalty}`)
        .then(res => {
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            console.log("Err", JSON.stringify(err));
            try{
                console.log("Err", JSON.stringify(err));
                checkResponse(err);
                callback(false, err.response);
            }catch (e) {
                //log both e and err
                callback(false, " An Error Occurred");
            }
        })
};


export const createWithdrawalSettings = (payload, callback) => {
    _axios.post(`${CreateWithdrawalSettings}`, payload)
        .then(res => {
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            try{
                console.log("Err", JSON.stringify(err));
                checkResponse(err);
                callback(false, err.response);
            }catch (e) {
                //log both e and err
                callback(false, " An Error Occurred");
            }
        })
};

export const getWithdrawalSettings = (callback) => {
    _axios.get(`${GetWithdrawalSettings}`)
        .then(res => {
            callback(res.data.status == "success", res.data);
        })
        .catch(err => {
            try{
                console.log("Err", JSON.stringify(err));
                checkResponse(err);
                callback(false, err.response);
            }catch (e) {
                //log both e and err
                callback(false, " An Error Occurred");
            }
        })
};

export const makeWithdrawal = (payload, callback) => {
    _axios.post(`${MakeWithdrawal}`, payload)
        .then(res => {
            console.log(res);
            console.log(res.data.data);
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            try{
                console.log("Err", JSON.stringify(err));
                checkResponse(err);
                callback(false, err.response.data.message);
            }catch (e) {
                //log both e and err
                console.log("Err", e);
                callback(false, " An Error Occurred");
            }
        })
};
