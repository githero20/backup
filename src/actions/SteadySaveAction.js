import {_axios, _getHeader} from "../utils";
import {
    BASE_URL,
    ContinueSteadySave,
    convertSteadySave,
    CreateLockedSavings,
    EditSteadySave,
    GetLockedSavings,
    getSteadySaveHistory,
    getSteadySaveTrans,
    InitiateSSDuePayEndpoint,
    NewSteadySaveEndpoint,
    PauseSteadySave,
    PayDueSSEndpoint,
    StopSteadySave,
    VerifySSDuePayEndpoint
} from "../RouteLinks/RouteLinks";


export const updateSteadySave = (id, payload, callback) => {
    if (!id) {
        callback(false, "Invalid Steady Save Identifier");
        return;
    }
    _axios.post(`${EditSteadySave}/${id}`, payload, {
        headers: _getHeader()
    })
        .then(res => {
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            callback(false, err.response);
        })
};

export const createSteadySave = (payload, callback) => {

    _axios.post(`${NewSteadySaveEndpoint}`, payload, {
        headers: _getHeader()
    })
        .then(res => {
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            callback(false, err.response);
        })
};

export const paySteadySaveDue = (payload, callback) => {

    _axios.post(`${PayDueSSEndpoint}`, payload, {
        headers: _getHeader()
    })
        .then(res => {
            callback(true, res.data.data);
        })
        .catch(err => {
            callback(false, err.response);
        })
};


export const continueSteadySave = (id, callback) => {
    if (!id) {
        callback(false, "Invalid Steady Save Identifier");
        return;
    }
    _axios.get(`${ContinueSteadySave}/${id}`, {
        headers: _getHeader()
    })
        .then(res => {
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            callback(false, err.response);
        })
};

export const getSteadySavHistory = (id, callback) => {
    if (!id) {
        callback(false, "Invalid Steady Save Identifier");
        return;
    }
    _axios.get(`${getSteadySaveHistory}/${id}`, {
        headers: _getHeader()
    })
        .then(res => {
            callback(true, res.data.data);
        })
        .catch(err => {
            callback(false, err.response);
        })
};

export const convertUserSteadySave = (id, callback) => {
    if (!id) {
        callback(false, "Invalid Steady Save Identifier");
        return;
    }
    _axios.get(`${convertSteadySave}/${id}`, {
        headers: _getHeader()
    })
        .then(res => {

            callback(true, res.data.data);
        })
        .catch(err => {
            callback(false, err.response);
        })
};

export const initSSDuePay = (payload, callback) => {
    _axios.post(InitiateSSDuePayEndpoint, payload, {
        headers: _getHeader()
    })
        .then(res => {
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            callback(false, err.response);
        })
};

export const verifyPayDue = (payload, callback) => {
    _axios.post(VerifySSDuePayEndpoint, payload, {
        headers: _getHeader()
    })
        .then(res => {
            callback(true, res.data.data);
        })
        .catch(err => {
            callback(false, err.response);
        })
};

export const getSteadySavTrans = (id, callback) => {
    if (!id) {
        callback(false, "Invalid Steady Save Identifier");
        return;
    }
    _axios.get(`${getSteadySaveTrans}/${id}`, {
        headers: _getHeader()
    })
        .then(res => {
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            callback(false, err.response);
        })
};

export const pauseSteadySave = (id, callback) => {
    if (!id) {
        callback(false, "Invalid Steady Save Identifier");
        return;
    }
    _axios.get(`${PauseSteadySave}/${id}`, {
        headers: _getHeader()
    })
        .then(res => {
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            callback(false, err.response);
        })
};

export const stopSteadySave = (id, callback) => {
    if (!id) {
        callback(false, "Invalid Steady Save Identifier");
        return;
    }
    _axios.get(`${StopSteadySave}/${id}`, {
        headers: _getHeader()
    })
        .then(res => {
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            callback(false, err.response);
        })
};


export const createLockedSavings = (payload, callback) => {
    _axios.post(`${BASE_URL}/${CreateLockedSavings}`, payload, {
        headers: _getHeader()
    })
        .then(res => {
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            callback(false, err.response);
        })
};


export const getLockedSavings = (callback) => {

    _axios.get(`${BASE_URL}${GetLockedSavings}`, {
        headers: _getHeader()
    })
        .then(res => {
            callback(res.data.status == "success", res.data.data);
        })
        .catch(err => {
            callback(false, err.response.data.message);
        })
};