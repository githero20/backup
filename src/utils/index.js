import React from "react";
import axios from 'axios';
import {local} from './storage';
import moment from "moment";
import {BASE_URL, verifyTransactionEndpoint} from "../RouteLinks/RouteLinks";
import {USERTOKEN} from "../Components/Auth/HOC/authcontroller";
import {getLocalStorage} from "../ApiUtils/ApiUtils";
import {getToken} from "../Helpers/Helper";

export const GOOGLE_PLACE_API_KEY = "AIzaSyBMe9I7kVgdErGjrHStl34d3RLk5rfi0gw";

export const PAYSTACK_PUBLIC_KEY = process.env.REACT_APP_PAYSTACK_KEY;

export const _setState = (prop, val, el = this) => el.setState({[prop]: val});

export const _handleFormChange = (name, event, el = this, callback = null) => {
    let form = {...el.state.form};
    form[name] = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    el.setState({form});
    if(callback != null){
        callback();
    }
    return form;
};

export const _handleInputEnter = (event) => {
    if (event.keyCode === 13) {
        const form = event.target.form;
        const index = Array.prototype.indexOf.call(form, event.target);
        form.elements[index + 1].focus();
        event.preventDefault();
    }
};

export const _validateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

export const _validateNumber = num => {
    const re = /^\+?\d+$/g;
    return re.test(num);
};

export const _isAnEmpytyObject = (obj) => {
    for (let key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
};

export const _getToken = () => {
    return local.get('token');
};

export const _setUser = (user) =>{
    return local.setObject("user",user);
};

export const _getUser = () => {
    return local.getObject('user');
};

// const baseUrl = `http://localhost:8000/api/v1`;
// const baseUrl = "https://phoenix-foodvendor.herokuapp.com/api/v1";

//
// export const _axios = axios.create({
//     baseURL: BASE_URL,
//     headers: {
//         Authorization: `Bearer ${(localStorage.getItem(USERTOKEN)!=null) ? (localStorage.getItem(USERTOKEN).replace(/"/g,'')): ''}`
//         // Authorization: "Bearer " + _getToken()
//     }
// });

export const _axios = axios.create({
    baseURL: BASE_URL,
    // headers: {
    //     Authorization: `Bearer ${(getLocalStorage(USERTOKEN) ? getLocalStorage(USERTOKEN): '')}`
    //
    //     // Authorization: "Bearer " + _getToken()
    // }
});

export const _getHeader = () => {
    return {
        Authorization: `Bearer ${(localStorage.getItem(USERTOKEN)? getLocalStorage(USERTOKEN): '')}`
    }

};

export const Loading = ({isSpinning}) => {
    return (
        isSpinning ? <div className="loader">
            <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                 width="40px" height="40px" viewBox="0 0 40 40" style={{enableBackground: "new 0 0 40 40"}}>
                <path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
                <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z">
                    <animateTransform attributeType="xml"
                                      attributeName="transform"
                                      type="rotate"
                                      from="0 20 20"
                                      to="360 20 20"
                                      dur="0.5s"
                                      repeatCount="indefinite"/>
                </path>
            </svg>
        </div> : ""
    )
};

export const _limitText = (string, length = 25) => {
    const stringLength = string.length;
    if (stringLength < length) {
        return string;
    } else {
        return string.substring(0, length) + "...";
    }
};


export const _calculateDateDifference = (from = null, to = null, type = "days") => {
    // if (!from)
    //     from = moment().utc();
    // else
    //     from = moment(from)
    // if (!to)
    //     to = moment().utc();

    //dddd, MMMM Do YYYY
    if(to == null)
        to = moment().utc();
    else
        to = moment(to, "YYYY-MM-DD").endOf("day");

    if(from == null)
        from = moment().utc();
    else
        from = moment(from,"YYYY-MM-DD").startOf("day");
    return Math.ceil(to.diff(from,type,true));
};


export const _transformDate = (date, toFormat = "LL", fromFormat = "YYYY-MM-DD") => {
    return moment(date,fromFormat).format(toFormat);
};

export const _isDateAfterToday = (date) => {
    return moment().isAfter(moment(date));
};


export const _payWithPaystack = (ref, amount, callback) => {
    const user = _getUser();
    const handler = window.PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        // key: 'pk_test_a59d1204944c01bf05330ab59fb1abe607eb36a6',
        email: user.email ? user.email:`${user.phone}@backupcash.ng`,
        amount: parseFloat(amount) * 100,
        currency: "NGN",
        ref: ref,
        channels:['card'],
        metadata: {
            custom_fields: [
                {
                    display_name: user.name,
                    variable_name: "mobile_number",
                    value: user.phone || "+2348012345678"
                }
            ]
        },

        callback: (response) => {
            callback(response);
        },

        onClose: function(){
            window.location.reload();
        }
    });
    handler.openIframe();

};