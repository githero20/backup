import React, {useEffect, useState} from "react";
import {BASE_URL, LoginEndpoint} from "../../../RouteLinks/RouteLinks";
import {api, setLocalStorage} from "../../../ApiUtils/ApiUtils";
import swal from "sweetalert";
import moment from "moment";
import {CUSTOMER} from "../../../Helpers/Helper";
import {_axios} from "../../../utils";

export const USERTOKEN = "token";
export const SESSION_INTERVAL = 'time-stamp';
export const USERINFO = "user";
export const USERWITHDRAWAL = "user-withdrawal";
export const MINIMUM_WITHDRAWAL = 500;
export const MIN_INSTANT_SAVE = 500;
export const AMOUNT_LIMITS = {
    minSteadySaveDaily: 500,
    maxSteadySaveDaily: 50000,
    minSteadySaveWeekly: 500,
    maxSteadySaveWeekly: 200000,
    minSteadySaveMonthly: 500,
    maxSteadySaveMonthly: 2000000,
    minBackUpGoalDaily: 500,
    maxBackUpGoalDaily: 50000,
    minBackUpGoalWeekly: 500,
    maxBackUpGoalWeekly: 200000,
    minBackUpGoalMonthly: 500,
    maxBackUpGoalMonthly: 2000000,
};
export const APP_FREQUENCY = {
    daily: 'daily',
    weekly: 'weekly',
    monthly: 'monthly'
};
export const ADD_BANK = 0;
export const DASHBOARDINFO = "dashboard-info";
export const USERACTIVATED = "activated";
export const ACTIVATIONMESG = "activation-msg";
export const ACTIVATONEMAIL = "activation-email";
export const SHOWAD = "show-ad";

const doLogin = (data, callback) => {
    const password = document.getElementById('password').value;
    Login(LoginEndpoint, {email: data.email, password: password}, callback)

};


export function setAuthorisationToken(token, callback) {
    //setup interceptors for 401 errors
    _axios.interceptors.response.use(function (response) {
        // Do something with response data
        console.log('no err');
        callback(true, response);
        return response;
    }, function (error) {
        //check the response status
        if (error.response && error.response.status === 401) {
            callback(false, error);
        }
        // Do something with response error
        return Promise.reject(error);
    });
    if (token) {
        //setting authorization header
        _axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete _axios.defaults.headers.common['Authorization'];
    }
}

const Login = (url, param, login) => {
    api(url, param, false, true, login);
};

const AuthController = component => {
    const Authenticate = props => {
        const [reload, setReload] = useState(false);
        const [isLoggedIn, setIsLoggedIn] = useState(false);
        const RenderComponent = props.component;
        const token = JSON.parse(localStorage.getItem(USERTOKEN));
        const swalLoginConfig = {
            text: 'Enter your password to continue',
            title: 'Your Session has expired!',
            icon: 'info',
            content: {
                element: "input",
                attributes: {
                    placeholder: "Type your password",
                    type: "password",
                    name: "password",
                    id: "password",
                },
            },
            buttons: {
                cancel: "Log Out",
                yes: "continue"
            }
        };

        const handleUserAuth = () => {
            swal(swalLoginConfig).then((value) => {
                if (value) {
                    let data = JSON.parse(localStorage.getItem(USERINFO));
                    doLogin(data, onLogin);
                } else {
                    setIsLoggedIn(false);
                    window.location.href = `/login`;
                    localStorage.removeItem(USERTOKEN);
                    localStorage.removeItem(USERINFO);
                }
            });
        };

        useEffect(() => {
            if (!token) {
                window.location.href = `/login`;
                localStorage.removeItem(USERTOKEN);
                localStorage.removeItem(USERINFO);
            } else {
                setAuthorisationToken(token, (status, data) => {
                    if (status) {
                        setIsLoggedIn(true);
                    } else {
                        setIsLoggedIn(false);
                        console.log('came to the other side ');
                        if (data && data.response && data.response.data && data.response.data.message === "Account has not been activated, click on resend") {
                            setLocalStorage(USERACTIVATED, false);
                        } else handleUserAuth();
                    }

                });
            }
        }, [RenderComponent]);


        const onLogin = (state, response) => {
            if (state && response && response.data) {
                //set session time
                const timeStamp = moment().format('MM-DD-YYYY HH:mm:ss');
                // handle admin login
                if (response.data.role == CUSTOMER) {
                    localStorage.setItem(USERTOKEN, JSON.stringify(response.data.token));
                    localStorage.setItem(SESSION_INTERVAL, JSON.stringify(timeStamp));
                    localStorage.setItem(USERINFO, JSON.stringify(response.data.user));
                    setIsLoggedIn(true);
                }
                swal('Awesome!!', 'You have successfully logged in', 'success', {
                    button: false,
                    timer: 2000
                });
                setReload(true);
            } else {
                if (response && response.status == 401 && response.data.message == "invalid_credentials") {
                    swal('Oops!!', `Invalid Credentials`, 'warning');
                } else if (response && response.status == 401 && response.data.message == 'Incorrect email or password,Try again') {
                    swal('Oops!!', 'Incorrect Email or Password', 'warning', {
                        button: false,
                        timer: 2000
                    });
                } else {
                    swal('Oops!!', `Unable to login at the moment.Try Again`, 'warning', {
                        button: false,
                        timer: 2000
                    });
                }

            }
        };

        return <RenderComponent {...props} reload={reload} isLoggedIn={isLoggedIn}/>;
    };

    Authenticate.defaultProps = {
        component
    };

    return Authenticate
};

export default AuthController;