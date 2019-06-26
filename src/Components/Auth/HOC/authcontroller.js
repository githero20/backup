import React, {useEffect, useState} from "react";
import axios from 'axios'
import {BASE_URL} from "../../../RouteLinks/RouteLinks";
import {setLocalStorage} from "../../../ApiUtils/ApiUtils";

export const USERTOKEN = "token";
export const USERINFO = "user";
export const USERWITHDRAWAL = "user-withdrawal";
export const DASHBOARDINFO = "dashboard-info";
export const USERACTIVATED = "activated";
export const ACTIVATIONMESG = "activation-msg";
export const ACTIVATONEMAIL = "activation-email";
export const SHOWAD = "show-ad";

const verifyTokenURL = BASE_URL+"sfsbapi/v1/user";


const AuthController = component => {
    const Authenticate = props => {
        const [fetching, setFetching] = useState(true);

        const RenderComponent = props.component;
        let data = localStorage.getItem(USERTOKEN);
        console.log('data stored',data);
        const token = JSON.parse(data);
        console.log('token from storage ',token);

        useEffect(() => {

            if (!token) {
                props.history.push(
                    `/login`
                );
                localStorage.removeItem(USERTOKEN);
                localStorage.removeItem(USERINFO);
            }
            else{

                axios.get(verifyTokenURL, {headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem(USERTOKEN))}`}}).then(
                    res => {
                        localStorage.setItem(USERINFO, JSON.stringify(res.data.data));
                        // console.log(JSON.stringify(res.data.data));
                        setFetching(false);
                    },
                    err => {
                        try{
                            if(err.response) {
                                if(err.response.data.message === "Account has not been activated, click on resend"){
                                    setLocalStorage(USERACTIVATED,false);

                                }else{

                                    props.history.push(
                                        `/login`
                                    );
                                    localStorage.removeItem(USERTOKEN);
                                    localStorage.removeItem(USERINFO);
                                    return null;
                                }
                            } else{
                                //TODO("Log to central Log")
                                // console.error("Unknown Error", err);
                            }
                        }catch (e) {
                            // console.log("Critical Error", e);
                        }

                    }
                )
            }


        }, [RenderComponent]);




        //
        // if (fetching) {
        //     return <h3>loading</h3>;
        //     ?redirect=${props.location.pathname}
        // }

        return <RenderComponent {...props} />;
    };

    Authenticate.defaultProps = {
        component
    };



    return Authenticate
};

export default AuthController;