import React from 'react';
import axios from 'axios';
import {BASE_URL} from "../RouteLinks/RouteLinks";

export function api(url, params, token, method, callback) {

    url = `${BASE_URL}${url}`;

    let header = {
        headers: {
            "Content-Type": "Application/json",
            "credentials": 'same-origin',
        }
    };

    if (token) {
        let token = getLocalStorage('token');
        console.log(token);
        if (token !== null) {
            header.headers['Authorization'] = 'Bearer ' + token;
        }

    }
    if (method) {
        return axios.post(url, params, header).then(res => callback(true, res))
            .catch(err => callback(false, err.response))
    }

    return axios.get(url, header).then(res => callback(true, res)).catch(err => callback(false, err.response));


}

export function request(url, params, token, method, callback) {

    url = `${BASE_URL}${url}`;

    let header = {
        headers: {
            "Content-Type": "Application/json",
            "credentials": 'same-origin',

        }
    };

    if (token) {
        let token = getLocalStorage('token');
        console.log(token);
        if (token !== null) {
            header.headers['Authorization'] = 'Bearer ' + token;
        }

    }
    if (method === 'POST') {
        return axios.post(url, params, header).then(res => callback(true, res))
            .catch(err => callback(false, err.response))
    } else if (method === 'GET') {
        return axios.get(url, header).then(res => callback(true, res)).catch(err => callback(false, err.response));
    } else if (method === 'PATCH') {
        return axios.patch(url, header).then(res => callback(true, res)).catch(err => callback(false, err.response));
    }else if (method === 'PUT') {
        return axios.patch(url, header).then(res => callback(true, res)).catch(err => callback(false, err.response));
    }

    return axios.get(url, header).then(res => callback(true, res)).catch(err => callback(false, err.response));


}


export function ActivationRequest(url, token, callback) {


    url = `${BASE_URL}${url}`;

    let header = {
        headers: {
            "Content-Type": "Application/json",
            "credentials": 'same-origin',

        }
    };

    if (token) {
        let token = getLocalStorage('token');
        console.log(token);
        if (token !== null) {
            header.headers['Authorization'] = 'Bearer ' + token;
        }

    }

    return axios.get(url, header).then(res => callback(true, res))
        .catch(err => callback(false, err.response))
}


export function requestAPI(url, params, token, method, callback, errCallback) {

    url = `${BASE_URL}${url}`;

    let header = {
        headers: {
            "Content-Type": "Application/json",
            "credentials": 'same-origin',

        }
    };

    if (token) {
        let token = getLocalStorage('token');
        console.log(token);
        if (token !== null) {
            header.headers['Authorization'] = 'Bearer ' + token;
        }

    }
    if (method === 'POST') {
        return axios.post(url, params, header).then(res => callback(true, res))
            .catch(err => errCallback(false, err.response))
    }

    return axios.get(url, header).then(res => callback(true, res)).catch(err => errCallback(false, err.response));


}


export function apiGet(url, token, callback) {

    url = `${BASE_URL}${url}`;

    let header = {
        headers: {
            "Content-Type": "Application/json",
            "credentials": 'same-origin',

        }
    };

    if (token) {
        let userToken = getLocalStorage('token');
        console.log(userToken);
        if (userToken === null) {
            header.headers['Authorization'] = 'Bearer ' + userToken;
        }

    }

    return axios.get(url, header).then(
        res => callback(true, res.data.data)
    ).catch(
        err => callback(false, err.response)
    );


}


export function getLocalStorage(key) {
    return localStorage.getItem(key);

}

export function setLocalStorage(key, value) {
    localStorage.setItem(key, value);

}
