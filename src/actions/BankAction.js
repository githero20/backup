import {_axios, _getHeader} from "../utils";
import {BASE_URL, GetUserBanks, ResendBankOTP, SaveBankAccount, VerifyBankOTP} from "../RouteLinks/RouteLinks";

// sk_test_a8b0897d183d6393821b6cad177f7a9cf0d28cf3

export const getListOfBanks = (callback) =>{
    _axios.get(`https://api.paystack.co/bank`)
        .then(res => {
            callback(res.data.status, res.data.data);
        })
        .catch(err => {
            callback(false, err.response);
        })
};

export const resolveBankName = (accountNumber, bankCode,callback) =>{
    _axios.get(`https://api.paystack.co/bank/resolve`,{
        headers: {
            "Authorization" : `Bearer sk_test_a8b0897d183d6393821b6cad177f7a9cf0d28cf3`
        },
        params:{
            account_number: accountNumber,
            bank_code: bankCode
        }
    })
        .then(res => {
            callback(res.data.status, res.data.data);
        })
        .catch(err => {
            callback(false, err.response);
        })
};

export const sendBankOTP = (payload, callback) =>{

    _axios.post(`${BASE_URL}/${SaveBankAccount}`,payload,{
        headers: _getHeader()
    })
        .then(res => {

            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            callback(false, err.response);
        })
};

export const resendBankOTP = (payload, callback) =>{
    _axios.post(`${BASE_URL}/${ResendBankOTP}`,payload,{
        headers: _getHeader()
    })
        .then(res => {
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            callback(false, err.response);
        })
};


export const verifyOtp = (payload, callback) =>{
    _axios.post(VerifyBankOTP,payload,{
        headers: _getHeader()
    })
        .then(res => {
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            callback(false, err.response);
        })
};

export const getUserBanks = (callback) => {
    _axios.get(GetUserBanks,{
        headers: _getHeader()
    })
        .then(res => {
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            callback(false, err.response);
        })
};