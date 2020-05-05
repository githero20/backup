import {_axios, _getHeader} from "../utils";
import {
    BASE_URL,
    getFirstTimeUserEndpoint,
    getUserInfoEndpoint,
    getUserPointsEndpoint,
    getUserRoleEndpoint, postDirectInstantSaveEndpoint,
    postDirectSteadySaveEndpoint,
    storeFirstTimeLoginEndpoint,
    updateEmailEndpoint,
    updateUserProfileEndpoint
} from "../RouteLinks/RouteLinks";
import axios from "axios";

export const getUserData = callback => {
    _axios.get(getUserInfoEndpoint, {
        headers: _getHeader()
    })
        .then(res => {
            if (callback) {
                callback(true, res.data.data);
            }
        })
        .catch(err => {
            callback(false, err.response);
        })
};

export const postDirectSteadySave = (param, callback) => {
    _axios.post(postDirectSteadySaveEndpoint, param, {
        headers: _getHeader()
    })
        .then(res => {
            if (callback) {
                callback(true, res.data.data);
            }
        })
        .catch(err => {
            callback(false, err.response);
        })
};

export const postDirectInstantSave = (param, callback) => {
    _axios.post(postDirectInstantSaveEndpoint, param, {
        headers: _getHeader()
    })
        .then(res => {
            if (callback) {
                callback(true, res.data.data);
            }
        })
        .catch(err => {
            callback(false, err.response);
        })
};


export const getFirstTimeUser = callback => {
    _axios.get(getFirstTimeUserEndpoint, {
        headers: _getHeader()
    })
        .then(res => {
            if (callback) {
                callback(true, res.data.data);
            }
        })
        .catch(err => {
            callback(false, err.response);
        })
};
export const isKycUpdated = callback => {
    _axios.get(getFirstTimeUserEndpoint, {
        headers: _getHeader()
    })
        .then(res => {
            if (callback) {
                callback(true, res.data.data);
            }
        })
        .catch(err => {
            callback(false, err.response);
        })
};


export const storeFirstTimeLogin = callback => {
    _axios.get(storeFirstTimeLoginEndpoint, {
        headers: _getHeader()
    })
        .then(res => {
            if (callback) {
                callback(true, res.data.data);
            }
        })
        .catch(err => {
            callback(false, err.response);
        })
};

export const getUserPoints = callback => {
    _axios.get(getUserPointsEndpoint, {
        headers: _getHeader()
    }).then(res => {
        if (callback) {
            callback(true, res.data);
        }
    })
        .catch(err => {
            callback(false, err.response);
        })
};

export function getUserRole(token = null, callback) {


    let url = `${BASE_URL}${getUserRoleEndpoint}`;

    let header = {
        headers: {
            "Content-Type": "Application/json",
            "credentials": 'same-origin',
        }
    };

    if (token !== null) {
        header.headers['Authorization'] = 'Bearer ' + token;
    }

    axios.get(url, header).then(res => callback(true, res))
        .catch(err => callback(false, err.response))
}

export const updateUserProfile = (payload, callback) => {
    _axios.post(updateUserProfileEndpoint, payload, {
        headers: _getHeader()
    })
        .then(res => {
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            callback(false, err.response);
        })
};

export const updateEmailProfile = (payload, callback) => {
    _axios.post(updateEmailEndpoint, payload, {
        headers: _getHeader()
    })
        .then(res => {
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            callback(false, err.response);
        })
};
