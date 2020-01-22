import {_axios, _getHeader} from "../utils";
import {
    changeWithdrawalPin,
    CreateWithdrawalSettings,
    getUserWithdrawalPin,
    GetWithdrawal,
    GetWithdrawalPenalty,
    GetWithdrawalSettings,
    MakeWithdrawal,
    storeWithdrawalPin,
} from "../RouteLinks/RouteLinks";


export const getWithdrawalList = (callback) => {
    _axios.get(GetWithdrawal, {
        headers: _getHeader()
    })
        .then(res => {
            callback(true, res.data.data);
        })
        .catch(err => {
            callback(false, err.response);
        })
};

export const getWithdrawalPenalty = (callback) => {
    _axios.get(`${GetWithdrawalPenalty}`, {
        headers: _getHeader()
    })
        .then(res => {
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            callback(false, err.response);
        })
};


export const createWithdrawalSettings = (payload, callback) => {
    _axios.post(`${CreateWithdrawalSettings}`, payload, {
        headers: _getHeader()
    })
        .then(res => {
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            callback(false, err.response);
        })
};

export const getWithdrawalSettings = (callback) => {
    _axios.get(`${GetWithdrawalSettings}`, {
        headers: _getHeader()
    })
        .then(res => {
            callback(res.data.status == "success", res.data);
        })
        .catch(err => {
            callback(false, err.response);
        })
};
export const getWithdrawalPin = (callback) => {
    _axios.get(`${getUserWithdrawalPin}`, {
        headers: _getHeader()
    })
        .then(res => {
            callback(res.data.status == "success", res.data);
        })
        .catch(err => {
            callback(false, err.response);
        })
};

export const makeWithdrawal = (payload, callback) => {
    _axios.post(`${MakeWithdrawal}`, payload, {
        headers: _getHeader()
    })
        .then(res => {
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            callback(false, err.response.data.message);
        })
};

export const addWithdrawalPin = (payload, callback) => {
    _axios.post(`${storeWithdrawalPin}`, payload, {
        headers: _getHeader()
    })
        .then(res => {
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            callback(false, err.response.data.message);
        })
};

export const changePin = (payload, callback) => {
    _axios.post(`${changeWithdrawalPin}`, payload, {
        headers: _getHeader()
    })
        .then(res => {
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            callback(false, err.response.data.message);
        })
};
