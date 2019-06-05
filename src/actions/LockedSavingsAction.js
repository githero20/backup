import {_axios} from "../utils";
import {BASE_URL, CreateLockedSavings, GetLockedSavings, GetLockedSavingsInterest} from "../RouteLinks/RouteLinks";


export const getLockedInterestSavings = (payload, callback) =>{
    console.log("body", payload);
    _axios.post(`${BASE_URL}/${GetLockedSavingsInterest}`,payload)
        .then(res => {
            console.log(res);
            console.log(res.data.data);
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            callback(false,err);
        })
};

export const createLockedSavings = (payload, callback) =>{
    console.log("body", payload);
    _axios.post(`${BASE_URL}/${CreateLockedSavings}`,payload)
        .then(res => {
            console.log("Res",res);
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            console.log("Err",err);
            callback(false, err);
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
    _axios.get(`${BASE_URL}${GetLockedSavings}`)
        .then(res => {
            console.log("Res",res);
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            console.log("Err",err);
            callback(false, err);
        })
};