import {_axios, _getHeader} from "../utils";
import {BASE_URL, getBank, registerBank, SaveBankAccount} from "../RouteLinks/RouteLinks";
import {checkResponse} from "../ApiUtils/ApiUtils";
import axios from "axios";

// export const setupWithdrawal = (payload, callback) =>{
//     console.log("body", payload);
//     _axios.post(`${BASE_URL}/${registerBank}`,payload,{
//         headers: _getHeader()
//     })
//         .then(res => {
//             console.log("Res",res);
//             callback(res.data.status == "success", res.data.data);
//         })
//         .catch(err => {
//             // console.log("Err",JSON.stringify(err),err.response.data.data, err.response.data.message);
//             // if(err.response){
//             //     callback(false, err.response.data.message|| err.response.data.data);
//             // }
//             checkResponse(err);
//             callback(false, err.response);
//         })
// };


export function setupWithdrawal(payload, token, callback) {

    let header = {
        headers: {
            "Content-Type": "Application/json",
            "credentials": 'same-origin',
        }
    };

    if (token !== null) {
        header.headers['Authorization'] = 'Bearer ' + token;
    }

    return axios.post(`${BASE_URL}${registerBank}`,payload,header).then(res => callback(true, res.data.data))
        .catch(err => callback(false, err.response))
}
export function resolveBank(payload, token, callback) {

    let header = {
        headers: {
            "Content-Type": "Application/json",
            "credentials": 'same-origin',
        }
    };

    if (token !== null) {
        header.headers['Authorization'] = 'Bearer ' + token;
    }

    return axios.post(`${BASE_URL}${getBank}`,payload,header).then(res => callback(true, res.data.data))
        .catch(err => callback(false, err.response))
}