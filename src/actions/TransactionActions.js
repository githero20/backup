import {_axios, _getHeader} from "../utils";

export const getPaginatedTrans = (url, callback) => {

    _axios.get(`${url}`, {
        headers: _getHeader()
    })
        .then(res => {
            callback(true, res.data.data);
        })
        .catch(err => {
            callback(false, err.response);
        })
};

export const getFilteredTrans = (url, param, callback) => {

    _axios.post(`${url}`, param, {
        headers: _getHeader()
    })
        .then(res => {
            callback(true, res.data.data);
        })
        .catch(err => {
            callback(false, err.response);
        })
};
