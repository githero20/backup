import {_axios} from "../utils";
import {BASE_URL, createBackupGoals, GetBackUpGoals} from "../RouteLinks/RouteLinks";
import {checkResponse} from "../ApiUtils/ApiUtils";


export const getBackUpSavings = (callback) =>{
    // console.log("body", payload);
    _axios.get(`${BASE_URL}/${GetBackUpGoals}`)
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
