import {_axios, _getHeader} from "../utils";
import {
    BASE_URL,
    ContinueSteadySave, convertSteadySave,
    CreateLockedSavings,
    EditSteadySave,
    GetLockedSavings,
    getSteadySaveHistory,
    getSteadySaveTrans,
    InitiateSSDuePayEndpoint,
    InitiateTransactionEndpoint,
    NewSteadySaveEndpoint,
    PauseSteadySave,
    PayDueSSEndpoint,
    StopSteadySave, VerifySSDuePayEndpoint, verifyTransactionEndpoint
} from "../RouteLinks/RouteLinks";
import {checkResponse} from "../ApiUtils/ApiUtils";


export const updateSteadySave = (id,payload, callback) =>{
    if(!id){
        callback(false,"Invalid Steady Save Identifier");
        return;
    }
    _axios.post(`${EditSteadySave}/${id}`,payload,{
        headers: _getHeader()
    })
        .then(res => {
            console.log(res);
            console.log(res.data.data);
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            console.log("Err", JSON.stringify(err));
            // if(err.response){
            //     callback(false, err.response.data.message || "AN Error Occurred");
            // }

            checkResponse(err);
            callback(false, err.response);
        })
};

export const createSteadySave = (payload, callback) =>{

    _axios.post(`${NewSteadySaveEndpoint}`,payload,{
        headers: _getHeader()
    })
        .then(res => {
            console.log(res);
            console.log(res.data.data);
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            console.log("Err", JSON.stringify(err));
            // if(err.response){
            //     callback(false, err.response.data.message || "AN Error Occurred");
            // }
            checkResponse(err);
            callback(false, err.response);
        })
};

export const paySteadySaveDue = (payload, callback) =>{

    _axios.post(`${PayDueSSEndpoint}`,payload,{
        headers: _getHeader()
    })
        .then(res => {
            callback(true, res.data.data);
        })
        .catch(err => {
            console.log("Err", JSON.stringify(err));
            // if(err.response){
            //     callback(false, err.response.data.message || "AN Error Occurred");
            // }
            checkResponse(err);
            callback(false, err.response);
        })
};


export const continueSteadySave = (id, callback) =>{
    if(!id){
        callback(false,"Invalid Steady Save Identifier");
        return;
    }
    _axios.get(`${ContinueSteadySave}/${id}`,{
        headers: _getHeader()
    })
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

export const getSteadySavHistory = (id, callback) =>{
    if(!id){
        callback(false,"Invalid Steady Save Identifier");
        return;
    }
    _axios.get(`${getSteadySaveHistory}/${id}`,{
        headers: _getHeader()
    })
        .then(res => {

            callback(true, res.data.data);
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

export const convertUserSteadySave = (id, callback) =>{
    if(!id){
        callback(false,"Invalid Steady Save Identifier");
        return;
    }
    _axios.get(`${convertSteadySave}/${id}`,{
        headers: _getHeader()
    })
        .then(res => {

            callback(true, res.data.data);
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

export const initSSDuePay = (payload, callback) =>{
    console.log("body", payload);
    _axios.post(InitiateSSDuePayEndpoint,payload,{
        headers: _getHeader()
    })
        .then(res => {
            console.log("Res",res);
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            console.log("Err",err);
            // if(err.response){
            //     callback(false, err.response.data.message|| err.response.data.data);
            // }
            checkResponse(err);
            callback(false, err.response);
        })
};

export const verifyPayDue = (payload, callback) =>{
    _axios.post(VerifySSDuePayEndpoint,payload,{
        headers: _getHeader()
    })
        .then(res => {
            console.log("Res",res);
            callback(true, res.data.data);
        })
        .catch(err => {
            console.log("Err",JSON.stringify(err));
            console.log("Err",err);
            // if(err.response){
            //     callback(false, err.response.data.message|| err.response.data.data);
            // }
            checkResponse(err);
            callback(false, err.response);
        })
};

export const getSteadySavTrans = (id, callback) =>{
    if(!id){
        callback(false,"Invalid Steady Save Identifier");
        return;
    }
    _axios.get(`${getSteadySaveTrans}/${id}`,{
        headers: _getHeader()
    })
        .then(res => {
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

export const pauseSteadySave = (id, callback) =>{
    if(!id){
        callback(false,"Invalid Steady Save Identifier");
        return;
    }
    _axios.get(`${PauseSteadySave}/${id}`,{
        headers: _getHeader()
    })
        .then(res => {
            console.log(res);
            console.log(res.data.data);
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            console.log("Err", JSON.stringify(err));
            try{
                console.log("Err", JSON.stringify(err));
                checkResponse(err);
                callback(false, err.response);
                // if(err.response){
                //     callback(false, err.response.data.message || "AN Error Occurred");
                // }
            }catch (e) {
                //log both e and err
                callback(false, " An Error Occurred");
            }
        })
};

export const stopSteadySave = (id, callback) =>{
    if(!id){
        callback(false,"Invalid Steady Save Identifier");
        return;
    }
    _axios.get(`${StopSteadySave}/${id}`,{
        headers: _getHeader()
    })
        .then(res => {
            console.log(res);
            console.log(res.data.data);
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            console.log("Err", JSON.stringify(err));
            try{
                console.log("Err", JSON.stringify(err));
                checkResponse(err);
                callback(false, err.response);
                // if(err.response){
                //     callback(false, err.response.data.message || "AN Error Occurred");
                // }
            }catch (e) {
                //log both e and err
                callback(false, " An Error Occurred");
            }
        })
};


export const createLockedSavings = (payload, callback) =>{
    console.log("body", payload);
    _axios.post(`${BASE_URL}/${CreateLockedSavings}`,payload,{
        headers: _getHeader()
    })
        .then(res => {
            console.log("Res",res);
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            // console.log("Err",err);
            // console.log("Err",err.data);
            // console.log("Err",JSON.stringify(err));
            // console.log("Err",err.response.data.message);
            checkResponse(err);
            callback(false, err.response);
        })
};


export const getLockedSavings = (callback) =>{
    // console.log("body");
    //
    // const data =  {
    //     "status": "success",
    //     "data": {
    //         "current_page": 1,
    //         "data": [
    //             {
    //                 "id": 1,
    //                 "user_id": "327e2de0-e820-11e8-842e-f7145c7559e1",
    //                 "amount": "10000",
    //                 "title": "Xmas hair",
    //                 "interest": "53.42",
    //                 "start_date": "2018-11-14",
    //                 "end_date": "2018-11-29",
    //                 "account_id": 2,
    //                 "created_at": "2018-11-14 15:39:04",
    //                 "updated_at": "2018-11-14 15:39:04"
    //             }
    //         ],
    //         "first_page_url": "http://localhost:8000/sfsbapi/v1/user/savings/locked?page=1",
    //         "from": 1,
    //         "last_page": 1,
    //         "last_page_url": "http://localhost:8000/sfsbapi/v1/user/savings/locked?page=1",
    //         "next_page_url": null,
    //         "path": "http://localhost:8000/sfsbapi/v1/user/savings/locked",
    //         "per_page": 10,
    //         "prev_page_url": null,
    //         "to": 1,
    //         "total": 1
    //     }
    // };
    //
    // callback(data.status == "success", data.data);
    // return;
    _axios.get(`${BASE_URL}${GetLockedSavings}`,{
        headers: _getHeader()
    })
        .then(res => {
            console.log("Res",res);
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            console.log("Err",err);
            callback(false, err.response.data.message);
        })
};