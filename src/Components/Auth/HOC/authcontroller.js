import React, {useEffect, useState} from "react";
import axios from 'axios'
import {BASE_URL, LoginEndpoint} from "../../../RouteLinks/RouteLinks";
import {api, setLocalStorage} from "../../../ApiUtils/ApiUtils";
import swal from "sweetalert";
import moment from "moment";
import {CUSTOMER} from "../../../Helpers/Helper";

export const USERTOKEN = "token";
export const SESSION_INTERVAL = 'time-stamp';
export const USERINFO = "user";
export const USERWITHDRAWAL = "user-withdrawal";
export const DASHBOARDINFO = "dashboard-info";
export const USERACTIVATED = "activated";
export const ACTIVATIONMESG = "activation-msg";
export const ACTIVATONEMAIL = "activation-email";
export const SHOWAD = "show-ad";

const verifyTokenURL = BASE_URL + "sfsbapi/v1/user";

const doLogin = (data) => {
    const password = document.getElementById('password').value;
    Login(LoginEndpoint, {email: data.email, password: password}, processLogin)

};

const processLogin = (state, response) => {
    if (state) {
        if (response != undefined) {
            //set session time
            const timeStamp = moment().format('MM-DD-YYYY HH:mm:ss');
            // handle admin login
            if (response.data.role == CUSTOMER) {
                localStorage.setItem(USERTOKEN, JSON.stringify(response.data.token));
                localStorage.setItem(SESSION_INTERVAL, JSON.stringify(timeStamp));
                localStorage.setItem(USERINFO, JSON.stringify(response.data.user));
            }
            swal('Yeh!!','You have successfully logged in','success');
        }
    } else {

        if (response) {
            if (response.status == 401) {
                if (response.data.message == "invalid_credentials") {
                    swal('Oops!!',`Invalid Credentials`, 'warning');
                } else if (response.data.message == 'Incorrect email or password,Try again') {
                    swal('Oops!!','Incorrect Email or Password', 'warning');
                } else {
                    swal('Oops!!',`${JSON.stringify(response.data.message)}`, 'warning');
                }
            } else {
                swal('Oops!!',`${JSON.stringify(response.data.message)}`, 'warning');
            }
        }
    }
};

const Login = (url, param, login) => {
    api(url, param, false, true, login);
};


const AuthController = component => {
    const Authenticate = props => {
        const [fetching, setFetching] = useState(true);

        const RenderComponent = props.component;
        const token = JSON.parse(localStorage.getItem(USERTOKEN));


        useEffect(() => {

            if (!token) {
                props.history.push(
                    `/login`
                );
                localStorage.removeItem(USERTOKEN);
                localStorage.removeItem(USERINFO);
            } else {

                axios.get(verifyTokenURL, {headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem(USERTOKEN))}`}}).then(
                    res => {
                        localStorage.setItem(USERINFO, JSON.stringify(res.data.data));
                        // console.log(JSON.stringify(res.data.data));
                        setFetching(false);
                    },
                    err => {
                        try {
                            if (err.response) {
                                if (err.response.data.message === "Account has not been activated, click on resend") {
                                    setLocalStorage(USERACTIVATED, false);

                                } else {
                                    swal({
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
                                            cancel: "no",
                                            yes: "continue"
                                        }
                                    }).then((value) => {
                                        console.log('value ', value);
                                        switch (value) {
                                            case "yes":
                                                let data = JSON.parse(localStorage.getItem(USERINFO));
                                                doLogin(data);
                                                break;
                                            case "no":
                                                props.history.push(`/login`);
                                                localStorage.removeItem(USERTOKEN);
                                                localStorage.removeItem(USERINFO);
                                                break;
                                        }
                                    });

                                    return null;
                                }
                            } else {
                                //TODO("Log to central Log")
                                // console.error("Unknown Error", err);
                            }
                        } catch (e) {
                            // console.log("Critical Error", e);
                        }

                    }
                )
            }


        }, [RenderComponent]);


        return <RenderComponent {...props} />;
    };

    Authenticate.defaultProps = {
        component
    };


    return Authenticate
};

export default AuthController;