import {_axios} from "../utils";
import {BASE_URL, createBackupGoals, GetBackUpGoals} from "../RouteLinks/RouteLinks";


export const getBackUpSavings = (callback) =>{
    // console.log("body", payload);
    _axios.get(`${BASE_URL}/${GetBackUpGoals}`)
        .then(res => {
            console.log(res);
            console.log(res.data.data);
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            callback(false,err);
        })
};



export const createBackUpGoal = (params, callback) =>{
    // console.log("body", payload);
    _axios.post(`${createBackupGoals}`, params)
        .then(res => {
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            callback(false,err);
        })
};
