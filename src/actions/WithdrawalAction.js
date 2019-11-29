import {_axios, _getHeader} from "../utils";
import {
    changeWithdrawalPin,
    CreateWithdrawalSettings, getUserWithdrawalPin,
    GetWithdrawal,
    GetWithdrawalPenalty,
    GetWithdrawalSettings,
    MakeWithdrawal, storeWithdrawalPin,
} from "../RouteLinks/RouteLinks";
import {checkResponse} from "../ApiUtils/ApiUtils";


export const getWithdrawalList = (callback) =>{
    _axios.get(GetWithdrawal,{
        headers: _getHeader()
    })
        .then(res => {
            callback(true, res.data.data);
        })
        .catch(err => {
            checkResponse(err);
            callback(false, err.response);
            // if(err.response){
            //     callback(false, err.response.data.message || "AN Error Occurred");
            // }
        })
};


export const getWithdrawalPenalty = (callback) => {
        _axios.get(`${GetWithdrawalPenalty}`,{
            headers: _getHeader()
        })
        .then(res => {
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            try{
                checkResponse(err);
                callback(false, err.response);
            }catch (e) {
                //log both e and err
                callback(false, " An Error Occurred");
            }
        })
};


export const createWithdrawalSettings = (payload, callback) => {
    _axios.post(`${CreateWithdrawalSettings}`, payload,{
        headers: _getHeader()
    })
        .then(res => {
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            try{
                checkResponse(err);
                callback(false, err.response);
            }catch (e) {
                //log both e and err
                callback(false, " An Error Occurred");
            }
        })
};

export const getWithdrawalSettings = (callback) => {
    _axios.get(`${GetWithdrawalSettings}`,{
        headers: _getHeader()
    })
        .then(res => {
            callback(res.data.status == "success", res.data);
        })
        .catch(err => {
            try{
                checkResponse(err);
                callback(false, err.response);
            }catch (e) {
                //log both e and err
                callback(false, " An Error Occurred");
            }
        })
};
export const getWithdrawalPin = (callback) => {
    _axios.get(`${getUserWithdrawalPin}`,{
        headers: _getHeader()
    })
        .then(res => {
            callback(res.data.status == "success", res.data);
        })
        .catch(err => {
            try{
                checkResponse(err);
                callback(false, err.response);
            }catch (e) {
                //log both e and err
                callback(false, " An Error Occurred");
            }
        })
};

export const makeWithdrawal = (payload, callback) => {
    _axios.post(`${MakeWithdrawal}`, payload,{
        headers: _getHeader()
    })
        .then(res => {
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            try{
                checkResponse(err);
                callback(false, err.response.data.message);
            }catch (e) {
                //log both e and err
                callback(false, " An Error Occurred");
            }
        })
};

export const addWithdrawalPin = (payload, callback) => {
    _axios.post(`${storeWithdrawalPin}`, payload,{
        headers: _getHeader()
    })
        .then(res => {
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            try{
                checkResponse(err);
                callback(false, err.response.data.message);
            }catch (e) {
                //log both e and err
                callback(false, " An Error Occurred");
            }
        })
};


export const changePin = (payload, callback) => {
    _axios.post(`${changeWithdrawalPin}`, payload,{
        headers: _getHeader()
    })
        .then(res => {
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            try{
                checkResponse(err);
                callback(false, err.response.data.message);
            }catch (e) {
                //log both e and err
                callback(false, " An Error Occurred");
            }
        })
};
