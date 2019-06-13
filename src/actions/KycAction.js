import {_axios} from "../utils";
import {GetUserKYC} from "../RouteLinks/RouteLinks";
import {checkResponse} from "../ApiUtils/ApiUtils";



export const getUserKyc = (callback) =>{
    _axios.get(GetUserKYC)
        .then(res => {
            callback(res.data.status == "success", res.data);
        })
        .catch(err => {
            console.log("Err", JSON.stringify(err));
            // callback(false, err || "An Error Occurred");
            checkResponse(err);
            callback(false, err.response);
        })
};

export const storeUserKyc = (payload,callback) =>{
    _axios.post(GetUserKYC,payload)
        .then(res => {
            callback(res.data.status == "success", res.data);
        })
        .catch(err => {
            console.log("Err", JSON.stringify(err));
            // callback(false, err || "An Error Occurred");
            checkResponse(err);
            callback(false, err.response);
        })
};

