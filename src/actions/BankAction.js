import {_axios} from "../utils";
import {BASE_URL, GetUserBanks, SaveBankAccount, VerifyBankOTP} from "../RouteLinks/RouteLinks";


export const getListOfBanks = (callback) =>{
    _axios.get(`https://api.paystack.co/bank`)
        .then(res => {
            console.log(res);
            console.log(res.data.data);
            callback(res.data.status, res.data.data);
        })
        .catch(err => {
            callback(false, err.response.data.message);
        })
};

export const saveBankAccount = (payload, callback) =>{
    console.log("body", payload);
    _axios.post(`${BASE_URL}/${SaveBankAccount}`,payload)
        .then(res => {
            console.log("Res",res);
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            console.log("Err",err);
            callback(false, err.response.data.message);
        })
};


export const verifyOtp = (payload, callback) =>{
    console.log("body", payload);
    _axios.post(VerifyBankOTP,payload)
        .then(res => {
            console.log("Res",res);
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            console.log("Err",err);
            callback(false, err.response.data.message);
        })
};

export const getUserBanks = (callback) => {
    _axios.get(GetUserBanks)
        .then(res => {
            console.log("Res",res);
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            // console.log("Err",err);
            callback(false, err.response.data.message);
        })
};