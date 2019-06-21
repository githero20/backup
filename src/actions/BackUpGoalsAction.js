import {_axios} from "../utils";
import {
    BASE_URL, continueBackupGoal,
    createBackupGoals, editBackupGoal,
    GetBackUpGoals,
    getBGoalHistory, getBGoalTrans,
    getSteadySaveHistory, GetWithdrawalPenalty, pauseBackupGoal, stopBackupGoal
} from "../RouteLinks/RouteLinks";
import {checkResponse} from "../ApiUtils/ApiUtils";


export const getBackUpSavings = (callback) =>{
    // console.log("body", payload);
    _axios.get(`${GetBackUpGoals}`)
        .then(res => {
            console.log(res);
            console.log(res.data.data);
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
    // console.log("body", payload);
    _axios.get(`${GetWithdrawalPenalty}`)
        .then(res => {
            console.log(res);
            console.log(res.data.data);
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


export const getBackUpGoalAndHistory = (id, callback) =>{
    if(!id){
        callback(false,"Invalid Steady Save Identifier");
        return;
    }
    _axios.get(`${getBGoalHistory}/${id}`)
        .then(res => {
            console.log(res);
            console.log(res.data.data);
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            console.log("Err", JSON.stringify(err));
            try{
                console.log("Err", JSON.stringify(err));
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
    _axios.get(`${getBGoalTrans}/${id}`)
        .then(res => {
            console.log(res);
            console.log(res.data.data);
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            console.log("Err", JSON.stringify(err));
            try{
                console.log("Err", JSON.stringify(err));
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
    _axios.get(`${pauseBackupGoal}/${id}`)
        .then(res => {
            console.log(res);
            console.log(res.data.data);
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            console.log("Err", JSON.stringify(err));
            try{
                console.log("Err", JSON.stringify(err));
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
    _axios.get(`${continueBackupGoal}/${id}`)
        .then(res => {
            console.log(res);
            console.log(res.data.data);
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            console.log("Err", JSON.stringify(err));
            try{
                console.log("Err", JSON.stringify(err));
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
    _axios.post(`${editBackupGoal}/${id}`, params)
        .then(res => {
            console.log(res);
            console.log(res.data.data);
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            console.log("Err", JSON.stringify(err));
            try{
                console.log("Err", JSON.stringify(err));
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
    _axios.get(`${stopBackupGoal}/${id}`)
        .then(res => {
            console.log(res);
            console.log(res.data.data);
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            console.log("Err", JSON.stringify(err));
            try{
                console.log("Err", JSON.stringify(err));
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
    // console.log("body", payload);
    _axios.post(`${createBackupGoals}`, params)
        .then(res => {
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            console.log("Err",JSON.stringify(err));
            // callback(false, err.response.data.message || "AN Error Occurred");
            checkResponse(err);
            callback(false, err.response);
        })
};
