import {_axios, _getHeader} from "../utils";
import {
    BASE_URL,
    continueBackupGoal,
    createBackupGoals,
    editBackupGoal,
    GetBackUpGoals,
    getBGoalHistory,
    getBGoalTrans,
    getSteadySaveHistory,
    GetWithdrawalPenalty, InitiateBGDuePayEndpoint,
    InitiateSSDuePayEndpoint,
    pauseBackupGoal, PayDueBGEndpoint, PayDueSSEndpoint,
    stopBackupGoal, VerifyBGDuePayEndpoint,
    VerifySSDuePayEndpoint
} from "../RouteLinks/RouteLinks";
import {checkResponse} from "../ApiUtils/ApiUtils";


export const getBackUpSavings = (callback) =>{

    _axios.get(`${GetBackUpGoals}`,{
        headers: _getHeader()
    })
        .then(res => {
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            // checkResponse(err);
            // if(err.response){
            //     callback(false, err.response.data.message || "AN Error Occurred");
            // }
            checkResponse(err);
            callback(false, err.response);
        })
};

export const getPenalty = (callback) =>{
    _axios.get(`${GetWithdrawalPenalty}`,{
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
export const payBGDue = (payload, callback) =>{

    _axios.post(`${PayDueBGEndpoint}`,payload,{
        headers: _getHeader()
    })
        .then(res => {
            callback(true, res.data.data);
        })
        .catch(err => {
            // if(err.response){
            //     callback(false, err.response.data.message || "AN Error Occurred");
            // }
            checkResponse(err);
            callback(false, err.response);
        })
};



export const initBGDuePay = (payload, callback) =>{
    _axios.post(InitiateBGDuePayEndpoint,payload,{
        headers: _getHeader()
    })
        .then(res => {
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            // if(err.response){
            //     callback(false, err.response.data.message|| err.response.data.data);
            // }
            checkResponse(err);
            callback(false, err.response);
        })
};

export const verifyBGPayDue = (payload, callback) =>{
    _axios.post(VerifyBGDuePayEndpoint,payload,{
        headers: _getHeader()
    })
        .then(res => {
            callback(true, res.data.data);
        })
        .catch(err => {
            // if(err.response){
            //     callback(false, err.response.data.message|| err.response.data.data);
            // }
            checkResponse(err);
            callback(false, err.response);
        })
};

export const getBackUpGoalAndHistory = (id, callback) =>{
    if(!id){
        callback(false,"Invalid Steady Save Identifier");
        return;
    }
    _axios.get(`${getBGoalHistory}/${id}`,{
        headers: _getHeader()
    })
        .then(res => {
            callback(true, res.data.data);
        })
        .catch(err => {
            try{
                // if(err.response){
                //     callback(false, err.response.data.message || "AN Error Occurred");
                // }
                checkResponse(err);
                callback(false, err.response);
            }catch (e) {
                //log both e and err
                callback(false, " An Error Occurred");
            }
        })
};


export const getBackUpGoalAndTrans = (id, callback) =>{
    if(!id){
        callback(false,"Invalid Steady Save Identifier");
        return;
    }
    _axios.get(`${getBGoalTrans}/${id}`,{
        headers: _getHeader()
    })
        .then(res => {
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            try{

                // if(err.response){
                //     callback(false, err.response.data.message || "AN Error Occurred");
                // }
                // checkResponse(err);
                callback(false, err.response);
            }catch (e) {
                //log both e and err
                callback(false, " An Error Occurred");
            }
        })
};

export const pauseBGoal = (id, callback) =>{
    if(!id){
        callback(false,"Invalid Steady Save Identifier");
        return;
    }
    _axios.get(`${pauseBackupGoal}/${id}`,{
        headers: _getHeader()
    })
        .then(res => {
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {

            try{

                // if(err.response){
                //     callback(false, err.response.data.message || "AN Error Occurred");
                // }
                checkResponse(err);
                callback(false, err.response);
            }catch (e) {
                //log both e and err
                callback(false, " An Error Occurred");
            }
        })
};


export const continueBGoal = (id, callback) =>{
    if(!id){
        callback(false,"Invalid Steady Save Identifier");
        return;
    }
    _axios.get(`${continueBackupGoal}/${id}`,{
        headers: _getHeader()
    })
        .then(res => {
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {

            try{

                // if(err.response){
                //     callback(false, err.response.data.message || "AN Error Occurred");
                // }
                checkResponse(err);
                callback(false, err.response);
            }catch (e) {
                //log both e and err
                callback(false, " An Error Occurred");
            }
        })
};

export const editBGoal = (id,params, callback) =>{
    if(!id){
        callback(false,"Invalid Steady Save Identifier");
        return;
    }
    _axios.post(`${editBackupGoal}/${id}`, params,{
        headers: _getHeader()
    })
        .then(res => {
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {

            try{

                // if(err.response){
                //     callback(false, err.response.data.message || "AN Error Occurred");
                // }
                checkResponse(err);
                callback(false, err.response);
            }catch (e) {
                //log both e and err
                callback(false, " An Error Occurred");
            }
        })
};

export const stopBGoal = (id, callback) =>{
    if(!id){
        callback(false,"Invalid Steady Save Identifier");
        return;
    }
    _axios.get(`${stopBackupGoal}/${id}`,{
        headers: _getHeader()
    })
        .then(res => {

            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {

            try{

                // if(err.response){
                //     callback(false, err.response.data.message || "AN Error Occurred");
                // }
                checkResponse(err);
                callback(false, err.response);
            }catch (e) {
                //log both e and err
                callback(false, " An Error Occurred");
            }
        })
};



export const createBackUpGoal = (params, callback) =>{
    _axios.post(`${createBackupGoals}`, params,{
        headers: _getHeader()
    })
        .then(res => {
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            // callback(false, err.response.data.message || "AN Error Occurred");
            checkResponse(err);
            callback(false, err.response);
        })
};
